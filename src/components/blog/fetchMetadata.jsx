import { client } from '../../../sanity/lib/client'

export async function fetchMetadata(slug) {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        metaDescription
    }`;

    const post = await client.fetch(query, { slug });

    return {
        title: post?.title || 'Default title',
        description: post?.metaDescription || 'Default meta description for blog post',
    };
}