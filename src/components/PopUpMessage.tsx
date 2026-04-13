"use client";
import { motion, AnimatePresence } from "motion/react";
import { MoveRight } from "lucide-react";

interface Props {
  open: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  primaryButton?: {
    label: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick?: () => void;
  };
}

export default function PopUpMessage({
  open,
  onClose,
  title,
  description,
  primaryButton,
  secondaryButton,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="relative mx-4 w-full max-w-md"
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white/50 p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-neutral-800">
                  {title}
                </h2>
                {description && (
                  <p className="mt-1 text-sm text-neutral-400">{description}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                {secondaryButton && (
                  <button
                    onClick={secondaryButton.onClick}
                    className="group w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                  >
                    {secondaryButton.label}
                  </button>
                )}

                {primaryButton && (
                  <button
                    onClick={primaryButton.onClick}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-white duration-200 hover:ring-3 hover:ring-yellow-300/90"
                  >
                    {primaryButton.label}
                    <span className="duration-200 group-hover:translate-x-0.5 group-hover:scale-110">
                      <MoveRight size={18} />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
