'use client'
import { client } from '../../../sanity/lib/client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { fetchMetadata } from '../../components/blog/fetchMetadata';

export default function BlogPost({ params }) {
    const [post, setPost] = useState(null);
    const [metadata, setMetadata] = useState({ title: 'Loading...', description: 'Loading...' });

    useEffect(() => {
        async function fetchData() {
            try {
                const query = `*[_type == "post" && slug.current == $slug][0]{
                    title,
                    body,
                    mainImage{
                        asset->{
                            _id,
                            url,
                        },
                        alt,
                        title
                    },
                    metaDescription
                }`;

                const post = await client.fetch(query, { slug: params.slug });
                setPost(post);

                // Obtener los metadatos
                const metadata = await fetchMetadata(params.slug);
                setMetadata(metadata);
            } catch (error) {
                console.error('Error fetching post or metadata:', error);
            }
        }

        fetchData();
    }, [params.slug]);

    const SANITY_BASE_URL = "https://cdn.sanity.io/images/xy1nu7wy/production/";

    function constructImageUrl(ref) {
        if (!ref) return '';
        const cleanedRef = ref.replace(/^image-/, '').replace(/-jpg$/, '');
        return `${SANITY_BASE_URL}${cleanedRef}.jpg`;
    }

    if (!post) {
        return <div className='min-h-[100dvh] w-full flex flex-col justify-center items-center'>
            <div className="w-12 h-12 relative flex justify-center items-center">
                <div className="w-full h-full rounded-full absolute border-4 border-solid border-sf-lime opacity-20"></div>
                <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-sf-lime border-t-transparent"></div>
            </div>
        </div>;
    }

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <div className="w-full md:px-20 px-5 flex flex-col overflow-x-hidden min-h-[100dvh] flex flex-col justify-center items-center">
                <article className='my-12 flex flex-col items-start gap-5'>
                    <h1 className="font-bold text-4xl md:text-heading pb-4 leading-none text-center">{post.title}</h1>
                    {post.mainImage && (
                        <img
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt}
                            title={post.mainImage.title}
                            className='md:w-1/3 self-center'
                        />
                    )}
                    <div className='flex flex-col items-start gap-5 md:w-3/4 self-center'>
                        {post.body && post.body.map((block, index) => {
                            if (block._type === 'block') {
                                switch (block.style) {
                                    case 'h1':
                                        return <h1 key={index}>{block.children[0]?.text || ''}</h1>;
                                    case 'h2':
                                        return <h2 key={index} className='col-span-12 mt-28 text-heading tracking-tighter leading-none	 text-sf-lime my-8'>{block.children[0]?.text || ''}</h2>;
                                    case 'h3':
                                        return <h3 key={index} className="text-smallHeading leading-none reg-neue my-4">{block.children[0]?.text || ''}</h3>;
                                    case 'blockquote':
                                        return (
                                            <blockquote key={index} className="pl-4 border-l-4 border-sf-lime italic text-sf-cream py-4">
                                                {block.children && block.children.map((child) => (
                                                    <span key={child._key}>{child.text}</span>
                                                ))}
                                            </blockquote>
                                        );
                                    case 'normal':
                                        return (
                                            <p key={index}>
                                                {block.children && block.children.map((child, childIndex) => {
                                                    if (child.marks && child.marks.length > 0) {
                                                        const mark = block.markDefs.find(def => def._key === child.marks[0]);
                                                        if (mark && mark.href) {
                                                            return (
                                                                <a key={child._key} href={mark.href} className='text-sf-lime'>
                                                                    {child.text}
                                                                </a>
                                                            );
                                                        }
                                                        if (child.marks.includes('strong')) {
                                                            return (
                                                                <strong key={child._key}>
                                                                    {child.text}
                                                                </strong>
                                                            );
                                                        }
                                                    }
                                                    return (
                                                        <span key={child._key}>
                                                            {child.text}
                                                        </span>
                                                    );
                                                })}
                                            </p>
                                        );
                                }
                            } else if (block._type === 'image') {
                                const imageUrl = block.asset && block.asset._ref ? constructImageUrl(block.asset._ref) : '';
                                return (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={block.alt || ''}
                                        title={block.title || ""}
                                        className='md:w-1/3 self-center'
                                        style={{ maxWidth: '100%' }}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </article>

   
            </div>
        </>
    );
}