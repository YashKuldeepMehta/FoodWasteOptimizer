from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .object_id import PyObjectId


class Cart(BaseModel):
    customer_id: PyObjectId = Field(..., description="Customer's MongoDB ObjectId")
    product_id: PyObjectId = Field(..., description="Product's MongoDB ObjectId")

    quantity: int = Field(..., gt=0)
    price: float 

    added_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {PyObjectId: str}
    }
