import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 shadow-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
          Authentication
        </p>
        <h1 className="mt-3 text-2xl font-semibold">
          Sign-in could not be completed
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          The authentication flow hit an unexpected issue. Please try again or
          return to the home page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Back to sign in
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
