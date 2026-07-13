"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { companyProfile } from "@/data/companyProfile";
import { useLanguage } from "@/contexts/LanguageContext";

const initialState = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  country: "",
  requirements: "",
  inquiryType: "general",
  preferredContact: "email",
};

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Italy", "Spain", "Australia", "Japan", "China", "India",
  "Brazil", "Mexico", "South Africa", "UAE", "Saudi Arabia",
  "Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam",
  "South Korea", "Russia", "Turkey", "Egypt", "Nigeria", "Kenya",
  "Argentina", "Chile", "Colombia", "Other",
];

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_AUTOREPLY_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || "";

export default function ContactForm() {
  const { translations } = useLanguage();
  const t = translations?.contactPage || {};
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!form.companyName.trim()) {
      newErrors.companyName = t.nameError || "Company name is required";
    }
    if (!form.contactPerson.trim()) {
      newErrors.contactPerson = t.nameError || "Contact person is required";
    }
    if (!form.email.trim()) {
      newErrors.email = t.emailError || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t.emailInvalidError || "Please enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = t.phoneError || "Phone number is required";
    } else if (!/^[\d\s+\-()]{8,}$/.test(form.phone)) {
      newErrors.phone = t.phoneError || "Please enter a valid phone number";
    }
    if (!form.country) {
      newErrors.country = "Please select your country";
    }
    if (!form.requirements.trim()) {
      newErrors.requirements = t.messageError || "Please provide your requirements";
    } else if (form.requirements.trim().length < 20) {
      newErrors.requirements =
        t.messageLengthError || "Please provide more details (minimum 20 characters)";
    }

    return newErrors;
  };

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({
        type: "error",
        message:
          "Email service is not configured. Please set EmailJS keys and try again.",
      });
      setIsSubmitting(false);
      return;
    }

    const inquiryTypeLabel =
      form.inquiryType === "urgent" ? "Urgent / Express" : "General Inquiry";
    const preferredContactLabel =
      form.preferredContact === "email" ? "Email" : "Phone/WhatsApp";
    const subject = `${form.inquiryType === "urgent" ? "URGENT: " : ""}Business Inquiry - ${form.companyName}`;
    const message = [
      "A new business inquiry has been submitted.",
      "",
      `Company Name: ${form.companyName}`,
      `Contact Person: ${form.contactPerson}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone}`,
      `Country: ${form.country}`,
      `Preferred Contact Method: ${preferredContactLabel}`,
      `Inquiry Type: ${inquiryTypeLabel}`,
      "",
      "Requirements:",
      form.requirements,
    ].join("\n");

    const templateParams = {
      to_email: companyProfile.email,
      from_name: form.contactPerson,
      company_name: form.companyName,
      reply_to: form.email,
      email: form.email,
      phone: form.phone,
      country: form.country,
      inquiry_type: inquiryTypeLabel,
      preferred_contact: preferredContactLabel,
      subject,
      message,
      requirements: form.requirements,
    };

    let inquirySent = false;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      inquirySent = true;

      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTOREPLY_TEMPLATE_ID,
          {
            // Common aliases keep the template compatible when its recipient
            // field uses {{to_email}}, {{email}}, or {{user_email}}.
            to_email: form.email,
            email: form.email,
            user_email: form.email,
            reply_to: companyProfile.email,
            to_name: form.contactPerson,
            name: form.contactPerson,
            contact_person: form.contactPerson,
            from_name: "Larkosis Pharma",
            company_name: form.companyName,
            inquiry_type: inquiryTypeLabel,
            preferred_contact: preferredContactLabel,
            submitted_subject: subject,
            subject: `We received your inquiry - ${form.companyName}`,
            support_email: companyProfile.email,
            support_phone: companyProfile.phone,
            website: companyProfile.website,
            message:
              "Thank you for contacting Larkosis Pharma. We have received your inquiry and our team will review it shortly.",
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
      }

      setSubmitStatus({
        type: "success",
        message:
          t.success ||
          "Inquiry submitted successfully. Our team will contact you shortly.",
      });
      setForm(initialState);
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      const errorReason =
        typeof error === "object" && error !== null
          ? error.text || error.message || ""
          : "";

      setSubmitStatus({
        type: "error",
        message: inquirySent
          ? `Your inquiry was submitted, but the confirmation email could not be sent${errorReason ? ` (${errorReason})` : ""}. Please check the EmailJS auto-reply template settings.`
          : errorReason
          ? `Unable to send inquiry right now (${errorReason}). Please email us at ${companyProfile.email}.`
          : `Unable to send inquiry right now. Please email us at ${companyProfile.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#f0dfd3] bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#241913]">
            {t.formTitle || "Send Us A Message"}
          </h2>
        </div>

        <div className="hidden sm:block">
          <div
            className={`h-2 w-2 rounded-full ${
              Object.keys(errors).length === 0 ? "bg-[#ec671f]" : "bg-[#c65b2b]"
            }`}
          />
        </div>
      </div>

      {submitStatus && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm ${
            submitStatus.type === "success"
              ? "border border-[#f2cfba] bg-[#fff4ea] text-[#8a4725]"
              : "border border-[#f0c6c6] bg-[#fff3f3] text-[#9c3838]"
          }`}
        >
          <div className="flex items-center gap-2">{submitStatus.message}</div>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">
            Company Name *
          </label>
          <input
            required
            name="companyName"
            value={form.companyName}
            onChange={updateField}
            placeholder="e.g., Larkosis Pharmaceuticals"
            data-error={!!errors.companyName}
            className={`w-full rounded-xl border ${
              errors.companyName ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">
            Contact Person *
          </label>
          <input
            required
            name="contactPerson"
            value={form.contactPerson}
            onChange={updateField}
            placeholder="e.g., John Smith"
            data-error={!!errors.contactPerson}
            className={`w-full rounded-xl border ${
              errors.contactPerson ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">
            {t.email || "Email Address"} *
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder={t.emailPlaceholder || "e.g., john@company.com"}
            data-error={!!errors.email}
            className={`w-full rounded-xl border ${
              errors.email ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">
            {t.phone || "Phone / WhatsApp"} *
          </label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder={t.phonePlaceholder || "e.g., +1 234 567 8900"}
            data-error={!!errors.phone}
            className={`w-full rounded-xl border ${
              errors.phone ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-[#7b4f37]">
            Destination Country *
          </label>
          <select
            required
            name="country"
            value={form.country}
            onChange={updateField}
            data-error={!!errors.country}
            className={`w-full rounded-xl border ${
              errors.country ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-[#7b4f37]">
            {t.message || "Requirements"} *
          </label>
          <textarea
            required
            rows={6}
            name="requirements"
            value={form.requirements}
            onChange={updateField}
            placeholder={
              t.messagePlaceholder ||
              "Please mention product names, strengths, quantities, and any regulatory requirements. Include specific packaging needs if any."
            }
            data-error={!!errors.requirements}
            className={`w-full rounded-xl border ${
              errors.requirements ? "border-red-400 bg-red-50" : "border-[#e7c8b3] bg-[#fff9f5]"
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-[#b18b75]">
          <span className="font-semibold text-red-500">*</span> Required fields
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setForm(initialState)}
            className="rounded-xl border border-[#e7c8b3] bg-white px-6 py-3 text-sm font-semibold text-[#7b4f37] transition-colors hover:bg-[#fff9f5]"
          >
            Clear Form
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative min-w-[160px] cursor-pointer overflow-hidden rounded-full bg-[linear-gradient(90deg,#2b1d16_0%,#ec671f_100%)] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Submit Inquiry
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
