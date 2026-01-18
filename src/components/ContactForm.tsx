import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LineDivider } from "./GlobalGridOverlay";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  project: z.string().trim().min(1, "Please describe your project").max(2000),
  budget: z.string().min(1, "Please select a budget range"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
  { value: "under-1k", label: "Under $1k" },
  { value: "1k-3k", label: "$1k–$3k" },
  { value: "3k-5k", label: "$3k–$5k" },
  { value: "5k-plus", label: "$5k+" },
];

export function ContactForm() {
  const { ref, isRevealed } = useScrollReveal();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    project: "",
    budget: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
  
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }
  
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xpwzgkqr", {
        <form action="https://formsubmit.co/SEUEMAIL@EMAIL.COM" method="POST">
  <input type="hidden" name="_subject" value="New project request — NXT" />
  <input type="hidden" name="_template" value="table" />
  <input type="hidden" name="_captcha" value="false" />

  <!-- (Opcional) redirecionar após enviar -->
  <!-- <input type="hidden" name="_next" value="https://nxt-ten-pi.vercel.app/thanks" /> -->

  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />

  <textarea
    name="message"
    placeholder="What are you looking to build? Goals, pages, features, and any links."
    required
  ></textarea>

  <select name="budget" required>
    <option value="" disabled selected>Estimated budget</option>
    <option value="Under $1k">Under $1k</option>
    <option value="$1k–$3k">$1k–$3k</option>
    <option value="$3k–$5k">$3k–$5k</option>
    <option value="$5k+">$5k+</option>
  </select>

  <button type="submit">Send request</button>
</form>
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          budget: budgetOptions.find((b) => b.value === formData.budget)?.label,
        }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", project: "", budget: "" });
        setErrors({});
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Using Formspree for email notifications
      const response = await fetch("https://formspree.io/f/xpwzgkqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          budget: budgetOptions.find((b) => b.value === formData.budget)?.label,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-secondary" ref={ref}>
        {/* Clean solid background - NO grid texture */}
        <div className="container max-w-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading">
              Thanks — we've received your request.
            </h2>
            <p className="text-muted-foreground text-lg">
              If it's a good fit, we'll reply by email.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary" ref={ref}>
      {/* Clean solid background - NO grid texture */}
      <div className="container max-w-2xl">
        {/* Simple line divider - no grid texture */}
        <LineDivider 
          className="mb-16"
          animate={isRevealed}
        />
        
        <div className="space-y-4 mb-12">
          <h2 
            className={`text-3xl md:text-4xl font-heading transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Start a project
          </h2>
          <p 
            className={`text-muted-foreground text-lg transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Tell us what you're building. We'll review your request and reply if it's a good fit.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 ease-out-expo ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "260ms" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-ui">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-destructive" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-ui">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="project" className="text-sm font-ui">
              What are you looking to build?
            </label>
            <textarea
              id="project"
              name="project"
              rows={5}
              value={formData.project}
              onChange={handleChange}
              placeholder="Goals, pages, features, and any links."
              className={`w-full px-4 py-3 bg-background border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.project ? "border-destructive" : "border-border"
              }`}
            />
            {errors.project && (
              <p className="text-sm text-destructive">{errors.project}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-ui">Estimated budget</label>
            <div className="flex flex-wrap gap-3">
              {budgetOptions.map((option) => (
                <label
                  key={option.value}
                  className={`px-4 py-2 border cursor-pointer transition-colors duration-200 ${
                    formData.budget === option.value
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-border hover:border-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={option.value}
                    checked={formData.budget === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-ui">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send request"}
          </button>
        </form>
      </div>
    </section>
  );
}
