import { fetchMetadata } from '../../components/blog/fetchMetadata';

export async function generateMetadata({ params }) {
    const postMetadata = await fetchMetadata(params.slug);
    const canonicalUrl = `https://blog.futerman.com.ar/${params.slug}`;

    return {
        title: postMetadata.title,
        description: postMetadata.description,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function BlogLayout({ children }) {
    return (
        <div className="blog-layout">
            {children}
        </div>
    );
}
