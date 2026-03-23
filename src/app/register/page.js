"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-3xl p-10">
        <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
        <p className="text-slate-500 text-sm mb-8">Join NextRide today</p>

        {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 px-4 py-3 rounded-xl">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-slate-500 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline font-bold">Sign In</Link>
        </p>
      </div>
    </main>
  );
}