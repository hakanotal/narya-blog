import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const components = {
        h1: (props: any) => (
            <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-6" {...props} />
        ),
        h2: (props: any) => (
            <h2 className="text-2xl font-medium mt-12 mb-6" {...props} />
        ),
        p: (props: any) => (
            <p className="mb-6 leading-relaxed text-xl" {...props} />
        ),
        blockquote: (props: any) => (
            <blockquote className="pl-6 border-l-2 border-red-500 italic my-8 opacity-80" {...props} />
        ),
        ul: (props: any) => (
            <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
        ),
        li: (props: any) => (
            <li className="" {...props} />
        ),
        strong: (props: any) => (
            <strong className="font-bold" {...props} />
        ),
    };

    return (
        <article className="max-w-4xl mx-auto py-12 px-6 md:px-12 lg:px-24">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-6">
                    {post.meta.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                    <time>{post.meta.date}</time>
                    <span>•</span>
                    <span>{post.meta.readTime}</span>
                </div>
            </header>

            <div className="font-serif">
                <MDXRemote
                    source={post.content}
                    components={components}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkMath],
                            rehypePlugins: [rehypeKatex],
                        }
                    }}
                />
            </div>
        </article>
    );
}
