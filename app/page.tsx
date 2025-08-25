import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <div className="text-center max-w-3xl space-y-6 animate-fade-in">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Next.js Video Editor
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Upload, edit, record, and convert videos effortlessly, all in your browser.
        </p>
        <Link
          href="/editor"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 py-4 rounded-full text-2xl font-bold shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
