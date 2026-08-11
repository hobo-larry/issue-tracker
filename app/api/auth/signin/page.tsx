"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import type { ClientSafeProvider } from "next-auth/react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

const providerIcons: Record<string, React.ReactNode> = {
  google: <FaGoogle className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
};

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  async function handleCredentialsSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  // OAuth providers only (skip credentials)
  const oauthProviders = providers
    ? Object.values(providers).filter((p) => p.id !== "credentials")
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Sign in
        </h1>

        {/* Email + Password */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-black text-white
                       font-medium hover:bg-gray-800 transition-colors
                       disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with credentials"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* OAuth buttons */}
        <div className="space-y-3">
          {oauthProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="w-full flex cursor-pointer items-center justify-center gap-3
                         py-2.5 px-4 border border-gray-300 rounded-lg
                         bg-white text-gray-800 font-medium
                         hover:bg-gray-50 transition-colors"
            >
              {providerIcons[provider.id] ?? null}
              {provider.name}
            </button>
          ))}
        </div>

        <div className="my-6 border-t border-gray-200" />

        <p className="text-sm text-gray-500 mb-3 text-center">
          Don&apos;t have an account?
        </p>

        <Link href="/signup" className="ml-3">
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-lg border cursor-pointer border-gray-300
                       bg-white text-gray-800 font-medium
                       hover:bg-gray-50 transition-colors"
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
} 