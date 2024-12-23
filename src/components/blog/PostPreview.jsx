export default function PostPreview({ post }) {
    const slug = post?.slug?.current ? `/${post.slug.current}` : "/blog"

    return (
        <article className="flex flex-col items-start justify-between border-sf-cream border rounded-2xl py-8 px-4 lg:border-none lg:p-0">
            <a href={slug}>
                <div className="relative w-full">
                    <img src={post.mainImage?.asset?.url} alt={post.mainImage?.alt} title={post.mainImage?.title}  className="aspect-[16/9] w-full rounded-2xl   object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt} className="text-sf-lime">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </time>
                        )}
                        {post.categories && post.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category, index) => (
                                    <span
                                        key={index}
                                        className="relative z-10 rounded-full bg-sf-lime px-3 py-1.5 font-medium text-center w-3/4"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="h-6" /> // Espacio fijo para mantener la altura
                        )}
                    </div>
                    <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6">
                            <span className="absolute inset-0" />
                            {post.title}
                        </h3>
                        {post.abstract && (
                            <p className="mt-5 line-clamp-3 text-sm leading-6">
                                {post.abstract}
                            </p>
                        )}
                    </div>
                </div>
            </a>
        </article>
    );
}