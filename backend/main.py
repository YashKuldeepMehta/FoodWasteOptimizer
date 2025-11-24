from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.authRoute import router as auth_router
from routes.shopkeeperRoute import router as shop_router
from routes.customerRoute import router as customer_router
from routes.cartRoute import router as cart_router
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from  utils.expiry_tracker import check_expiry

app = FastAPI(title="Food Waste Optimizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scheduler = AsyncIOScheduler()
scheduler.add_job(check_expiry, "interval", seconds=20)  
scheduler.start()

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(shop_router)
app.include_router(customer_router)
app.include_router(cart_router)

@app.get("/")
async def home():
    return {"message": "Python FastAPI Backend is running!"}

