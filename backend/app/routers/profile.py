from fastapi import APIRouter
from app.models.schemas import Profile

router = APIRouter()

PROFILE_DATA = {
    "name": "Anil Kumar Ravuri",
    "title": "Sr. IT Systems Engineer",
    "tagline": "IBM DataPower & API Connect Specialist",
    "bio": [
        "Senior IT Systems Engineer with 7+ years of hands-on expertise in IBM DataPower Gateways and IBM API Connect, specializing in designing, securing, and optimizing enterprise API infrastructure at scale.",
        "From configuring Multi-Protocol Gateways and Web Service Proxies to implementing OAuth 2.0, SAML, JWT, and mutual TLS — I build the critical security layer that healthcare enterprises depend on.",
        "Currently leading API platform engineering at Florida Blue (BCBS Florida), managing production deployments and platform upgrades across a complex, high-availability environment."
    ],
    "email": "anilkumar80459@gmail.com",
    "phone": "(510) 298-7126",
    "location": "Jacksonville, FL",
    "available": True,
    "skills": [
        {"name": "IBM DataPower Gateway", "category": "API & Middleware"},
        {"name": "IBM API Connect (APIC)", "category": "API & Middleware"},
        {"name": "Multi-Protocol Gateway", "category": "API & Middleware"},
        {"name": "Web Service Proxy", "category": "API & Middleware"},
        {"name": "WebSphere MQ", "category": "API & Middleware"},
        {"name": "Tomcat", "category": "API & Middleware"},
        {"name": "IBM WebSphere", "category": "API & Middleware"},
        {"name": "OAuth 2.0", "category": "Security & Cryptography"},
        {"name": "JWT", "category": "Security & Cryptography"},
        {"name": "SAML", "category": "Security & Cryptography"},
        {"name": "TLS 1.2", "category": "Security & Cryptography"},
        {"name": "Mutual TLS", "category": "Security & Cryptography"},
        {"name": "X.509 Certificates", "category": "Security & Cryptography"},
        {"name": "OpenID Connect", "category": "Security & Cryptography"},
        {"name": "Kerberos", "category": "Security & Cryptography"},
        {"name": "AAA Policies", "category": "Security & Cryptography"},
        {"name": "PKI", "category": "Security & Cryptography"},
        {"name": "GatewayScript / JS", "category": "Languages & Web"},
        {"name": "XSLT", "category": "Languages & Web"},
        {"name": "XPath / XQuery", "category": "Languages & Web"},
        {"name": "XML / JSON / YAML", "category": "Languages & Web"},
        {"name": "SOAP / WSDL", "category": "Languages & Web"},
        {"name": "REST / OpenAPI", "category": "Languages & Web"},
        {"name": "OpenShift", "category": "Infrastructure & Ops"},
        {"name": "Cloud Pak for Integration", "category": "Infrastructure & Ops"},
        {"name": "LDAP / Active Directory", "category": "Infrastructure & Ops"},
        {"name": "Splunk", "category": "Infrastructure & Ops"},
        {"name": "Elastic Search", "category": "Infrastructure & Ops"},
        {"name": "Jenkins", "category": "Infrastructure & Ops"},
        {"name": "Git / Maven", "category": "Infrastructure & Ops"},
        {"name": "Linux / UNIX", "category": "Infrastructure & Ops"},
        {"name": "Citrix NetScaler", "category": "Infrastructure & Ops"},
        {"name": "IBM DB2", "category": "Databases"},
        {"name": "Oracle Directory Server", "category": "Databases"},
        {"name": "LDAP", "category": "Databases"},
        {"name": "Active Directory", "category": "Databases"},
        {"name": "SoapUI", "category": "Tools & Hardware"},
        {"name": "Altova XMLSpy", "category": "Tools & Hardware"},
        {"name": "WinSCP / PuTTY", "category": "Tools & Hardware"},
        {"name": "DataPower Ops Dashboard", "category": "Tools & Hardware"},
        {"name": "XI52 / XB62 / IDG", "category": "Tools & Hardware"},
        {"name": "CA Single Sign-On", "category": "Tools & Hardware"},
    ],
    "experience": [
        {
            "id": "job1",
            "role": "Sr. IT Systems Engineer",
            "company": "Blue Cross and Blue Shield of Florida (Florida Blue)",
            "duration": "January 2022 — Present",
            "location": "Jacksonville, FL",
            "technologies": ["IBM DataPower", "IBM API Connect", "OpenShift", "GatewayScript", "XSLT", "OAuth 2.0", "SAML", "Splunk", "MQ"],
            "responsibilities": [
                "IBM API Connect V10 administration — APIM/CMC upgrades, portal patches, and cluster configuration.",
                "Installation and configuration of DataPower Appliances: XI52, XB62, and IDG models.",
                "Defined and built standalone APIs and API definitions using YAML/OpenAPI Specification.",
                "Configured developer portals, organizations, catalogs, runtime servers in API Connect.",
                "Implemented Multi-Protocol Gateways for secure RESTful API proxying and MQ integration.",
                "Built AAA policies using GatewayScript, XSLT/XQuery for authentication, authorization, and auditing.",
                "Implemented OAuth 2.0, JWE, JOSE, digital signatures, and encryption/decryption workflows.",
                "Managed cryptographic objects — certificates, private keys, CAs — using DataPower Crypto tools.",
                "Executed firmware upgrades (v6–v10), secure backups/restores, and cryptographic secret rotation.",
                "Configured load balancers, TLS client/server profiles, and mutual TLS for secure backends.",
                "Participated in multiple Disaster Recovery exercises and production deployments.",
                "Set up Splunk log forwarding and built monitoring dashboards via DataPower Operations Dashboard.",
                "Implemented SSO using SAML with DataPower MPGWs and CA Single Sign-On integration.",
                "Applied web application security defenses: SQL injection, XSS, cookie security, session management."
            ]
        },
        {
            "id": "job2",
            "role": "IT Systems Engineer",
            "company": "Blue Cross and Blue Shield of Florida (Florida Blue)",
            "duration": "August 2017 — December 2021",
            "location": "Jacksonville, FL",
            "technologies": ["IBM DataPower", "IBM API Connect", "WebSphere", "GatewayScript", "XSL", "XQuery", "Splunk", "MQ"],
            "responsibilities": [
                "Installation, configuration, and firmware upgrades for DataPower appliances.",
                "Worked extensively on API management console, creating and managing REST APIs.",
                "Created API documentation and performed API Connect upgrades and portal customization.",
                "Configured WSPs, MPGWs, MQ Queue Managers, XML Managers, and FSHs in DataPower.",
                "Built DataPower policies using AAA actions and multiple security protocols.",
                "Coded using GatewayScript, XSL, and XQuery for advanced data processing and transformation.",
                "Built multi-protocol gateways for diverse protocols and WebSphere MQ integration.",
                "Performed device health checks, monitoring, and report generation.",
                "Monitored transactions using Operations Dashboard and Splunk.",
                "Gathered requirements from product owners and BAs; managed deliverables for multiple releases.",
                "Configured and maintained Tomcat and WebSphere application servers.",
                "Built defensive security constructs including digital signatures, PKI, and firewalls."
            ]
        }
    ],
    "education": [
        {
            "degree": "Master's",
            "field": "Computer Science",
            "institution": "Troy University",
            "location": "Alabama, USA",
            "year": 2017
        },
        {
            "degree": "Bachelor's",
            "field": "Electronics & Communication Engineering",
            "institution": "Koneru Lakshmaiah University (KLU)",
            "location": "India",
            "year": 2015
        }
    ]
}

@router.get("/", response_model=Profile)
def get_profile():
    """Returns full profile data for Anil Kumar Ravuri."""
    return PROFILE_DATA

@router.get("/summary")
def get_summary():
    """Returns a lightweight profile summary."""
    return {
        "name": PROFILE_DATA["name"],
        "title": PROFILE_DATA["title"],
        "tagline": PROFILE_DATA["tagline"],
        "email": PROFILE_DATA["email"],
        "phone": PROFILE_DATA["phone"],
        "location": PROFILE_DATA["location"],
        "available": PROFILE_DATA["available"],
        "years_experience": 7,
        "datapower_versions": "v6 – v10"
    }

@router.get("/skills")
def get_skills():
    """Returns skills grouped by category."""
    skills = PROFILE_DATA["skills"]
    grouped: dict = {}
    for skill in skills:
        cat = skill["category"]
        grouped.setdefault(cat, []).append(skill["name"])
    return grouped

@router.get("/experience")
def get_experience():
    return PROFILE_DATA["experience"]

@router.get("/education")
def get_education():
    return PROFILE_DATA["education"]
