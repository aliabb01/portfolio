// Next MDX remote
import { compileMDX } from "next-mdx-remote/rsc";

// Rehype
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeTOC from "rehype-toc";

// Components
import { Video, CustomImage } from "@/components";

// Lib
import { calculateReadingTime } from "@/lib/utils";
import { GITHUB_TOKEN } from "@/lib/constants";

// Types
import { Meta, Post } from "@/types";

type FileTree = {
    tree: [
        {
            path: string;
        }
    ];
};

/**
 * Get a post by its name
 * @param fileName - The name of the file
 *
 * @returns {Promise<Post | undefined>} - The post
 */
export async function getPostByName(
    fileName: string
): Promise<Post | undefined> {
    const res = await fetch(
        `https://raw.githubusercontent.com/aliabb01/blogposts/main/${fileName}`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );

    if (!res.ok) return undefined;

    const rawMDX = await res.text();

    if (rawMDX === "404: Not Found") return undefined;

    const { frontmatter, content } = await compileMDX<{
        title: string;
        description: string;
        date: string;
        tags: string[];
    }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight as any,
                    rehypePrettyCode,
                    rehypeSlug,
                    rehypeTOC,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "wrap",
                        },
                    ],
                ],
            },
        },
    });

    const slug = fileName.replace(/\.mdx$/, "");

    const readTime = await calculateReadingTime(content);

    const blogPostObj: Post = {
        meta: {
            slug,
            title: frontmatter.title,
            date: frontmatter.date,
            description: frontmatter.description,
            tags: frontmatter.tags,
            readingTime: readTime.text,
        },
        content,
    };

    return blogPostObj;
}

/**
 * Get all blog posts meta information sorted by date
 *
 * @returns {Promise<Meta[] | undefined>} - The blog posts meta
 */
export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch(
        "https://api.github.com/repos/aliabb01/blogposts/git/trees/main?recursive=1",
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );

    if (!res.ok) return undefined;

    const repoFiletree: FileTree = await res.json();

    const filesArray = repoFiletree.tree
        .map((obj) => obj.path)
        .filter((path) => path.endsWith(".mdx"));

    const posts: Meta[] = [];

    for (const file of filesArray) {
        const post = await getPostByName(file);
        if (post) {
            const { meta } = post;
            posts.push(meta);
        }
    }

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
