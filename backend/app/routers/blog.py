from fastapi import APIRouter, HTTPException
from app.models.schemas import BlogPost
from typing import List

router = APIRouter()

BLOG_POSTS = [
    {
        "slug": "datapower-oauth2-guide",
        "title": "Implementing OAuth 2.0 on IBM DataPower Gateway",
        "excerpt": "A practical guide to configuring OAuth 2.0 provider on IBM DataPower Gateway for enterprise API security.",
        "content": "OAuth 2.0 has become the industry standard for API authorization. In this post, I walk through the end-to-end setup of an OAuth 2.0 provider on IBM DataPower Gateway.\n\nThe first step is to create an API Security definition in your DataPower domain. This involves configuring the token endpoint, authorization endpoint, and the supported grant types. For most enterprise use cases, you will want to support both authorization code and client credentials grant types.\n\nNext, configure the AAA (Authentication, Authorization, and Auditing) policy. The AAA policy defines how DataPower validates client credentials, authenticates resource owners, and issues tokens. You can integrate with LDAP directories, custom databases, or external identity providers.\n\nToken management is critical. Configure token lifetimes, refresh token policies, and token revocation endpoints. DataPower supports both opaque tokens and JWT tokens, with JWT being preferred for microservices architectures where token validation needs to happen without calling back to the authorization server.\n\nFinally, test your configuration using tools like Postman or curl. Verify that tokens are issued correctly, that scopes are enforced, and that token expiration and refresh work as expected.",
        "date": "2024-12-15",
        "tags": ["DataPower", "OAuth", "Security", "API"],
        "read_time": 8,
    },
    {
        "slug": "api-connect-v10-migration",
        "title": "Migrating from API Connect v5 to v10: Lessons Learned",
        "excerpt": "Key insights and strategies from migrating enterprise APIs across major API Connect versions.",
        "content": "Migrating between major versions of IBM API Connect is a significant undertaking that requires careful planning and execution. Having led the migration from v5 to v10 at Florida Blue, here are the lessons I learned.\n\nStart with a thorough inventory of your existing APIs. Document every API product, plan, subscription, and consumer organization. API Connect v10 changes how products and plans are structured, so understanding your current state is essential.\n\nThe gateway runtime changed significantly between v5 and v10. If you have custom gateway extensions or DataPower policies, they will need to be reviewed and potentially rewritten. GatewayScript policies generally port well, but XSLT policies may need updates due to changes in the context variables.\n\nTesting is paramount. Set up a parallel environment running v10 alongside your existing v5 environment. Migrate APIs in phases, starting with low-risk, internal APIs before moving to customer-facing ones. Use API testing frameworks to validate that responses match between the old and new environments.\n\nDon't underestimate the impact on your CI/CD pipeline. The apic CLI toolkit changed significantly in v10, and your deployment scripts will need updates.",
        "date": "2024-10-20",
        "tags": ["API Connect", "Migration", "Enterprise"],
        "read_time": 10,
    },
    {
        "slug": "mutual-tls-datapower",
        "title": "Securing APIs with Mutual TLS on DataPower",
        "excerpt": "How to implement certificate-based mutual authentication for zero-trust API security.",
        "content": "Mutual TLS (mTLS) provides the strongest form of transport-level security for APIs. Unlike standard TLS where only the server presents a certificate, mTLS requires both the client and server to authenticate via certificates.\n\nOn IBM DataPower, implementing mTLS involves configuring the SSL/TLS profile to require client certificates. Create a Crypto Validation Credential that specifies which Certificate Authorities are trusted for client certificate validation.\n\nThe key challenge in enterprise environments is certificate lifecycle management. Certificates expire, get revoked, and need rotation. Implement certificate monitoring and alerting so that expiring certificates are caught before they cause outages.\n\nDataPower can extract information from client certificates and use it for authorization decisions. For example, you can extract the Common Name (CN) or Subject Alternative Name (SAN) and use it to determine which APIs the client is authorized to access.\n\nCombining mTLS with OAuth 2.0 provides defense in depth. Use mTLS for transport security and OAuth for application-level authorization.",
        "date": "2024-08-05",
        "tags": ["Security", "TLS", "DataPower", "Zero Trust"],
        "read_time": 7,
    },
]


@router.get("/", response_model=List[BlogPost])
def get_posts():
    return [{**p, "content": ""} for p in BLOG_POSTS]


@router.get("/{slug}", response_model=BlogPost)
def get_post(slug: str):
    for post in BLOG_POSTS:
        if post["slug"] == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")
