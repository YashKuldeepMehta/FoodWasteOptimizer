from pydantic import BaseModel

SHOPKEEPER_COLLECTION = "shopkeepers"

class Shopkeeper(BaseModel):
    name: str       
    shopName: str     
    email: str
    password: str
    status : str = "active"
