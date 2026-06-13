from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.profile import (
    ProfileUpdate,
    ChangePassword
)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

CURRENT_USER_ID = 1


# GET PROFILE
@router.get("/")
def get_profile(
    db: Session = Depends(get_db)
):
    return db.query(User).filter(
        User.id == CURRENT_USER_ID
    ).first()


# UPDATE PROFILE
@router.put("/")
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == CURRENT_USER_ID
    ).first()

    existing = db.query(User).filter(
        User.email == data.email,
        User.id != CURRENT_USER_ID
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user.full_name = data.full_name
    user.email = data.email

    db.commit()

    return {"message": "Profile updated successfully"}


# CHANGE PASSWORD
@router.put("/change-password")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == CURRENT_USER_ID
    ).first()

    if user.password != data.current_password:
        raise HTTPException(
            status_code=400,
            detail="Current password incorrect"
        )

    if len(data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters"
        )

    user.password = data.new_password

    db.commit()

    return {
        "message": "Password changed successfully"
    }