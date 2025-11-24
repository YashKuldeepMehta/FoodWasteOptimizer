from datetime import datetime
from fastapi import APIRouter, HTTPException
from models.products import Product
from db import db
from bson import ObjectId

router = APIRouter()

@router.post("/shopkeeper/add-product")
async def add_product(product: Product):
    try:
        product_dict = product.dict(by_alias=True)
        product_dict["shopkeeper"] = ObjectId(product_dict["shopkeeper"])
        product_dict["manufacturing_date"] = datetime.combine(
            product.manufacturing_date, datetime.min.time()
        )
        product_dict["expiry_date"] = datetime.combine(
            product.expiry_date, datetime.min.time()
        )
        products_collection = db["products"]
        result = await products_collection.insert_one(product_dict)

        return {
            "message": "Product added successfully",
            "id": str(result.inserted_id)
        }

    except Exception as e:
        print("REAL ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/shopkeeper/products')
async def get_products(shopkeeper: str):
    try:
        if not ObjectId.is_valid(shopkeeper):
            raise HTTPException(status_code=400, detail="Invalid shopkeeper ID")

        products_collection = db["products"]

        cursor = products_collection.find({"shopkeeper": ObjectId(shopkeeper)})
        products = await cursor.to_list(length=None)

        for product in products:
            product["_id"] = str(product["_id"])
            product["shopkeeper"] = str(product["shopkeeper"])

        return products

    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

