'use client';

import { client } from '../../../sanity/lib/client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { fetchMetadata } from '../../components/blog/fetchMetadata';

function ArrowLeftIcon(props) {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
            <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
function formatDate(dateString) {
    console.log("fecha ", dateString)
    return new Date(`${dateString}`).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    })
}



export default function BlogPost({ params }) {
    const [post, setPost] = useState(null);
    const [metadata, setMetadata] = useState({ title: 'Loading...', description: 'Loading...' });
    const [slug, setSlug] = useState(null);

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!slug) return;

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
                    metaDescription,
                    publishedAt
                }`;

                const post = await client.fetch(query, { slug });
                setPost(post);

                // Obtener los metadatos
                const metadata = await fetchMetadata(slug);
                setMetadata(metadata);
            } catch (error) {
                console.error('Error fetching post or metadata:', error);
            }
        }

        fetchData();
    }, [slug]);

    const SANITY_BASE_URL = "https://cdn.sanity.io/images/xy1nu7wy/production/";

    function constructImageUrl(ref) {
        if (!ref) return '';
        const cleanedRef = ref.replace(/^image-/, '').replace(/-jpg$/, '');
        return `${SANITY_BASE_URL}${cleanedRef}.jpg`;
    }

    if (!post) {
        return (
            <div className='min-h-[100dvh] w-full flex flex-col justify-center items-center'>
                <div className="w-12 h-12 relative flex justify-center items-center">
                    <div className="w-full h-full rounded-full absolute border-4 border-solid border-sf-lime opacity-20"></div>
                    <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-sf-lime border-t-transparent"></div>
                </div>
            </div>
        );
    }

    let  previousPathname  = "https://blog.futerman.com.ar/"


    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <div className="mt-16 lg:mt-48 min-h-[100dvh]">
                <div className="xl:relative">
                    <div className="mx-auto max-w-2xl">
                        {previousPathname && (
                            <button
                                type="button"
                                onClick={() => (window.location.href = previousPathname)}
                                aria-label="Go back to articles"
                                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-40 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
                            >
                                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                            </button>
                        )}
                        <article>
                            <header className="flex flex-col">

                                <time
                                    dateTime={post.publishedAt}
                                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                                >
                                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                                    <span className="ml-3">{formatDate(post.publishedAt)}</span>
                                </time>
                            </header>
                            <div className="w-full flex flex-col overflow-x-hidden  flex flex-col justify-center items-center">
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
                                                        return ""
                                                    case 'h2':
                                                        return <h2 key={index} className='col-span-12 mt-28 text-heading tracking-tighter leading-none text-sf-lime my-8'>{block.children[0]?.text || ''}</h2>;
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
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
