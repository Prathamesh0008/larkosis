"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { companyProfile } from "@/data/companyProfile";

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

// Country list for dropdown
const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", 
  "Italy", "Spain", "Australia", "Japan", "China", "India", 
  "Brazil", "Mexico", "South Africa", "UAE", "Saudi Arabia", 
  "Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam",
  "South Korea", "Russia", "Turkey", "Egypt", "Nigeria", "Kenya",
  "Argentina", "Chile", "Colombia", "Other"
];

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_AUTOREPLY_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || "";

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!form.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\+\-\(\)]{8,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.country) {
      newErrors.country = "Please select your country";
    }

    if (!form.requirements.trim()) {
      newErrors.requirements = "Please provide your requirements";
    } else if (form.requirements.trim().length < 20) {
      newErrors.requirements = "Please provide more details (minimum 20 characters)";
    }

    return newErrors;
  };

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    const autoReplyParams = {
      to_email: form.email,
      to_name: form.contactPerson,
      company_name: form.companyName,
      inquiry_type: inquiryTypeLabel,
      preferred_contact: preferredContactLabel,
      submitted_subject: subject,
      support_email: companyProfile.email,
      support_phone: companyProfile.phone,
      website: companyProfile.website,
      message:
        "Thank you for contacting Larkosis Pharma. We have received your inquiry and our team will review it shortly.",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      let autoReplySent = false;
      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTOREPLY_TEMPLATE_ID,
            autoReplyParams,
            {
              publicKey: EMAILJS_PUBLIC_KEY,
            },
          );
          autoReplySent = true;
        } catch (autoReplyError) {
          console.error("EmailJS auto-reply failed:", autoReplyError);
        }
      }

      setSubmitStatus({
        type: "success",
        message:
          EMAILJS_AUTOREPLY_TEMPLATE_ID && autoReplySent
            ? "Inquiry submitted successfully. A confirmation email has been sent to your inbox."
            : "Inquiry submitted successfully. Our team will contact you shortly.",
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
        message: errorReason
          ? `Unable to send inquiry right now (${errorReason}). Please email us at ${companyProfile.email}.`
          : `Unable to send inquiry right now. Please email us at ${companyProfile.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Character counter for requirements
  const charCount = form.requirements.length;
  const charLimit = 1000;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#f2d8c7] bg-white p-5 shadow-[0_12px_28px_rgba(175,86,37,0.08)] sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#291b12]">Send Inquiry</h2>
          <p className="mt-1 text-sm text-[#5e4332]">
            Submit your requirement. We will connect with quotation details.
          </p>
        </div>
        
        {/* Live validation indicator */}
        <div className="hidden sm:block">
          <div className={`h-2 w-2 rounded-full ${Object.keys(errors).length === 0 ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>

      {/* Status Message */}
      {submitStatus && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {submitStatus.type === 'success' ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {submitStatus.message}
          </div>
        </div>
      )}

      {/* Inquiry Type Toggle */}
      <div className="mt-5 flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="inquiryType"
            value="general"
            checked={form.inquiryType === 'general'}
            onChange={updateField}
            className="h-4 w-4 text-[#ec671f]"
          />
          <span className="text-sm text-[#3f2d23]">General Inquiry</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="inquiryType"
            value="urgent"
            checked={form.inquiryType === 'urgent'}
            onChange={updateField}
            className="h-4 w-4 text-[#ec671f]"
          />
          <span className="text-sm text-[#3f2d23]">Urgent / Express</span>
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Company Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">Company Name *</label>
          <input
            required
            name="companyName"
            value={form.companyName}
            onChange={updateField}
            placeholder="e.g., Larkosis Pharmaceuticals"
            data-error={!!errors.companyName}
            className={`w-full rounded-xl border ${
              errors.companyName ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
          {errors.companyName && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Contact Person */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">Contact Person *</label>
          <input
            required
            name="contactPerson"
            value={form.contactPerson}
            onChange={updateField}
            placeholder="e.g., John Smith"
            data-error={!!errors.contactPerson}
            className={`w-full rounded-xl border ${
              errors.contactPerson ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
          {errors.contactPerson && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.contactPerson}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">Email Address *</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="e.g., john@company.com"
            data-error={!!errors.email}
            className={`w-full rounded-xl border ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#7b4f37]">Phone / WhatsApp *</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder="e.g., +1 234 567 8900"
            data-error={!!errors.phone}
            className={`w-full rounded-xl border ${
              errors.phone ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Country Dropdown */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-[#7b4f37]">Destination Country *</label>
          <select
            required
            name="country"
            value={form.country}
            onChange={updateField}
            data-error={!!errors.country}
            className={`w-full rounded-xl border ${
              errors.country ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.country}
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-[#7b4f37]">Preferred Contact Method</label>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={form.preferredContact === 'email'}
                onChange={updateField}
                className="h-4 w-4 text-[#ec671f]"
              />
              <span className="text-sm text-[#3f2d23]">Email</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={form.preferredContact === 'phone'}
                onChange={updateField}
                className="h-4 w-4 text-[#ec671f]"
              />
              <span className="text-sm text-[#3f2d23]">Phone / WhatsApp</span>
            </label>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-1 sm:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#7b4f37]">Requirements *</label>
            <span className={`text-xs ${charCount > charLimit * 0.8 ? 'text-orange-500' : 'text-[#b18b75]'}`}>
              {charCount}/{charLimit}
            </span>
          </div>
          <textarea
            required
            rows={6}
            name="requirements"
            value={form.requirements}
            onChange={updateField}
            maxLength={charLimit}
            placeholder="Please mention product names, strengths, quantities, and any regulatory requirements. Include specific packaging needs if any."
            data-error={!!errors.requirements}
            className={`w-full rounded-xl border ${
              errors.requirements ? 'border-red-400 bg-red-50' : 'border-[#e7c8b3] bg-[#fff9f5]'
            } px-4 py-3 text-sm text-[#3f2d23] outline-none ring-[#ec671f] focus:ring-2 transition-colors`}
          />
          {errors.requirements ? (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.requirements}
            </p>
          ) : (
            charCount > charLimit * 0.8 && charCount < charLimit && (
              <p className="text-xs text-orange-500 mt-1">
                You are approaching the character limit
              </p>
            )
          )}
        </div>
      </div>

      {/* Form Footer */}
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
            className="relative min-w-[160px] overflow-hidden rounded-xl bg-[#ec671f] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#d85f1d] disabled:cursor-not-allowed disabled:opacity-70 group"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Submit Inquiry
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Privacy Note */}
      <p className="mt-4 text-xs text-[#b18b75] border-t border-[#f2d8c7] pt-4">
        By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
        Your information will be used solely for business communication.
      </p>
    </form>
  );
}
