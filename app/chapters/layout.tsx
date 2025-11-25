import Sidebar from "@/components/Sidebar";
import { getSidebarContent } from "@/lib/mdx";

export default function ChaptersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const content = getSidebarContent();

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar content={content} />
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}
