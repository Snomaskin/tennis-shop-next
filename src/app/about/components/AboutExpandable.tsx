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
    <div className="mb-4 overflow-hidden rounded-lg border shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between bg-gray-100 px-4 py-3 text-left hover:cursor-pointer hover:bg-gray-200"
      >
        <span className="text-lg font-semibold">{content.section}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? "group-hover:-rotate-90" : "group-hover:rotate-90"}`}
        >
          <ChevronRight />
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
            <div className="border-t bg-white px-4 py-3">
              {content.fields.map((field) => (
                <section key={field.name} className="mb-3">
                  <h2 className="font-medium text-gray-800">{field.name}</h2>
                  <p className="text-gray-600">{field.value}</p>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
