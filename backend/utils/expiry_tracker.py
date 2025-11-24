from datetime import datetime, timedelta
from db import db
from utils.emailer import send_email

products = db["products"]
users = db["shopkeepers"]


async def check_expiry():
    print("Running expiry checking task...")

    today = datetime.utcnow()
    today_only = today.date()

    all_products = await products.find({}).to_list(None)

    for prod in all_products:
        product_id = prod["_id"]
        expiry = prod["expiry_date"]

        if isinstance(expiry, datetime):
            expiry_dt = expiry
        else:
            expiry_dt = datetime.combine(expiry, datetime.min.time())

        expiry_only = expiry_dt.date()
        days_left = (expiry_only - today_only).days

        shopkeeper_id = prod["shopkeeper"]
        shopkeeper = await users.find_one({"_id": shopkeeper_id})

        if not shopkeeper:
            print("Shopkeeper missing for product:", prod["name"])
            continue

        email = shopkeeper["email"]
        name = shopkeeper.get("name", "")


        if days_left < 0 and not prod.get("is_expired", False):

            await products.update_one(
                {"_id": product_id},
                {"$set": {"is_expired": True}}
            )

            await db["carts"].delete_many({"product_id":product_id})

            send_email(
                email,
                "Your Product Has Expired",
                f"Hello {name},\n\nYour product '{prod['name']}' expired on {expiry_only}.\n"
            )

            print(f"[EXPIRED] Updated & emailed: {prod['name']}")
            continue


        if 0 <= days_left <= 7 and not prod.get("is_discounted", False):

            await products.update_one(
                {"_id": product_id},
                {"$set": {"is_discounted": True}}
            )

            send_email(
                email,
                "Product Close to Expiry",
                f"Hello {name},\n\n"
                f"Your product '{prod['name']}' expires in {days_left} day(s).\n"
                f"It has been added to discounted category.\n"
                f"It's new price is '{prod['discounted_price']}'\n\n"
                f"Thank You"
            )

            print(f"[DISCOUNT] Updated & emailed: {prod['name']}")
            continue

