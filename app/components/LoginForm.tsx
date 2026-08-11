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

export default function LoginForm() {
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
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Sign in
        </h1>

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
      </div>
    </div>
  );
} 