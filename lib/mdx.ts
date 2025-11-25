import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        meta: data,
        content,
    };
}

import { Category } from "./content";

// ... existing imports ...

export function getAllPosts() {
    const files = fs.readdirSync(contentDirectory);
    const posts = files.map((file) => getPostBySlug(file));
    return posts;
}

export function getSidebarContent(): Category[] {
    const posts = getAllPosts();
    const categories: Record<string, Category> = {};

    posts.forEach((post) => {
        if (!post) return;
        const categoryTitle = post.meta.category || "Uncategorized";
        const categorySlug = categoryTitle.toLowerCase().replace(/\s+/g, "-");

        if (!categories[categorySlug]) {
            categories[categorySlug] = {
                title: categoryTitle,
                slug: categorySlug,
                chapters: [],
            };
        }

        categories[categorySlug].chapters.push({
            title: post.meta.title,
            slug: post.slug,
        });
    });

    return Object.values(categories);
}
