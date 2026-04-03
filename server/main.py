from fastapi import FastAPI, APIRouter, HTTPException, status
from configurations import accounts_collection, storage_collection
from db_helper.models import LoginRequest, SignupRequest, Account, Uid, PostNotification, AddContact, AccountStorage
from auth import verify_password, hash_password
import uuid

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

    return {"message": "success", "user_info": {"user_id": user["_id"], "name": user['name'], "phone": user['phone']}}


@app.post("/signup")
async def signup(request: SignupRequest):

    existing_user = accounts_collection.find_one({"phone": request.phone})
    _uid = str(uuid.uuid4())
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Phone number already registered"
        )

    new_user_obj = Account(
        _id=_uid,
        name=request.name,
        phone=request.phone,
        password=hash_password(request.password)
    )
   
    
    new_user = new_user_obj.model_dump()
    new_user['_id'] = _uid

    new_account_storage_obj = AccountStorage(
        _id=_uid,

    )

    new_account_storage = new_account_storage_obj.model_dump()
    new_account_storage['_id'] = _uid
    try:
        accounts_collection.insert_one(new_user)
        storage_collection.insert_one(new_account_storage)
        return {"message": "User created successfully", "user_id": _uid}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Database insertion failed")




@app.get("/notifications/{uid}")
async def get_notifications(uid: str):

    storage = storage_collection.find_one({"_id": uid})

    if not storage:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "notifications": storage.get("notification", [])[::-1]
    }




@app.post("/postNotification")
async def postNotification(request: PostNotification):
    sender_storage = storage_collection.find_one({"_id": request.uid})

    if not sender_storage:
        raise HTTPException(status_code=404, detail="User not found")

    contacts = sender_storage.get("family_contacts", [])

    notification_obj = {
        "from": {"uid": request.uid, "name": request.name },
        "critical": request.critical,
        "location": request.location.model_dump(),
    }

    uids = [c["uid"] for c in contacts]

    storage_collection.update_many(
        {"_id": {"$in": uids}},
        {"$push": {"notification": notification_obj}}
    )

    return {"message": "Notification sent to contacts"}







@app.post("/addContact")
async def add_contact(request: AddContact):

    if request.uid == request.add_user:
        raise HTTPException(status_code=400, detail="Cannot add yourself")

    user = accounts_collection.find_one({"_id": request.uid})
    target = accounts_collection.find_one({"_id": request.add_user})

    if not user or not target:
        raise HTTPException(status_code=404, detail="User not found")

    storage_collection.update_one(
        {"_id": request.uid},
        {
            "$addToSet": {
                "family_contacts": {
                    "uid": target["_id"],
                    "name": target["name"],
                    "phone": target["phone"]
                }
            }
        }
    )

    return {"message": "Contact added successfully"}




@app.get("/contacts/{uid}")
async def get_contacts(uid: str):
    storage = storage_collection.find_one({"_id": uid})

    if not storage:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "contacts": storage.get("family_contacts", [])
    }



