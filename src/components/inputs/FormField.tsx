import { useFormContext, Path, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
};

export default function FormField<T extends FieldValues>({
  name,
  label,
  type = "text",
}: Props<T>) {
  const { register, getFieldState, formState } = useFormContext<T>();

  const { error, invalid } = getFieldState(name, formState);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="pl-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
        {label}
      </label>

      <input
        {...register(name)}
        type={type}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all outline-none ${
          invalid
            ? "border-red-400 focus:ring-red-100"
            : "border-neutral-200 hover:border-neutral-300 focus:border-emerald-400 focus:ring-emerald-100"
        }`}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
