from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime
from db import db

router = APIRouter()

products = db["products"]
carts = db["carts"]
shopkeepers = db["shopkeepers"]
orders = db["orders"]


@router.post("/customer/addtocart")
async def add_to_cart(data: dict):

    customer_id = data["customer_id"]
    product_id = data["product_id"]
    quantity = int(data["quantity"])
    price = float(data["price"])

    product = await products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(404, "Product not found")


    if product.get("is_expired", False):
        raise HTTPException(400, "Product has expired")

    if quantity > product["quantity"]:
        raise HTTPException(
            400,
            f"Only {product['quantity']} items available."
        )

    existing = await carts.find_one({
        "customer_id": ObjectId(customer_id),
        "product_id": ObjectId(product_id)
    })

    if existing:
        new_qty = existing["quantity"] + quantity

        if new_qty > product["quantity"]:
            raise HTTPException(
                400,
                f"Cannot add more. Only {product['quantity']} available."
            )

        await carts.update_one(
            {"_id": existing["_id"]},
            {"$set": {"quantity": new_qty}}
        )

        return {"message": f"Updated cart quantity to {new_qty}."}

    await carts.insert_one({
        "customer_id": ObjectId(customer_id),
        "product_id": ObjectId(product_id),
        "quantity": quantity,
        "price": price,
        "added_at": data.get("added_at")
    })

    return {"message": "Item added to cart"}


@router.get("/customer/cart")
async def get_cart(customer_id: str):

    cart_items = await carts.find({
        "customer_id": ObjectId(customer_id)
    }).to_list(None)

    response = []

    for item in cart_items:

        product = await products.find_one(
            {"_id": ObjectId(item["product_id"])}
        )

        if not product:
            continue

        shop = await shopkeepers.find_one(
            {"_id": ObjectId(product["shopkeeper"])},
            {"name": 1}
        )
        shop_name = shop["name"] if shop else "Unknown Shop"

        stock = product["quantity"]
        status = "available" if stock > 0 else "out_of_stock"

        if product.get("is_expired", False):
            status = "expired"

        response.append({
            "cart_id": str(item["_id"]),
            "product_id": str(item["product_id"]),
            "name": product["name"],
            "shop_name": shop_name,
            "qty_in_cart": item["quantity"],
            "stock_available": stock,
            "discounted_price": product["discounted_price"],
            "original_price": product["original_price"],
            "expiry_date": product["expiry_date"],
            "status": status,
            "total_price": item["quantity"] * product["discounted_price"]
        })

    return response


@router.put("/customer/cart/update")
async def update_cart_quantity(data: dict):

    cart_id = data["cart_id"]
    new_qty = int(data["quantity"])

    cart_item = await carts.find_one({"_id": ObjectId(cart_id)})
    if not cart_item:
        raise HTTPException(404, "Cart item not found")

    product = await products.find_one(
        {"_id": ObjectId(cart_item["product_id"])}
    )

    if not product:
        raise HTTPException(404, "Product no longer exists")

    if product["is_expired"]:
        raise HTTPException(400, "Product expired. Removed from cart.")

    if new_qty > product["quantity"]:
        raise HTTPException(
            400,
            f"Only {product['quantity']} items available"
        )

    await carts.update_one(
        {"_id": ObjectId(cart_id)},
        {"$set": {"quantity": new_qty}}
    )

    return {"message": "Cart updated"}


@router.delete("/customer/cart/remove/{cart_id}")
async def remove_cart_item(cart_id: str):

    await carts.delete_one({"_id": ObjectId(cart_id)})
    return {"message": "Item removed from cart"}




@router.post("/customer/place-order")
async def place_order(data: dict):

    customer_id = data.get("customer_id")
    address = data.get("address", "").strip()
    payment_method = data.get("payment_method", "cod")

    if not customer_id:
        raise HTTPException(400, "Missing customer_id")

    if not address:
        raise HTTPException(400, "Please enter delivery address")

    customer_oid = ObjectId(customer_id)

    cart_items = await carts.find({"customer_id": customer_oid}).to_list(None)
    if not cart_items:
        raise HTTPException(400, "Cart is empty")

    purchased_items = []
    grand_total = 0 

    for item in cart_items:
        product = await products.find_one({"_id": item["product_id"]})

        if not product:
            await carts.delete_one({"_id": item["_id"]})
            continue

        if product.get("is_expired", False):
            await carts.delete_one({"_id": item["_id"]})
            continue

        if product["quantity"] <= 0:
            await carts.delete_one({"_id": item["_id"]})
            continue

        if item["quantity"] > product["quantity"]:
            await carts.delete_one({"_id": item["_id"]})
            continue

        await products.update_one(
            {"_id": product["_id"]},
            {"$inc": {"quantity": -item["quantity"]}}
        )

        item_total = item["quantity"] * product["discounted_price"]

        purchased_items.append({
            "product_id": str(product["_id"]),
            "name": product["name"],
            "qty": item["quantity"],
            "price": product["discounted_price"],
            "total": item_total
        })

        grand_total += item_total

        await carts.delete_one({"_id": item["_id"]})

    if not purchased_items:
        raise HTTPException(
            400,
            "All items in your cart became unavailable."
        )

    order_doc = {
        "customer_id": customer_oid,
        "address": address,
        "payment_method": payment_method,
        "items": purchased_items,
        "grand_total": grand_total,       
        "created_at": datetime.utcnow()
    }

    res = await orders.insert_one(order_doc)

    return {
        "message": "Order placed successfully",
        "order_id": str(res.inserted_id),
        "grand_total": grand_total       
    }
