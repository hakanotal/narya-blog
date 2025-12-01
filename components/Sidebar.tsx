"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BLOG_CONTENT, Category } from "@/lib/content";
import { clsx } from "clsx";

interface SidebarProps {
    content?: Category[];
}

export default function Sidebar({ content = [] }: SidebarProps) {
    const pathname = usePathname();
    const [openCategories, setOpenCategories] = useState<string[]>([]);

    // Initialize open categories based on current path
    useEffect(() => {
        const activeCategory = content.find(cat =>
            cat.chapters.some(chap => pathname.includes(chap.slug))
        );
        if (activeCategory && !openCategories.includes(activeCategory.title)) {
            setOpenCategories(prev => [...prev, activeCategory.title]);
        }
    }, [pathname, content]);

    const toggleCategory = (title: string) => {
        setOpenCategories(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    return (
        <aside className="w-full md:w-64 md:flex-shrink-0 md:border-r md:border-black/5 dark:md:border-white/5 md:h-screen md:sticky md:top-0 p-8 flex flex-col gap-8 overflow-y-auto scrollbar-thin bg-background transition-colors duration-300">
            <div>
                <Link href="/" className="font-mono text-lg font-bold tracking-tight text-red-600 flex items-center gap-2 group w-fit">
                    <div className="relative w-8 h-8 transition-transform duration-300 group-hover:rotate-180">
                        <Image src="/logo.svg" alt="Narya Logo" fill className="object-contain" />
                    </div>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Narya</span>
                </Link>
            </div>

            <nav className="flex flex-col gap-6">
                {content.map((category) => (
                    <div key={category.slug} className="flex flex-col gap-2">
                        <button
                            onClick={() => toggleCategory(category.title)}
                            className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider text-left hover:text-black dark:hover:text-white transition-colors flex items-center justify-between group"
                        >
                            <span>{category.title}</span>
                            <span className={clsx("transition-transform duration-200", openCategories.includes(category.title) ? "rotate-90" : "")}>
                                ›
                            </span>
                        </button>

                        <div
                            className={clsx(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                openCategories.includes(category.title) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <ul className="flex flex-col gap-2 pl-2 border-l border-black/5 dark:border-white/10 ml-1">
                                {category.chapters.map((chapter) => {
                                    const isActive = pathname.includes(chapter.slug);
                                    const match = chapter.slug.match(/ch(\d+)/);
                                    const chapterNum = match ? match[1] : "";
                                    const displayTitle = chapterNum
                                        ? `#${chapterNum}: ${chapter.shortTitle || chapter.title}`
                                        : (chapter.shortTitle || chapter.title);

                                    return (
                                        <li key={chapter.slug}>
                                            <Link
                                                href={`/chapters/${chapter.slug}`}
                                                className={clsx(
                                                    "text-sm transition-colors block py-1",
                                                    isActive
                                                        ? "text-red-600 dark:text-red-500 font-medium"
                                                        : "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                                                )}
                                            >
                                                {displayTitle}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
