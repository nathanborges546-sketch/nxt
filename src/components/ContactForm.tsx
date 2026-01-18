import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LineDivider } from "./GlobalGridOverlay";
import { z } from "zod";

/* -------------------- Validation -------------------- */
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  project: z
    .string()
    .trim()
    .min(1, "Please describe your project")
    .max(2000),
  budget: z.string().min(1, "Please select a budget range"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
  { value: "under-1k", label: "Under $1k" },
  { value: "1k-3k", label: "$1k–$3k" },
  { value: "3k-5k", label: "$3k–$5k" },
  { value: "5k-plus", label: "$5k+" },
];

/* -------------------- Component -------------------- */
export function ContactForm() {
  const { ref, isRevealed } = useScrollReveal();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    project: "",
    budget: "",
  });

  const [errors, setErrors] =
    useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* -------------------- Handlers -------------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof ContactFormData, string>
      > = {};
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0] as keyof ContactFormData] =
          error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xdaaevre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          budget:
            budgetOptions.find(
              (b) => b.value === formData.budget
            )?.label || "",
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

  /* -------------------- Success State -------------------- */
  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="py-24 md:py-32 bg-secondary"
        ref={ref}
      >
        <div className="container max-w-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading">
              Thanks — we’ve received your request.
            </h2>
            <p className="text-muted-foreground text-lg">
              If it’s a good fit, we’ll reply by email.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* -------------------- Form -------------------- */
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-secondary"
      ref={ref}
    >
      <div className="container max-w-2xl">
        <LineDivider className="mb-16" animate={isRevealed} />

        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading">
            Start a project
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us what you’re building. We’ll review your request
            and reply if it’s a good fit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-ui">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-ui">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-ui">
              What are you looking to build?
            </label>
            <textarea
              name="project"
              rows={5}
              value={formData.project}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border resize-none"
            />
            {errors.project && (
              <p className="text-sm text-destructive">
                {errors.project}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-ui">
              Estimated budget
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {budgetOptions.map((option) => (
                <label
                  key={option.value}
                  className={`px-4 py-2 border cursor-pointer ${
                    formData.budget === option.value
                      ? "bg-foreground text-background"
                      : ""
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
                  {option.label}
                </label>
              ))}
            </div>
            {errors.budget && (
              <p className="text-sm text-destructive">
                {errors.budget}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Sending..." : "Send request"}
          </button>
        </form>
      </div>
    </section>
  );
}
