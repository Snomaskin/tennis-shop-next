import Link from "next/link";
import FormField from "./FormField";
import { MoveRight } from "lucide-react";

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
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 pt-20 pb-5">
        <div className="mb-2 flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-neutral-800">{h2}</h2>
          <p className="mt-1 text-sm text-neutral-400">{description}</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm sm:flex-row">
          {inputs.map((input) => (
            <FormField
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
            />
          ))}
        </div>

        <div className="flex w-full items-center justify-between rounded-2xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm">
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
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-base font-semibold text-white duration-200 hover:ring-3 hover:ring-yellow-300/90"
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
  );
}
