from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import profile, contact, certifications, blog

app = FastAPI(
    title="Anil Kumar Ravuri — Portfolio API",
    description="Backend API serving portfolio data and contact form",
    version="1.0.0"
)

# CORS — add your Vercel frontend URL here after deploy
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://*.vercel.app",   # replace * with your frontend domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(certifications.router, prefix="/api/certifications", tags=["Certifications"])
app.include_router(blog.router, prefix="/api/blog", tags=["Blog"])

@app.get("/")
def root():
    return {"status": "ok", "message": "Portfolio API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
