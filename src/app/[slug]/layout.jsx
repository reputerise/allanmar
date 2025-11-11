import { client } from '../../../sanity/lib/client';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    abstract,
    mainImage { asset->{url}, alt, title },
    _createdAt,
    _updatedAt
  }`;

  const post = await client.fetch(query, { slug });
  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "El contenido solicitado no está disponible.",
      robots: { index: false },
    };
  }

  const canonicalUrl = `https://blog.futerman.com.ar/${slug}`;

  return {
    title: post.title,
    description: post.abstract,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.abstract,
      url: canonicalUrl,
      type: "article",
      images: [{ url: post.mainImage?.asset?.url }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.abstract,
      images: [post.mainImage?.asset?.url],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        image: [post.mainImage?.asset?.url],
        datePublished: post._createdAt,
        dateModified: post._updatedAt,
        author: {
          "@type": "Person",
          name: "Marcelo Futerman",
          url: "https://blog.futerman.com.ar/marcelo-futerman",
        },
        publisher: {
          "@type": "Organization",
          name: "Futerman Blog",
          logo: {
            "@type": "ImageObject",
            url: "https://blog.futerman.com.ar/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        url: canonicalUrl,
      }),
    },
  };
}

export default function BlogLayout({ children }) {
  return <div className="blog-layout">{children}</div>;
}
