from fastapi import FastAPI, APIRouter, HTTPException, status
from configurations import accounts_collection
from db_helper.models import LoginRequest, SignupRequest, Account
from auth import verify_password, hash_password

app = FastAPI()
router = APIRouter()
app.include_router(router)


@app.post("/login")
async def login(request: LoginRequest):
    user = accounts_collection.find_one({"phone": request.phone})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )

    is_valid = verify_password(request.password, user["password"])
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password"
        )

    return {"message": "success", "user_info": {"user_id": user["id"], "name": user['name'], "phone": user['phone']}}


@app.post("/signup")
async def signup(request: SignupRequest):

    existing_user = accounts_collection.find_one({"phone": request.phone})

    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Phone number already registered"
        )

    new_user_obj = Account(
        name=request.name,
        phone=request.phone,
        password=hash_password(request.password)
    )
   
    
    new_user = new_user_obj.model_dump()


    # 4. Insert into MongoDB
    try:
        accounts_collection.insert_one(new_user)
        return {"message": "User created successfully", "user_id": new_user["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database insertion failed")

@app.get("/getUserInfo")
async def getUser():
    pass