import { Metadata } from "next";
import Link from "next/link";

// Components
import { PostListItem, SectionHeading } from "@/components";

// Lib
import { getPostsMeta } from "@/lib/posts";
import { BLOG_URL } from "@/lib/constants";

// Icons
import { LuRss } from "react-icons/lu";

export const revalidate = 10;

export const metadata: Metadata = {
    title: "Blog",
    description: "Ali Abbasov's Blog",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: BLOG_URL,
    },
};

const BlogPage = async () => {
    const posts = await getPostsMeta();

    if (!posts) {
        return <p>No Posts Available</p>;
    }

    return (
        <section className="flex flex-col items-center py-5 px-5">
            <SectionHeading>My Blog</SectionHeading>

            <Link
                href="/blog/rss"
                className="mb-3 hover:underline underline-offset-4 decoration-current"
            >
                <p className="flex gap-2">
                    <LuRss size={24} /> RSS Feed
                </p>
            </Link>

            <ul>
                {posts.map((post) => (
                    <PostListItem key={post.slug} post={post} />
                ))}
            </ul>
        </section>
    );
};

export default BlogPage;
