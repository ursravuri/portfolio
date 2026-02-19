from fastapi import APIRouter, HTTPException
from app.models.schemas import BlogPost
from typing import List, Optional

router = APIRouter()

BLOG_POSTS = [
    {
        "slug": "enterprise-api-ecosystems-governance",
        "title": "Designing Enterprise-Grade API Ecosystems: Governance Models That Actually Scale",
        "category": "API Management",
        "excerpt": "API governance at enterprise scale demands more than documentation standards. This article presents a layered governance model that balances developer agility with organizational control across hundreds of APIs.",
        "content": """## The Governance Gap

Most enterprises treat API governance as an afterthought — a set of naming conventions stapled to a wiki page. The result is predictable: inconsistent APIs, duplicated functionality, security blind spots, and a developer experience that erodes trust in the platform.

True API governance is an architectural discipline. It must be embedded into the API lifecycle — not bolted on after the fact.

## A Layered Governance Model

Effective governance operates at three layers:

### Layer 1: Design-Time Governance

This is where standards are defined and enforced *before* code is written.

- **API style guides** — Enforce RESTful conventions, naming patterns, versioning schemes, and error response structures.
- **Schema registries** — Maintain a shared repository of reusable data models (OpenAPI components, JSON Schema definitions).
- **Linting in CI/CD** — Tools like Spectral or Redocly CLI validate API definitions against organizational rules on every pull request.

**Key principle:** If a governance rule cannot be automated, it will not be followed consistently.

### Layer 2: Runtime Governance

Runtime governance ensures that deployed APIs behave according to policy.

- **Rate limiting and throttling** — Enforce consumption tiers per consumer, per product.
- **Security policy enforcement** — Mandate OAuth 2.0 scopes, mTLS requirements, or JWT validation at the gateway layer (DataPower, APIC).
- **Traffic analytics** — Monitor API usage patterns to detect anomalies, deprecated endpoint usage, and SLA violations.

### Layer 3: Lifecycle Governance

This governs the API from inception to retirement.

- **API cataloging** — Every API must be registered in the developer portal with ownership, SLA, and deprecation timeline.
- **Versioning policy** — Define when breaking changes require a new major version vs. backward-compatible extensions.
- **Sunset process** — Automated notifications to consumers 90/60/30 days before deprecation.

## Decision Framework: Centralized vs. Federated

| Factor | Centralized | Federated |
|--------|------------|-----------|
| Consistency | High | Medium |
| Agility | Low | High |
| Ownership | Platform team | Domain teams |
| Best for | Regulated industries | Fast-moving product orgs |

Most mature organizations land on a **federated model with centralized guardrails**: domain teams own their APIs but must comply with platform-level standards enforced through automation.

## Architecture: Governance Enforcement Points

```
┌─────────────────────────────────────────────┐
│              Developer Portal               │
│   (Catalog, Docs, Self-Service Onboarding)  │
├─────────────────────────────────────────────┤
│            API Gateway (DataPower)           │
│   (Rate Limits, Security, Traffic Policies) │
├─────────────────────────────────────────────┤
│          API Manager (API Connect)           │
│   (Lifecycle, Products, Plans, Analytics)   │
├─────────────────────────────────────────────┤
│              CI/CD Pipeline                  │
│   (Linting, Schema Validation, Tests)       │
└─────────────────────────────────────────────┘
```

## Key Takeaways

- Governance must be automated to be effective — manual review gates create bottlenecks without improving quality.
- Design-time governance (linting, schema registries) prevents problems; runtime governance (rate limits, security) contains them.
- Federated ownership with centralized guardrails is the most scalable model for large organizations.
- Treat your API catalog as a product — if developers cannot discover APIs, governance has failed.
- Measure governance effectiveness through API consistency scores, not compliance checklists.""",
        "date": "2025-02-10",
        "tags": ["API Management", "Governance", "Enterprise Architecture", "API Connect"],
        "read_time": 12,
    },
    {
        "slug": "unified-api-lifecycle",
        "title": "From Chaos to Control: Building a Unified API Lifecycle in Large Organizations",
        "category": "API Management",
        "excerpt": "Large organizations often struggle with fragmented API practices across teams. This article outlines a unified lifecycle approach — from design through retirement — that brings coherence without killing velocity.",
        "content": """## The Lifecycle Problem

In most large enterprises, the API lifecycle is fragmented. One team uses Swagger, another uses RAML. One group deploys to AWS API Gateway, another to DataPower. Consumer onboarding is manual in one division and self-service in another.

The result is not just inconsistency — it is operational risk. Without a unified lifecycle, you cannot answer basic questions: How many APIs do we have? Who consumes them? Which ones are vulnerable?

## The Five Phases of API Lifecycle

### Phase 1: Design

Every API begins as a contract. The OpenAPI Specification (OAS) is the industry standard, and it should be the single source of truth.

**Best practices:**
- Design-first, not code-first. The API definition is written before implementation begins.
- Use shared component libraries for common patterns: pagination, error responses, HATEOAS links.
- Peer review API designs the same way you review code — with pull requests and automated checks.

### Phase 2: Build

Implementation should be generated from the API definition wherever possible.

- **Server stubs** — Generate skeleton implementations from OpenAPI definitions.
- **Client SDKs** — Auto-generate consumer libraries to reduce integration friction.
- **Contract testing** — Validate that the implementation matches the specification on every build.

### Phase 3: Secure

Security is not a phase — it is a cross-cutting concern. But there are specific checkpoints:

- **Authentication** — OAuth 2.0 with appropriate grant types per use case.
- **Authorization** — Scope-based access control enforced at the gateway.
- **Transport** — TLS 1.2+ mandatory; mTLS for service-to-service communication.
- **Payload validation** — Schema validation at the gateway prevents injection attacks.

### Phase 4: Manage

Once deployed, APIs must be actively managed through API Connect or equivalent platforms.

- **Products and plans** — Bundle APIs into products with consumption tiers.
- **Developer portal** — Self-service onboarding with interactive documentation.
- **Analytics** — Track adoption, latency percentiles, error rates, and consumer health.

### Phase 5: Retire

APIs have a lifecycle end. Managed deprecation prevents consumer disruption.

- **Deprecation headers** — Add `Sunset` and `Deprecation` headers to responses.
- **Consumer notification** — Automated outreach at 90, 60, and 30 days.
- **Traffic monitoring** — Only retire when active consumer count reaches zero or a defined threshold.

## Unifying the Lifecycle Across Teams

The key to unification is not mandating a single tool — it is mandating a single process with defined interfaces between stages.

```
Design (OAS) ──► Build (CI/CD) ──► Secure (Gateway) ──► Manage (Portal) ──► Retire (Sunset)
     │                │                  │                   │                    │
     └── Linting      └── Tests          └── Policies        └── Analytics       └── Notifications
```

Each phase has:
1. **An artifact** — the output that moves to the next phase (e.g., validated OAS → deployment package).
2. **A quality gate** — automated checks that must pass before promotion.
3. **An owner** — a team or role responsible for that phase.

## Key Takeaways

- A unified lifecycle does not mean one tool — it means one process with clear interfaces.
- Design-first API development prevents the most expensive category of defects: contract mismatches.
- Security is woven through every phase, not a standalone step.
- Measure lifecycle health through lead time (design to production) and change failure rate.
- Retirement is as important as creation — unmanaged API sprawl is a security and operational liability.""",
        "date": "2025-01-28",
        "tags": ["API Lifecycle", "API Management", "DevOps", "Enterprise"],
        "read_time": 14,
    },
    {
        "slug": "future-api-gateways-hybrid-zero-trust",
        "title": "The Future of API Gateways: Hybrid, Multi-Cloud, and Zero-Trust Ready",
        "category": "Enterprise Architecture",
        "excerpt": "API gateways are evolving from simple traffic managers to intelligent security enforcement points. This article examines the architectural shifts driving the next generation of gateway platforms.",
        "content": """## Beyond Traffic Management

The first generation of API gateways was simple: route traffic, apply rate limits, transform payloads. The next generation must handle a fundamentally different challenge: securing and managing APIs across hybrid and multi-cloud environments where the network perimeter no longer exists.

## Three Architectural Shifts

### Shift 1: Hybrid Deployment Models

Modern enterprises run APIs across on-premises data centers, private clouds, and multiple public clouds. The gateway must follow the APIs.

**Pattern: Distributed Gateway Mesh**

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   On-Premises     │  │    AWS Region     │  │   Azure Region    │
│   DataPower GW    │  │   Gateway Node    │  │   Gateway Node    │
│   ┌────────────┐  │  │   ┌────────────┐  │  │   ┌────────────┐  │
│   │ Local APIs │  │  │   │ Cloud APIs │  │  │   │ Cloud APIs │  │
│   └────────────┘  │  │   └────────────┘  │  │   └────────────┘  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                     │
         └─────────── Central Management ────────────┘
                    (API Connect Manager)
```

The management plane is centralized; the data plane is distributed. This allows consistent policy enforcement regardless of where the API runs.

### Shift 2: Zero-Trust Security Model

Zero-trust assumes no implicit trust based on network location. Every API call must be authenticated, authorized, and encrypted — even between internal services.

**Implementation at the gateway:**

- **Identity-aware routing** — Route decisions based on verified caller identity, not source IP.
- **Per-request authorization** — Evaluate OAuth scopes and RBAC policies on every request, not just at session establishment.
- **mTLS everywhere** — Certificate-based mutual authentication for all service-to-service traffic.
- **Token exchange** — Gateway performs OAuth token exchange to map external tokens to internal service tokens with reduced scope.

### Shift 3: Programmable Intelligence

Modern gateways must be programmable — not just configurable.

- **GatewayScript / Lua** — Custom logic for complex transformation, validation, and routing decisions.
- **WebAssembly (Wasm)** — Emerging standard for portable, sandboxed gateway extensions.
- **External callouts** — Gateway delegates decisions to external services (OPA for policy, ML models for anomaly detection).

## Decision Framework: Choosing a Gateway Architecture

| Requirement | Traditional Gateway | Distributed Mesh | Service Mesh Sidecar |
|-------------|-------------------|------------------|---------------------|
| North-South traffic | Excellent | Good | Weak |
| East-West traffic | Weak | Good | Excellent |
| Centralized policy | Yes | Yes | Partial |
| Latency overhead | Low | Medium | Very Low |
| Operational complexity | Low | Medium | High |

Most enterprises need a **combination**: a gateway for north-south (external) traffic and a service mesh for east-west (internal) traffic, with unified policy management across both.

## Key Takeaways

- The API gateway is evolving from a perimeter device to a distributed security enforcement layer.
- Hybrid deployment requires separating the management plane (centralized) from the data plane (distributed).
- Zero-trust for APIs means identity-based access control on every request, not network-based trust.
- Programmable gateways (GatewayScript, Wasm) enable custom security logic without vendor lock-in.
- The future architecture combines API gateways (north-south) with service meshes (east-west) under unified governance.""",
        "date": "2025-01-15",
        "tags": ["API Gateway", "Zero Trust", "Multi-Cloud", "DataPower", "Architecture"],
        "read_time": 13,
    },
    {
        "slug": "api-productization",
        "title": "API Productization: Turning Internal Services Into Business-Ready Digital Assets",
        "category": "API Management",
        "excerpt": "APIs are products, not projects. This article lays out the strategy and architecture for transforming internal services into monetizable, self-service digital assets with proper packaging, pricing, and developer experience.",
        "content": """## APIs as Products

The shift from "API as integration endpoint" to "API as product" is the defining transformation in modern enterprise architecture. A product mindset means treating API consumers as customers — with onboarding journeys, SLAs, versioning contracts, and feedback loops.

## The Product Architecture

### Packaging: Products, Plans, and Subscriptions

In IBM API Connect, APIs are packaged into **Products** that contain one or more APIs with associated **Plans**.

```
Product: Payment Services
├── Plan: Free Tier (100 req/day, no SLA)
├── Plan: Professional ($99/mo, 10K req/day, 99.9% SLA)
└── Plan: Enterprise (Custom pricing, unlimited, 99.99% SLA, dedicated support)
    ├── API: Payment Processing v2
    ├── API: Invoice Management v1
    └── API: Transaction History v1
```

Each plan defines:
- **Rate limits** — Requests per second, per day, per month.
- **Burst limits** — Short-term traffic spikes allowed above the sustained rate.
- **SLA commitments** — Uptime guarantees backed by monitoring.
- **Scope restrictions** — Which API operations are available in each tier.

### Developer Experience

The developer portal is the storefront for your API products.

**Essential portal capabilities:**
- **Interactive documentation** — Try-it-now consoles powered by OpenAPI specs.
- **Self-service onboarding** — Developers can subscribe, get API keys, and start calling APIs without human intervention.
- **SDKs and code samples** — Auto-generated client libraries in popular languages.
- **Analytics dashboard** — Consumers can monitor their own usage, latency, and error rates.

### Monetization Models

| Model | Description | Best For |
|-------|-------------|----------|
| Freemium | Free tier with paid upgrades | Developer adoption |
| Pay-per-call | Metered billing per API call | Variable-volume consumers |
| Subscription | Fixed monthly fee per tier | Predictable revenue |
| Revenue share | Percentage of transaction value | Marketplace APIs |

### Quality Assurance

API products require the same quality rigor as any software product:

- **Contract testing** — Automated validation that the API matches its published specification.
- **Performance SLA monitoring** — Continuous measurement against published latency and uptime commitments.
- **Consumer health scoring** — Track integration quality per consumer (error rates, retry patterns, deprecated endpoint usage).

## Key Takeaways

- Treat API consumers as customers: invest in onboarding, documentation, and support.
- Package APIs into products with tiered plans that match different consumer needs.
- The developer portal is your API storefront — its quality directly impacts adoption.
- Measure product success through adoption rate, time-to-first-call, and consumer retention.
- API productization transforms cost centers (internal services) into revenue generators (digital assets).""",
        "date": "2025-01-05",
        "tags": ["API Products", "Developer Portal", "API Connect", "Monetization"],
        "read_time": 11,
    },
    {
        "slug": "multi-issuer-jwt-validation",
        "title": "Mastering Multi-Issuer JWT Validation: Patterns for Complex Enterprise Environments",
        "category": "Security",
        "excerpt": "Enterprise environments rarely have a single identity provider. This article details patterns for validating JWTs from multiple issuers — handling key rotation, claim mapping, and trust chain management at the API gateway.",
        "content": """## The Multi-Issuer Challenge

In a simple world, every JWT comes from one identity provider with one signing key. Enterprise reality is different: acquired companies bring their own IdPs, partners use their own OAuth servers, and internal services may use different token issuers per environment.

Your API gateway must validate tokens from all of these issuers without becoming a maintenance nightmare.

## Pattern 1: Issuer-Based Routing

The gateway inspects the `iss` claim in the JWT header (without full validation) to determine which validation configuration to apply.

```
Incoming JWT
     │
     ▼
Parse Header (no validation)
     │
     ▼
Extract "iss" claim
     │
     ├── iss = "https://idp.company-a.com"  ──► Validate with JWKS from Company A
     ├── iss = "https://auth.partner-b.com"  ──► Validate with JWKS from Partner B
     └── iss = "https://internal.corp.net"   ──► Validate with JWKS from Internal IdP
```

**Implementation on DataPower (GatewayScript):**

```javascript
var jose = require('jose');
var sm = require('service-metadata');

// Extract issuer from unverified token
var token = sm.getVar('request.headers.authorization').replace('Bearer ', '');
var parts = token.split('.');
var payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());

var issuerConfig = {
  'https://idp.company-a.com': {
    jwksUri: 'https://idp.company-a.com/.well-known/jwks.json',
    audience: 'api.company-a.com',
    clockSkew: 30
  },
  'https://auth.partner-b.com': {
    jwksUri: 'https://auth.partner-b.com/keys',
    audience: 'partner-api',
    clockSkew: 60
  }
};

var config = issuerConfig[payload.iss];
if (!config) {
  sm.setVar('error-message', 'Unknown token issuer');
  session.reject('Unknown issuer');
}
```

## Pattern 2: JWKS Aggregation

Instead of routing per issuer, aggregate all trusted JWKS endpoints into a single cached key store. The gateway tries each key until validation succeeds.

**Advantages:** Simpler routing logic.
**Disadvantages:** Higher validation cost if many issuers; potential for key ID collisions.

**Mitigation:** Use the `kid` (Key ID) claim to index keys across all issuers, and ensure key IDs are globally unique.

## Pattern 3: Token Exchange at the Gateway

The gateway validates the external token and exchanges it for an internal canonical token. Downstream services only need to validate tokens from one issuer.

```
External Token (any issuer)
     │
     ▼
Gateway validates against external JWKS
     │
     ▼
Gateway issues internal JWT
  - iss: "gateway.internal.corp"
  - sub: mapped from external token
  - scopes: translated to internal scopes
  - exp: short-lived (5 min)
     │
     ▼
Downstream services validate only internal tokens
```

This is the most operationally clean pattern for large environments. It creates a trust boundary at the gateway.

## Key Rotation Handling

Every multi-issuer setup must handle key rotation gracefully:

1. **Cache JWKS with TTL** — Refresh every 5-15 minutes, not on every request.
2. **Fallback fetch** — If validation fails with cached keys, fetch fresh JWKS once before rejecting.
3. **Monitor key expiry** — Alert when signing certificates approach expiration.
4. **Support multiple active keys** — During rotation, both old and new keys must be valid simultaneously.

## Claim Mapping and Normalization

Different issuers use different claim names for the same concept:

| Concept | Issuer A | Issuer B | Normalized |
|---------|----------|----------|------------|
| User ID | `sub` | `user_id` | `sub` |
| Email | `email` | `mail` | `email` |
| Roles | `roles` | `groups` | `roles` |
| Tenant | `tenant_id` | `org` | `tenant_id` |

The gateway should normalize claims into a canonical format before forwarding to backend services.

## Key Takeaways

- Multi-issuer JWT validation is inevitable in enterprises with acquisitions, partnerships, or multiple IdPs.
- Token exchange at the gateway creates the cleanest architecture — downstream services validate against one issuer.
- JWKS caching with fallback refresh handles key rotation without downtime.
- Claim normalization at the gateway prevents every backend service from implementing issuer-specific logic.
- Always validate the `iss` claim against an allowlist — never accept tokens from unknown issuers.""",
        "date": "2024-12-20",
        "tags": ["JWT", "Security", "DataPower", "OAuth", "Identity"],
        "read_time": 15,
    },
    {
        "slug": "oauth-security-pitfalls",
        "title": "OAuth Done Right: Avoiding the Top Security Pitfalls in Modern API Platforms",
        "category": "Security",
        "excerpt": "OAuth 2.0 is powerful but unforgiving of misconfigurations. This article catalogs the most dangerous OAuth pitfalls in enterprise API platforms and provides concrete remediation patterns.",
        "content": """## OAuth Is a Framework, Not a Solution

OAuth 2.0 is a specification framework — it defines grant types, token types, and protocol flows. But it leaves critical security decisions to the implementer. This flexibility is both its strength and its danger.

## Pitfall 1: Using the Wrong Grant Type

The most common mistake is using the implicit grant for applications that can keep a secret, or using client credentials when user context is needed.

**Decision matrix:**

| Application Type | Recommended Grant | Why |
|-----------------|-------------------|-----|
| Server-to-server | Client Credentials | No user context needed; secrets are safe |
| Web app (server-rendered) | Authorization Code | Server keeps the secret; code is exchanged server-side |
| SPA / Mobile | Authorization Code + PKCE | No client secret; PKCE prevents code interception |
| IoT / Limited input | Device Authorization | User authorizes on a separate device |

**Never use the implicit grant.** It was deprecated in OAuth 2.1 because tokens are exposed in URL fragments and browser history.

## Pitfall 2: Insufficient Scope Design

Scopes that are too broad (e.g., `read`, `write`) provide no meaningful access control. Scopes that are too granular (e.g., `user.profile.email.read`) create management nightmares.

**Effective scope design:**
- Align scopes with business capabilities: `payments:read`, `payments:initiate`, `accounts:manage`.
- Use hierarchical scopes: `orders:*` grants all order-related permissions.
- Document scope requirements per API operation in the OpenAPI specification.

## Pitfall 3: Token Lifetime Mismanagement

**Common mistakes:**
- Access tokens that live for hours or days (should be 5-15 minutes).
- Refresh tokens that never expire (should have absolute expiry).
- No token revocation endpoint.

**Best practice token lifetimes:**

```
Access Token:    5-15 minutes (short-lived, stateless)
Refresh Token:   8-24 hours (longer-lived, revocable)
Authorization Code: 60 seconds (single-use, very short)
```

## Pitfall 4: Missing PKCE for Public Clients

PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks. Without it, any application that intercepts the authorization code can exchange it for tokens.

**PKCE flow:**
1. Client generates a random `code_verifier`.
2. Client computes `code_challenge = SHA256(code_verifier)`.
3. Authorization request includes `code_challenge`.
4. Token request includes `code_verifier`.
5. Server verifies `SHA256(code_verifier) == code_challenge`.

This is mandatory for SPAs and mobile apps, and recommended for all clients in OAuth 2.1.

## Pitfall 5: Redirect URI Validation

Loose redirect URI validation enables authorization code theft.

**Rules:**
- Exact match only — no wildcards, no pattern matching.
- HTTPS mandatory (except localhost for development).
- Register all valid redirect URIs in advance.
- Reject any authorization request with an unregistered redirect URI.

## Pitfall 6: Not Validating Token Claims

Receiving a valid JWT is not enough. You must validate:

- **`iss`** — Is this token from a trusted issuer?
- **`aud`** — Is this token intended for my API?
- **`exp`** — Has this token expired?
- **`nbf`** — Is this token being used before its valid-from time?
- **`scope`** — Does this token authorize the requested operation?

Skipping audience validation is especially dangerous — it allows tokens issued for one API to be used against another.

## Key Takeaways

- Use Authorization Code + PKCE for all user-facing applications; implicit grant is deprecated.
- Design scopes around business capabilities, not technical operations.
- Keep access tokens short-lived (5-15 minutes) and refresh tokens revocable.
- Validate all JWT claims — issuer, audience, expiry, and scopes — on every request.
- Redirect URI validation must be exact match; wildcards create authorization code theft vulnerabilities.""",
        "date": "2024-12-08",
        "tags": ["OAuth", "Security", "PKCE", "API Security", "JWT"],
        "read_time": 14,
    },
    {
        "slug": "zero-trust-apis-datapower-apic",
        "title": "Zero-Trust for APIs: Practical Implementation Using DataPower and APIC",
        "category": "Security",
        "excerpt": "Zero-trust is a philosophy, not a product. This article provides a concrete implementation blueprint for applying zero-trust principles to API traffic using IBM DataPower and API Connect.",
        "content": """## Zero-Trust Principles for APIs

Zero-trust networking assumes that no request is trusted by default — regardless of network location. For APIs, this translates to five principles:

1. **Verify explicitly** — Authenticate and authorize every request based on all available data points.
2. **Least privilege** — Grant minimum permissions required for the operation.
3. **Assume breach** — Design as if the network is already compromised; encrypt everything, log everything.
4. **Micro-segmentation** — Isolate API workloads so compromise of one does not expose others.
5. **Continuous validation** — Re-evaluate trust on every request, not just at session start.

## Implementation Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    External Consumer                      │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTPS + OAuth Bearer Token
                       ▼
┌──────────────────────────────────────────────────────────┐
│              DataPower Gateway (DMZ)                      │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │TLS Term │ │JWT Valid. │ │Scope Chk │ │Rate Limiting│  │
│  └─────────┘ └──────────┘ └──────────┘ └─────────────┘  │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │Payload  │ │IP/Geo    │ │Threat    │ │Audit        │  │
│  │Validate │ │Filtering │ │Protect.  │ │Logging      │  │
│  └─────────┘ └──────────┘ └──────────┘ └─────────────┘  │
└──────────────────────┬───────────────────────────────────┘
                       │ mTLS + Internal JWT (reduced scope)
                       ▼
┌──────────────────────────────────────────────────────────┐
│              Internal Service Mesh                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │Service A │  │Service B │  │Service C │               │
│  │(mTLS)    │  │(mTLS)    │  │(mTLS)    │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└──────────────────────────────────────────────────────────┘
```

## Layer 1: Transport Security

**DataPower TLS Configuration:**
- TLS 1.2 minimum; TLS 1.3 preferred.
- Strong cipher suites only (AES-256-GCM, ChaCha20-Poly1305).
- HSTS headers on all responses.
- Certificate pinning for known consumers.

**mTLS for internal traffic:**
- Every service-to-service call authenticated via client certificates.
- Short-lived certificates (24-72 hours) issued by internal PKI.
- Automatic rotation via cert-manager or equivalent.

## Layer 2: Identity and Access

The gateway enforces identity verification on every request:

1. **Extract** the OAuth bearer token from the Authorization header.
2. **Validate** the JWT signature against the issuer's JWKS.
3. **Check claims**: issuer, audience, expiry, not-before.
4. **Evaluate scopes** against the requested API operation.
5. **Enrich context**: Add verified identity claims to headers for downstream services.

**Token downscoping**: The gateway issues a new internal token with only the scopes needed for the specific backend service being called. This implements least privilege at the token level.

## Layer 3: Payload Security

- **Schema validation** — Reject requests that do not match the OpenAPI schema.
- **Content-type enforcement** — Only accept declared content types.
- **SQL injection and XSS detection** — Pattern-based threat protection at the gateway.
- **Payload size limits** — Prevent denial-of-service via oversized requests.

## Layer 4: Continuous Monitoring

Zero-trust requires comprehensive observability:

- **Access logs** — Every API call logged with identity, source, destination, response code.
- **Anomaly detection** — Alert on unusual patterns (time-of-day, geography, volume spikes).
- **Failed authentication metrics** — Track and alert on brute-force patterns.
- **Certificate expiry monitoring** — Proactive alerts before mTLS certificates expire.

## Key Takeaways

- Zero-trust for APIs means verifying identity, authorization, and payload integrity on every request.
- DataPower as the gateway enforcement point provides TLS termination, JWT validation, and threat protection.
- Token downscoping at the gateway implements least privilege — internal services receive only the permissions they need.
- mTLS between all services eliminates implicit trust based on network location.
- Continuous monitoring and anomaly detection complete the zero-trust model — you cannot trust what you cannot see.""",
        "date": "2024-11-25",
        "tags": ["Zero Trust", "DataPower", "API Connect", "Security", "mTLS"],
        "read_time": 16,
    },
    {
        "slug": "enterprise-pki-api-security",
        "title": "Enterprise PKI for API Security: Architecture, Automation, and Governance",
        "category": "Security",
        "excerpt": "PKI is the backbone of API transport security, but most enterprises manage it poorly. This article presents an architecture for automated, governed PKI that scales with your API ecosystem.",
        "content": """## Why PKI Matters for APIs

Every HTTPS connection, every mTLS handshake, every signed JWT relies on Public Key Infrastructure. Yet in most enterprises, PKI is managed through spreadsheets, manual certificate requests, and emergency weekend rotations when certificates expire unexpectedly.

For API-centric architectures, PKI failures cause cascading outages. A single expired certificate can take down hundreds of API integrations simultaneously.

## PKI Architecture for API Ecosystems

### Certificate Hierarchy

```
Root CA (Offline, HSM-protected)
├── Issuing CA: External APIs
│   ├── DataPower Gateway Certs (TLS server)
│   ├── Developer Portal Certs (TLS server)
│   └── Consumer Client Certs (mTLS)
├── Issuing CA: Internal Services
│   ├── Service-to-Service Certs (mTLS, short-lived)
│   └── JWT Signing Keys
└── Issuing CA: Infrastructure
    ├── Load Balancer Certs
    └── Management Interface Certs
```

**Key design decisions:**
- **Root CA offline** — The root CA private key never touches a network-connected system.
- **Separate issuing CAs per trust domain** — Compromise of one issuing CA does not affect others.
- **Short-lived certificates for internal services** — 24-72 hour lifetime reduces the blast radius of key compromise.

### Automation

Manual certificate management does not scale. Automate the full lifecycle:

1. **Certificate request** — APIs self-request certificates via API (ACME protocol or custom enrollment).
2. **Issuance** — Automated approval based on policy (namespace, domain, requestor identity).
3. **Deployment** — Certificates pushed to DataPower crypto objects, Kubernetes secrets, or load balancers.
4. **Monitoring** — Continuous scanning for certificates approaching expiry.
5. **Rotation** — Automated replacement with zero-downtime deployment.
6. **Revocation** — CRL or OCSP responder updated within minutes of revocation decision.

### DataPower Certificate Management

On DataPower, certificates are managed through crypto objects:

- **Crypto Key** — Stores the private key.
- **Crypto Certificate** — Stores the public certificate.
- **Crypto Identification Credential** — Pairs key + certificate for server identity.
- **Crypto Validation Credential** — Defines trusted CAs for client certificate validation.

Automate DataPower certificate updates through the REST Management Interface — never manually upload certificates in production.

## Governance Framework

PKI governance ensures that certificates are issued, managed, and revoked according to organizational policy.

| Control | Implementation |
|---------|---------------|
| Key length minimum | RSA 2048+ or ECC P-256+ enforced at CA |
| Maximum certificate lifetime | 1 year external, 90 days internal |
| Revocation SLA | CRL/OCSP updated within 1 hour |
| HSM requirement | All CA keys stored in FIPS 140-2 Level 3 HSMs |
| Audit logging | All issuance, renewal, and revocation events logged |

## Key Takeaways

- PKI is infrastructure — treat it with the same rigor as compute, storage, and networking.
- Automate the full certificate lifecycle: request, issue, deploy, monitor, rotate, revoke.
- Short-lived certificates (24-72 hours) for internal services reduce the blast radius of compromise.
- Separate issuing CAs per trust domain prevent cross-domain compromise propagation.
- Monitor certificate expiry proactively — expired certificates cause cascading API outages.""",
        "date": "2024-11-10",
        "tags": ["PKI", "Security", "Certificates", "DataPower", "Automation"],
        "read_time": 13,
    },
    {
        "slug": "high-availability-mq-datapower-apic",
        "title": "Building High-Availability Integration Layers with MQ, DataPower, and APIC",
        "category": "Middleware",
        "excerpt": "Downtime in integration middleware cascades to every connected system. This article architects a high-availability integration layer using IBM MQ, DataPower, and API Connect with concrete patterns for failover, scaling, and disaster recovery.",
        "content": """## The High-Availability Imperative

Integration middleware sits at the center of enterprise communication. When the API gateway is down, no external consumer can reach any backend service. When MQ is down, no asynchronous message processing occurs. The blast radius of middleware failures is enormous.

## Architecture: Active-Active with DR

```
                    ┌─────────────────────────┐
                    │     Global Load Balancer  │
                    │     (DNS-based failover)  │
                    └─────────┬───────┬────────┘
                              │       │
              ┌───────────────┘       └───────────────┐
              ▼                                       ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│     Primary Data Center   │      │    Secondary Data Center  │
│                          │      │    (Active-Active or DR)  │
│  ┌────────────────────┐  │      │  ┌────────────────────┐  │
│  │ DataPower Cluster   │  │      │  │ DataPower Cluster   │  │
│  │ (Active-Active)     │  │      │  │ (Active-Active)     │  │
│  │ Node 1  │  Node 2   │  │      │  │ Node 3  │  Node 4   │  │
│  └────────┬───────────┘  │      │  └────────┬───────────┘  │
│           │              │      │           │              │
│  ┌────────┴───────────┐  │      │  ┌────────┴───────────┐  │
│  │ MQ Queue Manager    │  │◄────►│  │ MQ Queue Manager    │  │
│  │ (Multi-Instance)    │  │ Rep. │  │ (Multi-Instance)    │  │
│  └────────────────────┘  │      │  └────────────────────┘  │
│                          │      │                          │
│  ┌────────────────────┐  │      │  ┌────────────────────┐  │
│  │ API Connect Mgmt    │  │      │  │ API Connect Mgmt    │  │
│  │ (HA Cluster)        │  │      │  │ (Standby)           │  │
│  └────────────────────┘  │      │  └────────────────────┘  │
└──────────────────────────┘      └──────────────────────────┘
```

## DataPower High Availability

### Active-Active Clustering

DataPower nodes in active-active configuration share no state — each node independently processes requests. This enables linear horizontal scaling.

**Load balancer requirements:**
- Health check: HTTP GET to DataPower health endpoint.
- Session affinity: Not required (stateless processing).
- Failover: Remove unhealthy nodes within 10 seconds.

**Configuration synchronization:**
- Use the DataPower Configuration Management or API Connect to push configuration changes to all nodes.
- Never manually configure individual nodes in production.

### Circuit Breaker Pattern

When backend services are unavailable, DataPower should fail fast rather than queue requests:

- **Timeout**: 30 seconds maximum for backend connections.
- **Retry**: 1 retry with exponential backoff.
- **Circuit breaker**: Open circuit after 5 consecutive failures; half-open after 30 seconds.

## IBM MQ High Availability

### Multi-Instance Queue Manager

MQ multi-instance provides automatic failover:
- Active instance processes messages.
- Standby instance monitors the active instance.
- Shared storage (NFS, GPFS) holds queue data.
- Failover completes in under 30 seconds.

### Message Persistence Patterns

| Pattern | Use Case | Trade-off |
|---------|----------|-----------|
| Persistent + Transactional | Financial transactions | Highest reliability, higher latency |
| Persistent + Non-transactional | Event notifications | Good reliability, moderate latency |
| Non-persistent | Real-time telemetry | Lowest latency, messages lost on failure |

## Disaster Recovery

**RTO/RPO targets:**

| Component | RTO | RPO |
|-----------|-----|-----|
| DataPower Gateway | < 5 min | 0 (stateless) |
| MQ (persistent messages) | < 30 min | 0 (replicated) |
| API Connect Management | < 2 hours | < 15 min |

DataPower DR is straightforward — it is stateless. Deploy identical configuration to the DR site and route traffic via DNS failover.

MQ DR requires message replication between sites. Use MQ native replication or an intermediate messaging bridge.

## Key Takeaways

- Active-active DataPower clustering provides both high availability and horizontal scaling.
- IBM MQ multi-instance queue managers deliver automatic failover with sub-30-second recovery.
- Stateless gateway design (DataPower) simplifies DR — identical configuration, DNS failover.
- Circuit breakers at the gateway prevent cascade failures when backend services are unavailable.
- Define RTO/RPO targets per component and validate them through regular DR testing.""",
        "date": "2024-10-28",
        "tags": ["MQ", "DataPower", "API Connect", "High Availability", "Middleware"],
        "read_time": 15,
    },
    {
        "slug": "gatewayscript-power-patterns",
        "title": "GatewayScript Power Patterns: Reusable Modules for Real-World API Traffic",
        "category": "Middleware",
        "excerpt": "GatewayScript is DataPower's JavaScript runtime for custom API processing. This article presents battle-tested patterns for logging, transformation, security enforcement, and error handling.",
        "content": """## GatewayScript Fundamentals

GatewayScript is DataPower's server-side JavaScript engine for custom API processing logic. It runs in the gateway pipeline and can inspect, transform, route, and validate API traffic.

Unlike configuration-based policies, GatewayScript enables complex logic that would be impossible with declarative rules alone.

## Pattern 1: Structured Logging

Every API call should produce a structured log entry for observability:

```javascript
var sm = require('service-metadata');
var hm = require('header-metadata');

var logEntry = {
  timestamp: new Date().toISOString(),
  transactionId: sm.getVar('var://service/transaction-id'),
  clientIP: sm.getVar('var://service/client-ip-addr'),
  method: sm.getVar('var://service/protocol-method'),
  uri: sm.getVar('var://service/URI'),
  statusCode: sm.getVar('var://service/error-code') || 200,
  latencyMs: sm.getVar('var://service/time-elapsed'),
  consumerOrg: hm.current.get('X-Consumer-Org') || 'unknown',
  apiProduct: sm.getVar('var://context/api/properties/product') || 'unknown'
};

console.info(JSON.stringify(logEntry));
```

This produces machine-parseable JSON logs that feed into Splunk, ELK, or any log aggregation platform.

## Pattern 2: Dynamic Routing

Route requests to different backends based on request content, consumer identity, or custom headers:

```javascript
var sm = require('service-metadata');
var hm = require('header-metadata');

var region = hm.current.get('X-Consumer-Region') || 'us-east';

var backends = {
  'us-east': 'https://api-east.internal.corp:8443',
  'us-west': 'https://api-west.internal.corp:8443',
  'eu':      'https://api-eu.internal.corp:8443'
};

var target = backends[region] || backends['us-east'];
sm.setVar('var://service/routing-url', target + sm.getVar('var://service/URI'));
```

## Pattern 3: Response Transformation

Transform backend responses to match the API contract, stripping internal details:

```javascript
session.input.readAsJSON(function(error, json) {
  if (error) {
    session.reject('Unable to parse response');
    return;
  }

  // Remove internal fields
  delete json._internalId;
  delete json._debugInfo;
  delete json.databaseQuery;

  // Rename fields to match API contract
  var transformed = {
    id: json.customerId,
    name: json.customerName,
    email: json.contactEmail,
    status: json.accountStatus.toLowerCase(),
    createdAt: json.createTimestamp
  };

  session.output.write(JSON.stringify(transformed));
});
```

## Pattern 4: Correlation ID Propagation

Ensure every request carries a correlation ID through the entire call chain:

```javascript
var hm = require('header-metadata');
var uuid = require('uuid');

var correlationId = hm.current.get('X-Correlation-ID');

if (!correlationId) {
  correlationId = uuid.v4();
}

// Set on request to backend
hm.current.set('X-Correlation-ID', correlationId);

// Set on response to consumer
hm.response.set('X-Correlation-ID', correlationId);
```

## Pattern 5: Error Standardization

Standardize error responses across all APIs regardless of backend behavior:

```javascript
var sm = require('service-metadata');

session.input.readAsJSON(function(error, json) {
  var statusCode = parseInt(sm.getVar('var://service/error-code')) || 500;

  var errorResponse = {
    error: {
      code: statusCode,
      message: getPublicMessage(statusCode),
      correlationId: sm.getVar('var://service/transaction-id'),
      timestamp: new Date().toISOString()
    }
  };

  // Never expose internal error details to consumers
  sm.setVar('var://service/error-code', statusCode);
  session.output.write(JSON.stringify(errorResponse));
});

function getPublicMessage(code) {
  var messages = {
    400: 'The request was malformed or contained invalid parameters.',
    401: 'Authentication is required. Please provide a valid access token.',
    403: 'You do not have permission to access this resource.',
    404: 'The requested resource was not found.',
    429: 'Rate limit exceeded. Please retry after the indicated period.',
    500: 'An internal error occurred. Please try again later.',
    503: 'The service is temporarily unavailable. Please try again later.'
  };
  return messages[code] || messages[500];
}
```

## Key Takeaways

- GatewayScript transforms DataPower from a configurable gateway to a programmable one.
- Structured JSON logging enables machine-parseable observability across your API ecosystem.
- Correlation ID propagation is essential for distributed tracing — generate at the edge, propagate everywhere.
- Standardize error responses at the gateway so consumers get a consistent experience regardless of backend behavior.
- Build reusable GatewayScript modules — shared libraries reduce duplication and improve maintainability.""",
        "date": "2024-10-15",
        "tags": ["GatewayScript", "DataPower", "JavaScript", "API Patterns", "Middleware"],
        "read_time": 14,
    },
    {
        "slug": "modernizing-legacy-integrations",
        "title": "Modernizing Legacy Integrations: A Blueprint for Hybrid Middleware Architectures",
        "category": "Enterprise Architecture",
        "excerpt": "Legacy integration systems cannot be replaced overnight. This article provides a phased modernization blueprint that introduces modern API patterns while preserving existing investments in MQ, CICS, and mainframe connectivity.",
        "content": """## The Modernization Dilemma

Every enterprise has legacy integration systems that are too critical to replace and too costly to maintain. Mainframe CICS transactions, MQ-based batch processing, SOAP web services, and FTP file transfers — these systems process billions of dollars in transactions and cannot be turned off.

The goal is not to replace legacy — it is to wrap it in modern API patterns that enable new consumers while preserving reliability.

## The Strangler Fig Pattern for Middleware

The Strangler Fig pattern is the safest approach to middleware modernization. New capabilities are built alongside existing systems, and traffic is gradually migrated.

```
Phase 1: Facade
┌─────────────────────┐
│   API Gateway        │
│   (DataPower)        │
│   ┌───────────────┐  │
│   │ REST Facade   │──┼──► Legacy SOAP Service
│   └───────────────┘  │
└─────────────────────┘

Phase 2: Mediation
┌─────────────────────┐
│   API Gateway        │
│   (DataPower)        │
│   ┌───────────────┐  │
│   │ REST API      │──┼──► New Microservice
│   │               │──┼──► Legacy (fallback)
│   └───────────────┘  │
└─────────────────────┘

Phase 3: Migration Complete
┌─────────────────────┐
│   API Gateway        │
│   (DataPower)        │
│   ┌───────────────┐  │
│   │ REST API      │──┼──► Microservice
│   └───────────────┘  │
└─────────────────────┘
   Legacy decommissioned
```

## Pattern 1: REST-to-SOAP Facade

The most common legacy integration pattern. The gateway exposes a REST API and translates to SOAP on the backend.

**DataPower handles:**
- JSON to XML transformation.
- SOAP envelope construction with proper namespace handling.
- WSDL-based validation of outbound SOAP requests.
- XML to JSON transformation of SOAP responses.
- Error mapping: SOAP faults → REST error responses.

## Pattern 2: API-to-MQ Bridge

Many legacy systems communicate exclusively through MQ. The gateway bridges synchronous API calls to asynchronous MQ messaging.

**Synchronous bridge (request-reply):**
1. Consumer sends REST request to gateway.
2. Gateway places message on MQ request queue with a correlation ID.
3. Gateway waits for reply on a temporary or shared reply queue.
4. Gateway transforms MQ response to REST response.

**Asynchronous bridge (fire-and-forget):**
1. Consumer sends REST request.
2. Gateway places message on MQ queue.
3. Gateway returns 202 Accepted with a polling URL.
4. Consumer polls for completion.

## Pattern 3: Mainframe Connectivity

CICS and IMS transactions can be exposed as REST APIs through several approaches:

| Approach | Latency | Complexity | Best For |
|----------|---------|------------|----------|
| CICS Web Services (SOAP) | Low | Medium | Existing CICS web services |
| MQ-CICS Bridge | Medium | Low | Batch-style transactions |
| z/OS Connect EE | Low | Medium | New REST API exposure |
| DataPower direct (CICS TG) | Low | High | High-performance requirements |

## Anti-Patterns to Avoid

1. **Big bang replacement** — Never attempt to replace all legacy integrations simultaneously.
2. **Transparent proxy** — Simply proxying legacy protocols through a gateway adds latency without value.
3. **Dual-write** — Writing to both legacy and modern systems creates consistency nightmares.
4. **Ignoring data format differences** — Legacy systems often use EBCDIC, packed decimal, and fixed-width formats.

## Key Takeaways

- The Strangler Fig pattern is the safest modernization approach — build alongside, migrate gradually, decommission safely.
- REST-to-SOAP facades at the gateway enable modern consumers to access legacy services without modifying them.
- API-to-MQ bridges connect synchronous API consumers with asynchronous messaging backends.
- Data transformation is the hidden complexity — EBCDIC, packed decimal, and fixed-width formats require careful handling.
- Measure modernization progress through the percentage of traffic flowing through modern APIs vs. legacy protocols.""",
        "date": "2024-09-30",
        "tags": ["Legacy Modernization", "Middleware", "MQ", "DataPower", "Enterprise"],
        "read_time": 14,
    },
    {
        "slug": "observability-middleware-architects",
        "title": "Observability for Middleware: What Architects Must Measure (But Often Don't)",
        "category": "Observability",
        "excerpt": "Most middleware monitoring focuses on uptime and throughput. This article defines the observability metrics that actually matter for API platforms — from latency percentiles to consumer health scoring.",
        "content": """## Beyond Uptime Monitoring

"The API gateway is up" is not meaningful observability. A gateway can be running while returning 500 errors to every consumer. Effective observability answers operational questions: Is the platform healthy? Are consumers experiencing degradation? Where is the bottleneck?

## The Four Pillars of Middleware Observability

### Pillar 1: Latency (Not Just Averages)

Average latency is a misleading metric. A 100ms average can hide that 1% of requests take 5 seconds.

**Measure these percentiles:**

| Percentile | What It Tells You |
|-----------|-------------------|
| p50 (median) | Typical consumer experience |
| p95 | Experience of your most affected 5% |
| p99 | Worst-case experience for 1 in 100 requests |
| p99.9 | Tail latency — often indicates resource contention |

**Where to measure:**
- **Gateway ingress to egress** — Total processing time at the gateway.
- **Gateway to backend** — Backend response time (isolated from gateway overhead).
- **End-to-end** — Consumer to response (requires client-side telemetry).

### Pillar 2: Error Rates by Category

A single "error rate" metric is insufficient. Categorize errors:

- **Client errors (4xx)** — Consumer-caused: bad requests, auth failures, rate limit hits.
- **Server errors (5xx)** — Platform-caused: backend failures, gateway errors, timeouts.
- **Timeout errors** — Subset of 5xx that indicates backend performance issues.
- **Circuit breaker trips** — Indicates a backend is persistently unhealthy.

**Alert thresholds (example):**
```
4xx rate > 10%  → Investigate (consumer misconfiguration?)
5xx rate > 1%   → Warning (backend degradation)
5xx rate > 5%   → Critical (platform outage)
Timeout rate > 2% → Warning (backend latency spike)
```

### Pillar 3: Throughput and Capacity

- **Requests per second (RPS)** — Current vs. maximum tested capacity.
- **Concurrent connections** — Current vs. configured limits.
- **Queue depth (MQ)** — Messages waiting to be processed.
- **Connection pool utilization** — Backend connection pool usage vs. maximum.

**Capacity planning rule:** Alert when sustained utilization exceeds 70% of tested maximum. This provides headroom for traffic spikes.

### Pillar 4: Consumer Health

This is the most overlooked dimension. Track per-consumer metrics:

- **Error rate per consumer** — Is one consumer generating excessive errors?
- **Latency per consumer** — Is one consumer's traffic pattern causing slowdowns?
- **Quota utilization** — Is a consumer approaching their rate limit?
- **Deprecated API usage** — Which consumers still call deprecated endpoints?

Consumer health scoring enables proactive outreach: "We noticed your error rate increased 300% this week. Can we help troubleshoot?"

## Distributed Tracing for Middleware

Correlation IDs must flow through every component:

```
Consumer → Gateway → MQ → Backend Service → Database
   │          │       │         │                │
   └──────────┴───────┴─────────┴────────────────┘
              All share X-Correlation-ID
```

Use OpenTelemetry-compatible tracing to visualize the complete request lifecycle across middleware components.

## DataPower Observability Integration

DataPower provides several telemetry sources:

- **Transaction logs** — Per-request detail including timing, status, and consumer identity.
- **System logs** — Gateway health, resource utilization, configuration changes.
- **Statistics** — Aggregate counters for throughput, errors, and latency.
- **Probes** — Custom instrumentation points in processing policies.

Export these to your observability platform (Splunk, ELK, Datadog, Grafana) via syslog, SNMP, or the REST management interface.

## Key Takeaways

- Measure latency in percentiles (p50, p95, p99), not averages — averages hide tail latency problems.
- Categorize errors (4xx vs. 5xx vs. timeouts) to distinguish consumer problems from platform problems.
- Consumer health scoring enables proactive support and prevents cascading failures from misbehaving clients.
- Distributed tracing with correlation IDs is essential for debugging across gateway, MQ, and backend services.
- Alert on capacity utilization at 70% to maintain headroom for traffic spikes.""",
        "date": "2024-09-15",
        "tags": ["Observability", "Monitoring", "DataPower", "Metrics", "Middleware"],
        "read_time": 13,
    },
    {
        "slug": "decision-trees-api-architects",
        "title": "Decision Trees for API Architects: Choosing the Right Pattern Every Time",
        "category": "Enterprise Architecture",
        "excerpt": "API architects face dozens of design decisions on every project. This article provides structured decision trees for the most common architectural choices — from protocol selection to caching strategy.",
        "content": """## Why Decision Trees Matter

Architectural decisions made early in a project are the most expensive to change later. Yet these decisions are often made based on team familiarity or recent conference talks rather than structured analysis of requirements.

Decision trees provide a repeatable, defensible framework for architectural choices.

## Decision Tree 1: API Protocol Selection

```
Is it client-to-server (north-south)?
├── Yes
│   ├── Need real-time bidirectional? → WebSocket
│   ├── Need server push only? → SSE (Server-Sent Events)
│   ├── Need efficient binary? → gRPC-Web
│   └── General purpose? → REST (HTTP/JSON)
└── No (service-to-service, east-west)
    ├── Need streaming? → gRPC
    ├── Need pub/sub? → Event-driven (MQ, Kafka)
    ├── High throughput, low latency? → gRPC
    └── Simple request/reply? → REST or gRPC
```

**Key insight:** REST is the default for external APIs due to universal client support. gRPC excels for internal service-to-service communication where both sides control the technology stack.

## Decision Tree 2: Synchronous vs. Asynchronous

```
Does the consumer need an immediate response?
├── Yes
│   ├── Response time < 3 seconds? → Synchronous REST
│   └── Response time > 3 seconds?
│       ├── Can consumer poll? → Async with polling
│       └── Can consumer receive callbacks? → Async with webhook
└── No
    ├── Order matters? → MQ (ordered queue)
    ├── Multiple consumers? → Event streaming (Kafka)
    └── Simple fire-and-forget? → MQ (non-persistent)
```

## Decision Tree 3: Authentication Strategy

```
Who is the consumer?
├── External third-party developer
│   └── OAuth 2.0 + Authorization Code + PKCE
├── Internal service (trusted)
│   ├── Same trust domain? → mTLS + JWT (client credentials)
│   └── Cross trust domain? → mTLS + OAuth token exchange
├── Browser SPA
│   └── OAuth 2.0 + Authorization Code + PKCE (BFF pattern)
├── Mobile app
│   └── OAuth 2.0 + Authorization Code + PKCE
└── Partner system (B2B)
    └── mTLS + OAuth 2.0 (client credentials)
```

## Decision Tree 4: Caching Strategy

```
Is the response personalized per user?
├── Yes → No shared cache; consider private cache with short TTL
└── No
    ├── Data changes frequently (< 1 min)? → No cache or very short TTL (10s)
    ├── Data changes moderately (1-60 min)?
    │   ├── Stale data acceptable? → Cache with TTL + stale-while-revalidate
    │   └── Stale data not acceptable? → Cache with event-based invalidation
    └── Data rarely changes (> 1 hour)?
        └── Aggressive caching with long TTL + purge API
```

## Decision Tree 5: API Versioning

```
Is the change backward-compatible?
├── Yes
│   ├── Adding optional field → No version change needed
│   ├── Adding new endpoint → No version change needed
│   └── Adding optional parameter → No version change needed
└── No (breaking change)
    ├── URL versioning (/v2/resource)
    │   └── Best for: External APIs, clear separation
    ├── Header versioning (Accept: application/vnd.api.v2+json)
    │   └── Best for: Internal APIs, content negotiation
    └── Query parameter (?version=2)
        └── Best for: Simple cases, easy testing
```

## Decision Tree 6: Error Handling Strategy

```
What type of failure?
├── Client error (invalid input)
│   └── 400 + detailed validation errors + field-level messages
├── Authentication failure
│   └── 401 + WWW-Authenticate header + token refresh hint
├── Authorization failure
│   └── 403 + required scope information
├── Resource not found
│   └── 404 + resource type and identifier
├── Rate limit exceeded
│   └── 429 + Retry-After header + quota reset time
├── Backend timeout
│   └── 504 + correlation ID + retry guidance
└── Internal error
    └── 500 + correlation ID (never expose internal details)
```

## Key Takeaways

- Decision trees make architectural choices repeatable and defensible — document them for your organization.
- REST is the default for external APIs; gRPC excels for internal service-to-service communication.
- Authentication strategy depends on the consumer type, not the API — external developers, internal services, and B2B partners need different approaches.
- Caching decisions start with one question: is the response personalized per user?
- Version only when you must (breaking changes) and prefer URL versioning for external APIs due to its simplicity.""",
        "date": "2024-09-01",
        "tags": ["Architecture", "Design Patterns", "API Design", "Decision Framework"],
        "read_time": 15,
    },
    {
        "slug": "integration-fabric-digital-backbone",
        "title": "The Integration Fabric: How Enterprises Can Build a Cohesive Digital Backbone",
        "category": "Enterprise Architecture",
        "excerpt": "Enterprises need more than point-to-point integrations — they need an integration fabric that connects all systems through a coherent, governed platform. This article defines the architecture.",
        "content": """## From Point-to-Point to Fabric

Most enterprises grow their integration landscape organically. Team A builds a direct connection to System B. Team C creates another integration to System D. After a decade, the result is a web of point-to-point connections that no one fully understands and everyone is afraid to change.

An integration fabric replaces this chaos with a structured platform that all integrations flow through.

## Integration Fabric Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Developer Portal                        │
│            (API Catalog, Self-Service, Docs)               │
├────────────────────────────────────────────────────────────┤
│                   API Management Layer                      │
│         (API Connect: Products, Plans, Analytics)          │
├────────────────────────────────────────────────────────────┤
│                    Gateway Layer                            │
│    (DataPower: Security, Routing, Transformation)          │
├──────────┬──────────────┬──────────────┬──────────────────┤
│  Sync    │   Async      │   Event      │   File           │
│  (REST/  │   (MQ        │   (Kafka     │   (MFT/          │
│   gRPC)  │   Queues)    │   Streams)   │   SFTP)          │
├──────────┴──────────────┴──────────────┴──────────────────┤
│                  Connectivity Layer                         │
│    (Adapters: SAP, Salesforce, DB, Mainframe, Cloud)      │
└────────────────────────────────────────────────────────────┘
```

## The Five Capabilities

### Capability 1: Universal Connectivity

The fabric must connect to any system — regardless of protocol, format, or location.

**Required adapters:**
- **Enterprise applications** — SAP, Salesforce, ServiceNow, Workday.
- **Databases** — Oracle, SQL Server, PostgreSQL, MongoDB.
- **Mainframe** — CICS, IMS, VSAM, DB2.
- **Cloud services** — AWS, Azure, GCP native services.
- **Protocols** — REST, SOAP, MQ, Kafka, FTP/SFTP, gRPC.

### Capability 2: Message Transformation

Data moves between systems in different formats. The fabric must transform seamlessly.

**Transformation types:**
- **Format** — JSON ↔ XML ↔ CSV ↔ Fixed-width ↔ COBOL copybook.
- **Schema** — Map fields between different data models.
- **Protocol** — REST → MQ, SOAP → REST, File → Event.
- **Encoding** — UTF-8 ↔ EBCDIC ↔ ISO-8859-1.

### Capability 3: Intelligent Routing

Not all traffic follows the same path. The fabric routes based on:
- **Content** — Route based on message payload values.
- **Consumer identity** — Different backends for different consumer tiers.
- **Load** — Distribute traffic across backend instances.
- **Geography** — Route to the nearest data center.

### Capability 4: Governance and Security

Every integration that flows through the fabric is governed:
- **Access control** — Who can connect to what?
- **Rate limiting** — How much traffic is allowed?
- **Audit trail** — Complete record of all data movement.
- **Data masking** — Sensitive fields masked in logs and non-production environments.

### Capability 5: Observability

The fabric provides visibility into all integration traffic:
- **Real-time dashboards** — Traffic volume, error rates, latency per integration.
- **Alerting** — Proactive notification of failures and degradation.
- **Dependency mapping** — Visual representation of all system connections.
- **Trend analysis** — Capacity planning based on historical patterns.

## Building vs. Buying

| Approach | Pros | Cons |
|----------|------|------|
| Build (DataPower + MQ + custom) | Full control, no licensing | High build effort, maintenance burden |
| Buy (iPaaS platform) | Fast time-to-value | Vendor lock-in, may not meet all requirements |
| Hybrid (IBM CP4I) | Best of both worlds | Higher initial investment |

Most enterprises land on a **hybrid approach**: core messaging and gateway infrastructure is owned (DataPower, MQ), with iPaaS for long-tail connectivity to SaaS applications.

## Key Takeaways

- An integration fabric replaces point-to-point chaos with a governed, observable platform.
- The five capabilities are: connectivity, transformation, routing, governance, and observability.
- DataPower handles security and routing; MQ handles reliable async messaging; API Connect handles lifecycle management.
- Start with the highest-traffic integrations and migrate to the fabric incrementally.
- Measure fabric health through integration count, traffic volume, error rates, and consumer onboarding time.""",
        "date": "2024-08-20",
        "tags": ["Integration", "Enterprise Architecture", "Middleware", "DataPower", "MQ"],
        "read_time": 13,
    },
    {
        "slug": "scaling-secure-digital-ecosystems",
        "title": "Scaling Secure Digital Ecosystems: Architecture Principles for the Next Decade",
        "category": "Enterprise Architecture",
        "excerpt": "The next decade of enterprise architecture will be defined by ecosystems, not applications. This article establishes the architectural principles for building digital ecosystems that are secure, scalable, and sustainable.",
        "content": """## The Ecosystem Shift

Enterprise architecture is shifting from building applications to building ecosystems. An ecosystem is a network of producers and consumers connected through APIs, events, and data — extending beyond organizational boundaries to include partners, customers, and third-party developers.

This shift demands new architectural principles.

## Principle 1: API-First Everything

Every capability is exposed as an API before it is consumed by any application — including internal ones.

**What this means in practice:**
- Backend services do not render HTML. They expose APIs.
- Mobile apps, web apps, partner integrations, and internal tools all consume the same APIs.
- The API contract is the primary design artifact, not the database schema or UI mockup.

**Architecture implication:** The API gateway becomes the central nervous system of the ecosystem. All traffic — internal and external — flows through managed APIs.

## Principle 2: Zero-Trust by Default

Security is not a feature — it is a property of the architecture.

**Implementation:**
- **Identity everywhere** — Every service, every consumer, every request has a verified identity.
- **Encryption everywhere** — TLS for transport, field-level encryption for sensitive data at rest.
- **Authorization everywhere** — Fine-grained permissions evaluated on every request.
- **Audit everywhere** — Complete, immutable record of all access and changes.

## Principle 3: Event-Driven Core

Synchronous request-reply is the simplest interaction pattern, but ecosystems require event-driven architecture for scalability and decoupling.

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│ Producer  │────►│ Event Broker │────►│ Consumer │
│ Service   │     │  (Kafka/MQ)  │     │ Service  │
└──────────┘     └──────────────┘     └──────────┘
                       │
                       ├────►  Analytics Pipeline
                       ├────►  Audit Trail
                       └────►  Partner Notifications
```

**Key patterns:**
- **Event sourcing** — Store events as the source of truth, derive state from events.
- **CQRS** — Separate read and write models for different scaling characteristics.
- **Saga pattern** — Coordinate distributed transactions across services through events.

## Principle 4: Platform Thinking

Build platforms, not applications. A platform provides reusable capabilities that multiple applications consume.

**Platform layers:**
1. **Infrastructure platform** — Compute, storage, networking (Kubernetes, cloud services).
2. **Integration platform** — APIs, events, data movement (DataPower, MQ, API Connect).
3. **Data platform** — Analytics, ML, reporting (data lakes, streaming analytics).
4. **Developer platform** — CI/CD, observability, self-service tooling.

Each platform has its own team, SLAs, and consumer-facing interfaces.

## Principle 5: Composability

Ecosystems grow through composition — combining existing capabilities to create new ones.

**Architectural requirements for composability:**
- **Loose coupling** — Services communicate through well-defined contracts, not shared databases.
- **High cohesion** — Each service does one thing well.
- **Discoverability** — Services can be found through a catalog (API portal, service registry).
- **Self-service** — New consumers can onboard without manual intervention.

## Principle 6: Resilience as Architecture

In an ecosystem, failures are normal. The architecture must be resilient by design:

- **Circuit breakers** — Isolate failures to prevent cascade.
- **Bulkheads** — Separate resources per consumer or per service to contain blast radius.
- **Graceful degradation** — Return partial results or cached data when a dependency is unavailable.
- **Chaos engineering** — Regularly inject failures to validate resilience assumptions.

## Principle 7: Observable by Design

You cannot govern what you cannot see. Every component in the ecosystem must emit telemetry:

- **Metrics** — Quantitative measurements (latency, throughput, error rates).
- **Traces** — Request lifecycle across distributed components.
- **Logs** — Structured, contextual records of events and decisions.
- **Health checks** — Machine-readable status endpoints for every service.

## Key Takeaways

- The next decade belongs to ecosystems, not applications — architect accordingly.
- API-first means every capability is an API before it is a UI.
- Zero-trust is a property of the architecture, not a product you install.
- Event-driven patterns (event sourcing, CQRS, sagas) enable the decoupling that ecosystems require.
- Platform thinking creates reusable capabilities; composability enables exponential growth.
- Resilience and observability are architectural requirements, not operational afterthoughts.""",
        "date": "2024-08-05",
        "tags": ["Digital Ecosystem", "Architecture", "API-First", "Zero Trust", "Events"],
        "read_time": 15,
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
