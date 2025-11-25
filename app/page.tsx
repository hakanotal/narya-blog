import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
      <main className="flex flex-col gap-8 items-center">
        <div className="relative w-24 h-24 mb-4">
          <Image src="/logo.svg" alt="Narya Logo" fill className="object-contain" />
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-red-600">
          Narya
        </h1>

        <p className="text-xl md:text-2xl font-serif italic opacity-90">
          "The Ring of Fire"
        </p>

        <div className="flex flex-col gap-6 text-left bg-gray-50 dark:bg-white/5 p-8 rounded-xl border border-gray-100 dark:border-white/10 mt-4 max-w-lg">
          <div>
            <h3 className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">The Lore</h3>
            <p className="font-serif leading-relaxed opacity-80">
              Gandalf’s ring, used to kindle courage and understanding in the hearts of others.
            </p>
          </div>
          <div>
            <h3 className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">The Fit</h3>
            <p className="font-serif leading-relaxed opacity-80">
              A blog dedicated to teaching and inspiring people to learn difficult subjects.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/chapters/neural-nets-and-transformers"
            className="inline-flex items-center justify-center px-8 py-3 border border-red-200 rounded-full text-sm font-mono text-red-600 hover:bg-red-600 hover:text-white transition-all"
          >
            Start Reading
          </Link>
        </div>
      </main>
    </div>
  );
}
