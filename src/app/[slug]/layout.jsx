import { fetchMetadata } from '../../components/blog/fetchMetadata';

export async function generateMetadata({ params }) {
    const postMetadata = await fetchMetadata(params.slug);

    return {
        title: postMetadata.title,
        description: postMetadata.description,
    };
}

export default async function BlogLayout({ children }) {
    return (
        <>

            <div className="blog-layout">
                {children}
            </div>
        </>
    );
}