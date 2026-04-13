"use client";
import { LoginSchema, loginSchema } from "@/config/user/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ky from "ky";
import AuthCard from "@/components/inputs/AuthCard";
import { getErrorMessageAsync } from "@/lib/utils/errors";
import { useRouter } from "next/navigation";
import PopUpMessage from "@/components/PopUpMessage";
import { useState } from "react";

export default function Login() {
  const methods = useForm<LoginSchema>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  const { isSubmitting } = methods.formState;

  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await ky.post("/api/auth/login", { json: data });
      if (res.ok) {
        setLoginSuccess(true);
        setTimeout(() => {
          router.push("/account");
          router.refresh();
        }, 3000);
      }
    } catch (e) {
      console.error(await getErrorMessageAsync(e));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AuthCard
          h2="Welcome, dear customer"
          description="Sign in to your account to continue"
          inputs={[
            { name: "username", label: "Username", type: "text" },
            { name: "password", label: "Password", type: "password" },
          ]}
          secondaryButtonLink={{ label: "Create account", href: "/signup" }}
          primaryButton={{ label: isSubmitting ? "Please wait..." : "Sign in" }}
          isSubmitting={isSubmitting}
        />
      </form>
      {loginSuccess && (
        <PopUpMessage
          title="Login success"
          open={loginSuccess}
          description="Redirecting to account overview"
        />
      )}
    </FormProvider>
  );
}
