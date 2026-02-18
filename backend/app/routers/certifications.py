from fastapi import APIRouter
from app.models.schemas import Certification
from typing import List

router = APIRouter()

CERTIFICATIONS_DATA = [
    {
        "id": "cert1",
        "name": "IBM Certified System Administrator - DataPower Gateway v7.5",
        "issuer": "IBM",
        "date": "2019",
        "credential_id": None,
        "credential_url": None,
    },
    {
        "id": "cert2",
        "name": "IBM Certified Solution Advisor - API Connect v10",
        "issuer": "IBM",
        "date": "2022",
        "credential_id": None,
        "credential_url": None,
    },
    {
        "id": "cert3",
        "name": "AWS Certified Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "date": "2023",
        "credential_id": None,
        "credential_url": None,
    },
]


@router.get("/", response_model=List[Certification])
def get_certifications():
    return CERTIFICATIONS_DATA
