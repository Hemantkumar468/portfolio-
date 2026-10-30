import React, { useState } from "react";
import SectionTitle from "./SectionTitle.tsx";
import Reveal from "./Reveal.tsx";
import Tilt from "./Tilt.tsx";
import { resumeData } from "../data/resume.ts";
import { useSendContactMutation } from "../store/api.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";

export default function Contact() {
  const dispatch = useAppDispatch();
  const { personal } = resumeData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [sendContact, { isLoading, error: apiError }] =
    useSendContactMutation();

  const getErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== "object") {
      return `Failed to send message via API. Please check your connection or email directly at ${personal.email}.`;
    }

    const fbError = error as {
      status?: number | string;
      data?: { message?: string; ok?: boolean; error?: string };
    };

    if (fbError.data && typeof fbError.data.message === "string") {
      return fbError.data.message;
    }

    return `Failed to send message via API. Please check your connection or email directly at ${personal.email}.`;
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = "Please provide your name";
    }
    if (!formData.email.trim()) {
      errors.email = "Please provide your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please provide a valid email address";
    }
    if (!formData.message.trim()) {
      errors.message = "Please write a brief message";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await sendContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
      }).unwrap();

      if (response.success) {
        setSuccessMessage(
          response.message || "Thank you! Your message has been sent successfully."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err: unknown) {
      console.error("Failed to send contact message:", err);
    }
  };

  return (
    <section aria-label="Contact Hemant Kushwaha" className="relative py-4">
      <SectionTitle
        title="Let's Build Something"
        highlight="Extraordinary"
        subtitle="Looking for a proactive MERN Full Stack Developer? Reach out directly via the form or through verified channels."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Social Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={0.15}>
            <Tilt className="glass-panel rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Direct Communication
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Available for full-time engineering roles, high-impact MERN contracts, and innovative technical projects.
              </p>

              <div className="space-y-3.5">
                {/* Email */}
                <a
                  href={`mailto:${personal.email}`}
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-4 transition-colors hover:border-violet-300 hover:bg-violet-50/50 shadow-xs"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 border border-violet-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono font-bold uppercase text-slate-500">
                      Email Address
                    </div>
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {personal.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personal.phone}`}
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50/50 shadow-xs"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800 border border-cyan-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-slate-500">
                      Phone & WhatsApp
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {personal.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-4 shadow-xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700 border border-pink-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-slate-500">
                      Based In
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {personal.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Social Connects */}
              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-3">
                  Connect on Socials
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 py-2.5 text-xs font-bold text-slate-800 transition-all hover:border-violet-400 hover:text-violet-700 shadow-xs"
                  >
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 py-2.5 text-xs font-bold text-slate-800 transition-all hover:border-violet-400 hover:text-violet-700 shadow-xs"
                  >
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>

        {/* Right Column: Working Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.25}>
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-9 relative">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send a Message
              </h3>

              {successMessage && (
                <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 backdrop-blur-md flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 font-bold">
                    ✓
                  </span>
                  <span>{successMessage}</span>
                </div>
              )}

              {apiError && (
                <div className="mb-6 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 backdrop-blur-md flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-200 text-rose-800 font-bold">
                    !
                  </span>
                  <span>{getErrorMessage(apiError)}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Full Name <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 backdrop-blur-md transition-all focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 shadow-xs"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-rose-600 font-mono">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 backdrop-blur-md transition-all focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 shadow-xs"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-rose-600 font-mono">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Opportunity / Project Consultation"
                    className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 backdrop-blur-md transition-all focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 shadow-xs"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Message <span className="text-violet-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Hi Hemant, I reviewed your ERP and MERN work..."
                    aria-required="true"
                    aria-invalid={!!formErrors.message}
                    className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 backdrop-blur-md transition-all focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 resize-none shadow-xs"
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-rose-600 font-mono">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
