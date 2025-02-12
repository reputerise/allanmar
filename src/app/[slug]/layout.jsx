import { fetchMetadata } from "../../components/blog/fetchMetadata";
import Script from "next/script";

export async function generateMetadata({ params }) {
    const slug = params?.slug || "";
    const postMetadata = await fetchMetadata(slug);

    const title = postMetadata?.title || "Blog - Futerman International Products";
    const description = postMetadata?.description || "Descubrí los últimos avances en dermatología y estética.";
    const canonicalUrl = `https://blog.futerman.com.ar/${slug}`;
    const imageUrl = postMetadata?.image || "https://blog.futerman.com.ar/default-image.jpg";
    const datePublished = postMetadata?.datePublished || "2025-01-01T00:00:00.000Z";
    const dateModified = postMetadata?.dateModified || datePublished;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "article",
            images: [imageUrl],
        },
        additionalMetaTags: [
            { name: "robots", content: "index, follow" },
            { name: "googlebot", content: "index, follow" },
            { name: "author", content: "Marcelo Futerman" },
            { name: "date", content: datePublished },
        ],
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
