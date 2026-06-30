import { useForm } from "react-hook-form";

import { useLogin } from "../../features/auth/hooks/useLogin";
import { toast } from "react-toastify";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  otp?: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();

  const [sendOtp, setSendOtp] = useState(false);

  const loginMutation = useLogin();

  const onSubmit = async (data: FormValues) => {
    const response = await loginMutation.mutateAsync(data);

    if (response.success) {
      toast.success(response?.message);

      setSendOtp(true);

      if (response?.data?.token && sendOtp) {
        localStorage.setItem("token", response.data.token);

        window.location.href = "/admin";
        return;
      }
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border border-slate-800 p-8"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full rounded border p-3"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full rounded border p-3"
        />

        {sendOtp && (
          <input
            {...register("otp")}
            placeholder="OTP"
            className="w-full rounded border p-3"
          />
        )}

        <button type="submit" className="w-full rounded bg-sky-500 p-3">
          Login
        </button>
      </form>
    </div>
  );
}
