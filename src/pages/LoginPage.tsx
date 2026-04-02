import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-md flex-col justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
        className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-soft"
      >
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Welcome back</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Demo only — credentials are not stored or validated.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="label-nest">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-nest"
              autoComplete="email"
            />
          </label>
          <label className="label-nest">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-nest"
              autoComplete="current-password"
            />
          </label>
          <Button type="submit" className="w-full py-3">
            Log in
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-600">
          No account?{" "}
          <Link to="/register" className="font-semibold text-neutral-900 underline-offset-2 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
