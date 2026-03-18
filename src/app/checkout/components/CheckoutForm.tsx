import FormField from "@/components/inputs/FormField";
import { Path, useFormContext } from "react-hook-form";
import { useCheckout } from "../hooks/useCheckout";
import { formatLabel } from "@/lib/utils/textFormat";
import { checkoutSteps } from "@/config/checkout/checkoutSteps";
import { MoveRight, MoveLeft } from "lucide-react";
import {
  CheckoutFormSchema,
  autoFillValues,
} from "@/config/checkout/checkoutSchema";

interface Props {
  stepName: keyof CheckoutFormSchema;
  title: string;
  description: string;
}

export default function CheckoutForm({ stepName, title, description }: Props) {
  const { getValues, trigger, reset } = useFormContext();
  const { next, prev, stepIndex } = useCheckout();
  const defaultValues = getValues(stepName) || {};
  const fieldNames: Path<CheckoutFormSchema>[] = Object.keys(defaultValues).map(
    (key) => `${stepName}.${key}` as Path<CheckoutFormSchema>,
  );

  const prevStepLabel = checkoutSteps[stepIndex - 1]?.label;
  const nextStepLabel = checkoutSteps[stepIndex + 1]?.label;

  const handleNext = async () => {
    const valid = await trigger(stepName);
    if (valid) next();
  };
  const handleAutofill = () => {
    const currentValues = getValues();

    reset({
      ...currentValues,
      [stepName]: autoFillValues[stepName],
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 pt-20 pb-5">
      <div className="mb-2 flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-neutral-800">{title}</h2>
        <p className="mt-1 text-sm text-neutral-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm sm:grid-cols-2">
        {fieldNames.map((fieldName) => (
          <FormField
            key={fieldName}
            name={fieldName}
            label={formatLabel(fieldName.split(".")[1])}
          />
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-neutral-200/60 bg-white/50 p-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => prev()}
          className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
        >
          <span className="text-base leading-none duration-200 group-hover:-translate-x-0.5 group-hover:scale-120">
            <MoveLeft size={20} />
          </span>
          {prevStepLabel}
        </button>
        <button
          type="button"
          onClick={handleAutofill}
          className="group flex shrink cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
        >
          Autofill
        </button>
        <button
          type="button"
          onClick={() => handleNext()}
          className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-2 border-transparent bg-emerald-400 px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:border-yellow-300"
        >
          {nextStepLabel}
          <span className="text-base leading-none duration-200 group-hover:translate-x-0.5 group-hover:scale-120">
            <MoveRight size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
