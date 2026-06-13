from pydantic import BaseModel, EmailStr

class ProfileUpdate(BaseModel):
    full_name: str
    email: EmailStr


class ChangePassword(BaseModel):
    current_password: str
    new_password: str