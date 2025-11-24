from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import Optional
from bson import ObjectId
from .object_id import PyObjectId

class Product(BaseModel):

    shopkeeper: PyObjectId

    name: str
    quantity: int = Field(..., gt=0)
    original_price: float
    discounted_price: Optional[float] = None

    manufacturing_date: date
    expiry_date: date

    is_discounted: bool = False
    is_expired: bool = False

    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            PyObjectId: str,
            ObjectId: str,  
        }
        validate_by_name = True  
