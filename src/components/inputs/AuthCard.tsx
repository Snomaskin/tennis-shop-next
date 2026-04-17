import Link from "next/link";
import FormField from "./FormField";
import { MoveRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface Props {
  h2: string;
  description?: string;
  inputs: { name: string; label: string; type: string }[];
  secondaryButtonLink?: { label: string; href: string };
  primaryButton: { label: string };
  isSubmitting?: boolean;
}

export default function AuthCard({
  h2,
  description,
  inputs,
  secondaryButtonLink,
  primaryButton,
  isSubmitting,
}: Props) {
  return (
    <div className="h-full w-full bg-amber-100">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200/60 bg-white/50 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-neutral-800">{h2}</h2>
            <p className="mt-1 text-sm text-neutral-400">{description}</p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            {inputs.map((input) => (
              <FormField
                key={input.name}
                name={input.name}
                label={input.label}
                type={input.type}
              />
            ))}
          </div>

          <div className="flex w-full items-center justify-between gap-3">
            {secondaryButtonLink && (
              <Link
                href={secondaryButtonLink.href}
                className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              >
                {secondaryButtonLink.label}
              </Link>
            )}

            <button
              type="submit"
              className={twMerge(
                "group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-base font-semibold text-white duration-200 hover:ring-3 hover:ring-yellow-300/90",
                isSubmitting && "animate-pulse cursor-not-allowed hover:ring-0",
              )}
              disabled={isSubmitting}
            >
              {primaryButton.label}
              {!isSubmitting && (
                <span className="text-base leading-none duration-200 group-hover:translate-x-0.5 group-hover:scale-120">
                  <MoveRight size={20} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
