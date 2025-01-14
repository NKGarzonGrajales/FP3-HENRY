"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { createCheckoutSession } from "@/app/api/donationsAPI";
import { IUserSessionDt } from "@/interfaces/types";
import DonationsCarousel from "./DonationsCarousel";
import { validateEmail, validateAmount } from "@/helpers/validateDonations";

const Donations = ({ userSession }: { userSession?: IUserSessionDt | null }) => {
  const [amount, setAmount] = useState<string>(""); 
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const error = validateAmount(value);
    setAmountError(error);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setEmailError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const amountValidationError = validateAmount(amount);

    if (emailValidationError) {
      setEmailError(emailValidationError);
    }

    if (amountValidationError) {
      setAmountError(amountValidationError);
    }

    if (emailValidationError || amountValidationError) {
      Swal.fire({
        icon: "error",
        title: "Formulario inválido",
        text: "Por favor, corrige los errores en el formulario.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }

    try {
      const emailToSend = userSession?.email || email;
      const checkoutUrl = await createCheckoutSession({
        amount: Number(amount) * 100,
        email: emailToSend,
      });

      if (checkoutUrl) {
        Swal.fire({
          icon: "success",
          iconColor: "green",
          title: "¡Gracias por tu donación!",
          text: "Serás redirigido a Stripe para completar el pago.",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        }).then(() => {
          window.location.href = checkoutUrl; 
        });
      }
    } catch (error) {
      console.error("Error al procesar la donación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el proceso de pago",
        text: "Por favor, inténtalo de nuevo más tarde.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="bg-white my-10 rounded-xl border border-green500 shadow-2xl w-[90%] sm:w-[70%] lg:w-[60%] max-w-4xl mx-auto h-auto overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="relative h-[250px] w-full flex items-center justify-center p-4">
          <DonationsCarousel />
        </div>

        <div className="p-4 lg:p-6 flex flex-col justify-center">
          <h2 className="text-xl lg:text-2xl font-bold text-customGreen-950 text-center mb-4 font-sans mt-2">
            Haz tu Donación
          </h2>
          <p className="text-customGreen-900 text-sm lg:text-base text-center mb-4">
            Tu apoyo nos ayuda con nuestra misión de reunir mascotas perdidas
            con sus dueños.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label
                htmlFor="amount"
                className="block text-customGreen-900 font-medium text-sm lg:text-base mb-1"
              >
                Monto a donar (USD):
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="25"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-800 text-sm lg:text-base ${
                  amountError
                    ? "border-red-300 focus:ring-red-300"
                    : "border-gray-300 focus:ring-customGreen-400"
                }`}
              />
              {amountError && (
                <div className="absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md bg-customGreen-400 text-white z-10">
                  {amountError}
                </div>
              )}
            </div>

            {!userSession && (
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-customGreen-900 font-medium text-sm lg:text-base mb-1"
                >
                  Correo electrónico:
                </label>
                <input
                  id="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-800 text-sm lg:text-base ${
                    emailError
                      ? "border-red-300 focus:ring-red-300"
                      : "border-gray-300 focus:ring-customGreen-400"
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingresa tu correo"
                />
                {emailError && (
                  <div className="absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md bg-customGreen-400 text-white z-10">
                    {emailError}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-customGreen-500 text-white py-2 px-4 rounded-lg text-sm lg:text-base font-semibold hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Donar ${amount || "25"}
            </button>
          </form>

          <p className="text-sm lg:text-xs text-customGreen-800 mt-4 text-center">
            Gracias por contribuir, con tu ayuda, podemos mejorar más nuestro
            servicio. <span className="text-lg lg:text-xl">🐾</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donations;











