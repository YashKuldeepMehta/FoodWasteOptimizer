from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db import db

router = APIRouter()

products_collection = db["products"]
shopkeepers_collection = db["shopkeepers"]
orders_collection = db["orders"]


@router.get("/customer/discounted")
async def get_discounted_products():
    try:
        products = await products_collection.find({
            "is_discounted": True,
            "is_expired": False,
            "quantity":{"$gt" : 0}
        }).to_list(None)

        result = []

        for prod in products:
            shopkeeper_id = prod["shopkeeper"]
            shopkeeper = await shopkeepers_collection.find_one(
                {"_id": ObjectId(shopkeeper_id)},
                {"name": 1}
            )

            shop_name = shopkeeper["name"] if shopkeeper else "Unknown Shop"

            prod["_id"] = str(prod["_id"])
            prod["shopkeeper"] = str(prod["shopkeeper"])
            prod["shop_name"] = shop_name

            result.append(prod)

        return result

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/customer/orders")
async def get_orders_data(customer_id: str):

    customer_oid = ObjectId(customer_id)

    try:
        history = await orders_collection.find({"customer_id": customer_oid}).sort("created_at", -1).to_list(None)
        result = []
        for h in history:
            result.append({
                "order_id": str(h["_id"]),
                "created_at": h["created_at"],
                "grand_total": h.get("grand_total", 0),
                "payment_method": h.get("payment_method", "cod"),
                "address": h.get("address", ""),
                "items": h.get("items", [])
            })
        
        return result


    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
