import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="page-section max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Contact</h1>
        <p className="mt-2 leading-relaxed text-neutral-600">
          Questions about NestRoom? Send a note — demo form only.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <label className="label-nest">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-nest" />
          </label>
          <label className="label-nest">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-nest"
            />
          </label>
          <label className="label-nest">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="input-nest resize-none"
            />
          </label>
          <Button type="submit" className="px-8 py-3">
            Send message
          </Button>
        </form>

        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              className="mt-6 rounded-xl border border-neutral-100 bg-nest-surface px-4 py-3 text-sm leading-relaxed text-neutral-700"
            >
              Thanks — this demo does not transmit your message anywhere.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
