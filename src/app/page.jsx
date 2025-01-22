'use client';
import React, { useEffect, useState } from 'react';
import Slicer from '../components/blog/slicer'
import { client } from '../../sanity/lib/client'
import Pagination from '../components/blog/pagination';
import PostPreview from "../components/blog/PostPreview";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const postsPerPage = 9;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const query = `*[_type == 'post']{
                title,
                body,
                mainImage{
                    asset->{
                        url
                    },
                    alt,
                    title
                },
                publishedAt,
                categories[]->{
                    title,
                    _id,
                    
                },
                slug,
                abstract
            } | order(publishAt desc)`;

            const fetchedPosts = await client.fetch(query);
            console.log("fetched Posts", fetchedPosts)
            const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

            setPosts(sortedPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const filteredPosts = activeCategory
        ? posts.filter((post) => post.categories?.some(category => category?._id === activeCategory))
        : posts;
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="w-full !max-w-full md:px-20 px-5  flex flex-col overflow-x-hidden w-full min-h-[100dvh]  flex flex-col justify-center items-center scroll-smooth py-12 xl:my-36 ">
            <div className="w-full px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">El blog de Allanmar International Company</h2>
                    <p className="mt-2 text-lg leading-8">Conoce las últimas novedades en medicina estética.</p>
                </div>

                {loading ? (
                    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center">
                        <div className="w-12 h-12 relative flex justify-center items-center">
                            <div className="w-full h-full rounded-full absolute border-4 border-solid border-sf-lime opacity-20"></div>
                            <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-sf-lime border-t-transparent"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Slicer
                            activeCategory={activeCategory}
                            setActiveCategory={handleCategoryChange}
                            setFilteredPosts={setPosts}
                            posts={posts}
                        />

                        {posts.length === 0 ? (
                            <div className="text-center my-16">
                                <p className="text-xl">There are no posts yet! </p>
                                <p className="text-xl">Subscribe to our newsletter to be the first to know about it.</p>

                            </div>
                        ) : (
                            <>
                                <div className="mx-auto my-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                    {currentPosts.map((post) => (
                                        <PostPreview key={post?.slug?.current || "/blog"} post={post} />
                                    ))}
                                </div>

                                {filteredPosts.length > postsPerPage && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPosts={filteredPosts.length}
                                        postsPerPage={postsPerPage}
                                        paginate={setCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="border-b border-sf-cream w-full px-8 sm:px-0 mx-auto w-11/12"></div>
        </div>
    );
}