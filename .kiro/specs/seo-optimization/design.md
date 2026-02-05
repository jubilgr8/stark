# Design Document: SEO Optimization

## Overview

This design implements best-in-class SEO for S.T.A.R.K. Industries' AI Fashion Intelligence Platform. The implementation focuses on three core areas: comprehensive meta tag management, structured data generation, and technical SEO infrastructure. All changes will be made to the existing React application structure.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     public/index.html                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Meta Tags (title, description, OG, Twitter, canonical) ││
│  │  Preload directives (fonts, critical resources)         ││
│  │  JSON-LD Structured Data (inline script)                ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     public/                                  │
│  ├── robots.txt          (crawler directives)               │
│  ├── sitemap.xml         (page index for crawlers)          │
│  └── og-image.png        (social sharing image 1200x630)    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     src/App.js                               │
│  ├── Semantic HTML structure (header, main, section, etc.) │
│  ├── Proper heading hierarchy (H1 → H2 → H3)               │
│  ├── Image alt attributes                                   │
│  └── ARIA landmarks and accessibility                       │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Meta Tag Configuration (public/index.html)

The HTML head will contain all SEO meta tags:

```html
<head>
  <!-- Primary Meta Tags -->
  <title>S.T.A.R.K. Industries | AI Fashion Intelligence Platform India</title>
  <meta name="description" content="..." />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://stark.ind.in/" />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="..." />
  <meta name="twitter:description" content="..." />
  <meta name="twitter:image" content="..." />
  
  <!-- Technical SEO -->
  <link rel="canonical" href="https://stark.ind.in/" />
  <meta name="robots" content="index, follow" />
  <link rel="alternate" hreflang="en-IN" href="https://stark.ind.in/" />
  
  <!-- Geo Tags -->
  <meta name="geo.region" content="IN" />
  <meta name="geo.placename" content="India" />
  
  <!-- Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preload" as="style" href="..." />
</head>
```

### 2. JSON-LD Structured Data Schema

Structured data will be embedded as a script tag in index.html:

```javascript
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stark.ind.in/#organization",
      "name": "S.T.A.R.K. Industries",
      "url": "https://stark.ind.in",
      "logo": "https://stark.ind.in/logo.png",
      "description": "AI Fashion Intelligence Platform",
      "sameAs": [/* social profiles */]
    },
    {
      "@type": "WebSite",
      "@id": "https://stark.ind.in/#website",
      "url": "https://stark.ind.in",
      "name": "S.T.A.R.K. Industries",
      "publisher": {"@id": "https://stark.ind.in/#organization"}
    },
    {
      "@type": "SoftwareApplication",
      "name": "JARVIS - AI Fashion Stylist",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "INR"}
    },
    // Additional Product schemas for FRIDAY, TADASHI, EDITH
  ]
}
```

### 3. robots.txt Configuration

```
User-agent: *
Allow: /
Disallow: /node_modules/

Sitemap: https://stark.ind.in/sitemap.xml
```

### 4. XML Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://stark.ind.in/</loc>
    <lastmod>2026-02-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## Data Models

### Meta Tag Data Model

```typescript
interface MetaTags {
  title: string;           // max 60 chars
  description: string;     // max 160 chars
  canonical: string;       // absolute URL
  robots: string;          // index,follow directives
  ogType: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;         // 1200x630px
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;    // 1200x600px
}
```

### Structured Data Model

```typescript
interface OrganizationSchema {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

interface ProductSchema {
  "@type": "Product" | "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory?: string;
  offers?: OfferSchema;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Meta Tag Length Constraints

*For any* generated title tag, the length SHALL be under 60 characters, and *for any* generated meta description, the length SHALL be under 160 characters.

**Validates: Requirements 1.1, 1.2**

### Property 2: JSON-LD Validity and Schema Completeness

*For any* JSON-LD structured data block generated by the Schema_Generator, parsing then stringifying SHALL produce equivalent valid JSON, AND the parsed object SHALL contain required schema types (Organization, WebSite, SoftwareApplication).

**Validates: Requirements 2.1, 2.3, 2.7**

### Property 3: Heading Hierarchy Validation

*For any* rendered page, there SHALL be exactly one H1 element, and *for all* heading elements, the hierarchy SHALL follow a logical descending order (H1 before H2, H2 before H3, etc.) without skipping levels.

**Validates: Requirements 3.3**

### Property 4: Image Alt Attribute Presence

*For all* img elements in the rendered HTML, the alt attribute SHALL be present and non-empty.

**Validates: Requirements 3.6**

### Property 5: Descriptive Link Text Validation

*For all* anchor elements with href attributes, the link text SHALL NOT be generic phrases like "click here", "read more", "learn more" without additional context.

**Validates: Requirements 5.5**

## Error Handling

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Missing OG image | Fall back to default brand image |
| JSON-LD parse error | Log error, serve page without structured data |
| Invalid canonical URL | Default to current page URL |
| Missing alt text | Build-time warning, runtime fallback to filename |

## Testing Strategy

### Unit Tests
- Verify meta tag presence and content in index.html
- Validate JSON-LD structure against schema.org specifications
- Check robots.txt syntax
- Validate sitemap.xml structure

### Property-Based Tests
- **Property 1**: Generate random title/description strings, verify length constraints
- **Property 2**: Parse and re-stringify JSON-LD, verify equivalence
- **Property 3**: Parse HTML, extract headings, verify hierarchy rules
- **Property 4**: Parse HTML, extract images, verify alt presence
- **Property 5**: Parse HTML, extract links, verify text quality

### Integration Tests
- Google Rich Results Test validation
- Lighthouse SEO audit (target score: 100)
- Mobile-friendliness verification

### Testing Framework
- Jest for unit and property-based tests
- fast-check library for property-based testing
- Minimum 100 iterations per property test
