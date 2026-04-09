import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type InquiryFormState = {
  gender: string;
  email: string;
  phone: string;
  status: string;
  dateOfBirth: string;
  moveInDate: string;
  idealNest: string;
};

const initialForm: InquiryFormState = {
  gender: "",
  email: "",
  phone: "",
  status: "",
  dateOfBirth: "",
  moveInDate: "",
  idealNest: "",
};

export function InquirySection() {
  const [form, setForm] = useState<InquiryFormState>(initialForm);
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(
    () => ({
      email: !form.email.trim() ? "Email is required." : "",
      idealNest: !form.idealNest.trim() ? "Please describe your ideal nest." : "",
    }),
    [form.email, form.idealNest],
  );

  const isValid = !errors.email && !errors.idealNest;

  function updateField<K extends keyof InquiryFormState>(field: K, value: InquiryFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowErrors(true);
    if (!isValid) return;
    setSubmitted(true);
  }

  return (
    <section id="inquiry" className="bg-[#eef7ef] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Can&apos;t find the right place?
          </h2>
          <p className="mt-3 text-neutral-600 md:text-lg">
            Describe your perfect nest and we&apos;ll help you find it.
          </p>
        </motion.div>

        <div id="inquiry-form" className="mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="inquiry-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="label-nest">
                    Gender
                    <select
                      value={form.gender}
                      onChange={(e) => updateField("gender", e.target.value)}
                      className="input-nest"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </label>

                  <label className="label-nest">
                    Email <span className="text-red-500">*</span>
                    <input
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className={`input-nest ${showErrors && errors.email ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                    />
                    {showErrors && errors.email && (
                      <span className="mt-1 block text-xs font-medium text-red-500">{errors.email}</span>
                    )}
                  </label>

                  <label className="label-nest">
                    Phone Number
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      type="tel"
                      placeholder="+31 6 12345678"
                      className="input-nest"
                    />
                  </label>

                  <label className="label-nest">
                    Status
                    <select
                      value={form.status}
                      onChange={(e) => updateField("status", e.target.value)}
                      className="input-nest"
                    >
                      <option value="">Select</option>
                      <option value="Student">Student</option>
                      <option value="Worker">Worker</option>
                      <option value="Working Student">Working Student</option>
                      <option value="Self Employed">Self Employed</option>
                    </select>
                  </label>

                  <label className="label-nest">
                    Date of Birth
                    <input
                      value={form.dateOfBirth}
                      onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      type="date"
                      className="input-nest"
                    />
                  </label>

                  <label className="label-nest">
                    Expected Move-in Date
                    <input
                      value={form.moveInDate}
                      onChange={(e) => updateField("moveInDate", e.target.value)}
                      type="date"
                      className="input-nest"
                    />
                  </label>
                </div>

                <label className="label-nest mt-5 block">
                  Describe your ideal nest <span className="text-red-500">*</span>
                  <textarea
                    value={form.idealNest}
                    onChange={(e) => updateField("idealNest", e.target.value)}
                    rows={6}
                    placeholder="Location, budget, roommates, vibe, furnished/unfurnished — tell us everything..."
                    className={`input-nest resize-y ${showErrors && errors.idealNest ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                  />
                  {showErrors && errors.idealNest && (
                    <span className="mt-1 block text-xs font-medium text-red-500">
                      {errors.idealNest}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[#2e7d32] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#256a2a]"
                >
                  Send Inquiry
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="inquiry-success"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-xl border border-emerald-100 bg-white p-10 text-center shadow-soft"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
                >
                  <CheckCircle2 size={36} className="text-[#2e7d32]" />
                </motion.div>
                <p className="text-xl font-semibold text-neutral-900 md:text-2xl">
                  Your response has been forwarded! We&apos;ll get back to you shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
