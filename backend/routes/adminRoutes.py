from fastapi import APIRouter,HTTPException
from db import db
from bson import ObjectId
from datetime import datetime, timedelta

router = APIRouter()

customers= db["customers"]
shopkeepers = db["shopkeepers"]
products = db["products"]
orders = db["orders"]

@router.get("/admin/stats")
async def admin_stats():

    total_customers = await customers.count_documents({})
    total_shopkeepers = await shopkeepers.count_documents({})
    total_users = total_customers + total_shopkeepers

    total_products = await products.count_documents({})
    discounted_products = await products.count_documents({"is_discounted": True,"is_expired":False})
    expired_products = await products.count_documents({"is_expired": True})
    normal_products = total_products - discounted_products -  expired_products

    total_orders = await orders.count_documents({})

    spending_pipeline = [
        {"$group": {"_id": None, "totalSpent": {"$sum": "$grand_total"}}}
    ]
    spending = await orders.aggregate(spending_pipeline).to_list(None)
    total_spending = spending[0]["totalSpent"] if spending else 0

    return {
        "users": {
            "total_users": total_users,
            "total_customers": total_customers,
            "total_shopkeepers": total_shopkeepers,
        },
        "customers": {
            "total_orders": total_orders,
            "total_spending": total_spending
        },
        "shopkeepers": {
            "total_products": total_products,
            "normal_products": normal_products,
            "discounted_products": discounted_products,
            "expired_products": expired_products
        }
    }


@router.get("/admin/order-trend")
async def admin_order_trend():
    today = datetime.utcnow()
    last_7 = today - timedelta(days=6)

    orders_list = await orders.find({
        "created_at": {"$gte": last_7}
    }).to_list(None)

    stats = {}

    for i in range(7):
        date = (today - timedelta(days=i)).date().isoformat()
        stats[date] = 0

    for o in orders_list:
        d = o["created_at"].date().isoformat()
        if d in stats:
            stats[d] += 1

    return stats


@router.get("/admin/users")
async def get_users():
    
    customer   = await customers.find({}).to_list(None)
    shopkeeper = await shopkeepers.find({}).to_list(None)

    result = []

    for u in customer:
        result.append({
            "id": str(u["_id"]),
            "name": u.get("name", ""),
            "email": u.get("email", ""),
            "role": "customer",
            "status": u.get("status", "active")
            })

    for s in shopkeeper:
        result.append({
                "id": str(s["_id"]),
                "name": s.get("name", "") or s.get("shopName", ""),
                "email": s.get("email", ""),
                "role": "shopkeeper",
                "status": s.get("status", "active")
            })

    return result

@router.put("/admin/user/status")
async def status_update(data: dict):
    try:
        user_id = data["user_id"]
        role = data["role"]
        status = data["status"]

        if not user_id or not role or status not in("active","inactive"):
            raise HTTPException(400,"Invalid Payload")

        collection = customers if role == "customer" else shopkeepers

        result = await collection.update_one({"_id": ObjectId(user_id)},{"$set":{"status":status}})

        if result.matched_count == 0:
            raise HTTPException(404, "User Not found")
    
        return {"message":f"{role} status updated to {status}"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

