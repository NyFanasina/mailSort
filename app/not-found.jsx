// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      {/* Code d'erreur en arrière-plan */}
      <h1 className="text-9xl font-black text-gray-200 dark:text-gray-800 selection:bg-none select-none">404</h1>

      {/* Message d'erreur */}
      <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Page introuvable
      </p>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      {/* Bouton Retour au Dashboard */}
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        <span>Retour au Dashboard</span>
        <svg
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
