export type Chapter = {
    title: string;
    slug: string;
};

export type Category = {
    title: string;
    slug: string;
    chapters: Chapter[];
};

export const BLOG_CONTENT: Category[] = [
    {
        title: "AI and ML",
        slug: "ai-and-ml",
        chapters: [
            { title: "Neural nets and transformers", slug: "neural-nets-and-transformers" },
            { title: "Large Language Models", slug: "large-language-models" },
            { title: "Diffusion Models", slug: "diffusion-models" },
        ],
    },
    {
        title: "Pixels and Color",
        slug: "pixels-and-color",
        chapters: [
            { title: "Color Spaces", slug: "color-spaces" },
            { title: "Image Compression", slug: "image-compression" },
        ],
    },
    {
        title: "Fonts and Vectors",
        slug: "fonts-and-vectors",
        chapters: [
            { title: "Bezier Curves", slug: "bezier-curves" },
            { title: "Font Rendering", slug: "font-rendering" },
        ],
    },
];
