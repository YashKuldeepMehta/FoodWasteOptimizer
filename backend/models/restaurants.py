from pydantic import BaseModel

RESTAURANT_COLLECTION = "restaurants"

class Restaurant(BaseModel):
    name: str
    restaurantName: str
    email: str
    password: str
