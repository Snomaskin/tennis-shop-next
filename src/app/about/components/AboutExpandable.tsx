"use client";
import { AboutSection } from "@/types/about";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AboutExpandable({
  content,
}: {
  content: AboutSection;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors duration-200 hover:bg-white/60"
      >
        <span className="text-sm font-semibold text-neutral-800">
          {content.section}
        </span>
        <span
          className={`text-neutral-400 transition-transform duration-300 ${
            isOpen ? "rotate-90" : "group-hover:rotate-90"
          }`}
        >
          <ChevronRight size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-neutral-100 px-5 py-4">
              {content.fields.map((field) => (
                <section key={field.name} className="mb-3 last:mb-0">
                  <h2 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    {field.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-600">
                    {field.value}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
