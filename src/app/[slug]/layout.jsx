import { fetchMetadata } from "../../components/blog/fetchMetadata";
import Script from "next/script";

import { client } from '../../../sanity/lib/client';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        metaDescription,
        abstract,
        "image": mainImage.asset->url,
        "datePublished": _createdAt,
        "dateModified": _updatedAt
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) {
        return {
            title: 'Artículo no encontrado',
            description: 'El contenido solicitado no está disponible.',
        };
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [post.image],
        "datePublished": post.datePublished,
        "dateModified": post.dateModified,
        "author": {
            "@type": "Person",
            "name": "Marcelo Futerman",
            "url": "https://blog.futerman.com.ar/marcelo-futerman"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Futerman Blog",
            "logo": {
                "@type": "ImageObject",
                "url": "https://blog.futerman.com.ar/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://blog.futerman.com.ar/${slug}`
        },
        "url": `https://blog.futerman.com.ar/${slug}`
    };

    return {
        title: post.title,
        description: post.abstract,
        openGraph: {
            title: post.title,
            description: post.abstract,
            url: `https://blog.futerman.com.ar/${slug}`,
            images: [{ url: post.image }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.abstract,
            images: [post.image],
        },
        other: {
            "application/ld+json": JSON.stringify(jsonLd),
        },
    };
}


export default function BlogLayout({ children, params }) {
    const slug = params?.slug || "";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Crema para cicatrices: Todo lo que necesitas saber para una piel renovada`,
        "image": [
            "https://blog.futerman.com.ar/default-image.jpg",
            "https://blog.futerman.com.ar/default-image-4x3.jpg",
            "https://blog.futerman.com.ar/default-image-16x9.jpg"
        ],
        "datePublished": "2025-01-01T00:00:00.000Z",
        "dateModified": "2025-01-01T00:00:00.000Z",
        "author": {
            "@type": "Person",
            "name": "Marcelo Futerman",
            "url": "https://blog.futerman.com.ar/marcelo-futerman"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Futerman Blog",
            "logo": {
                "@type": "ImageObject",
                "url": "https://blog.futerman.com.ar/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://blog.futerman.com.ar/${slug}`
        },
        "url": `https://blog.futerman.com.ar/${slug}`
    };

    return (
        <>
            <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(structuredData)}
            </Script>
            <div className="blog-layout">{children}</div>
        </>
    );
}
