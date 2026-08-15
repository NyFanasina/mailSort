"use client";
import { useMutation } from "@tanstack/react-query";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TokenStorage from "../lib/tokenStorage";
import { authenticate } from "../lib/service";

export default function Login() {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { isPending, mutate: mutateLogin } = useMutation({
    mutationFn: authenticate,
    onSuccess: (data) => {
      TokenStorage.set(data.token);
      push("/dashboard");
    },
    onError: (error) => {
      if (error.response.status === 401) return setErrorMessage("Adresse e-mail ou mot de passe invalide");
      setErrorMessage("Une erreur est survenue");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(payload) {
    mutateLogin(payload);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white rounded-xl shadow p-8 space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Connexion</h1>
        <Input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          error={errors.email}
          register={register}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          error={errors.password}
          register={register}
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold py-2.5
             transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          {isPending ? "Connexion..." : "Se connecter"}
        </button>
        <p className="text-center text-sm text-red-500">{errorMessage}</p>
      </form>
    </div>
  );
}
