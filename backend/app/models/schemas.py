from pydantic import BaseModel, EmailStr
from typing import List, Optional

class Skill(BaseModel):
    name: str
    category: str

class Experience(BaseModel):
    id: str
    role: str
    company: str
    duration: str
    location: str
    technologies: List[str]
    responsibilities: List[str]

class Education(BaseModel):
    degree: str
    field: str
    institution: str
    location: str
    year: int

class Profile(BaseModel):
    name: str
    title: str
    tagline: str
    bio: List[str]
    email: str
    phone: str
    location: str
    available: bool
    skills: List[Skill]
    experience: List[Experience]
    education: List[Education]

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

class Certification(BaseModel):
    id: str
    name: str
    issuer: str
    date: str
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None

class BlogPost(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    date: str
    tags: List[str]
    read_time: int
