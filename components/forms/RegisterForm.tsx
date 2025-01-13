"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";

import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "@radix-ui/react-label";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof userFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Bem Vindo</h1>
          <p className="text-dark-700">
            Faça nos conhecermos te melhor para poderes marcar a tua primeira
            consulta!
          </p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informação Pessoal</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nome completo"
          placeholder="Yuniz Tellis"
          iconSrc="assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="user@gmail.com"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Numero de Telefone"
            placeholder="(+258) 82 000 0000"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATEPICKER}
            control={form.control}
            name="birthdate"
            label="Data de Nascimento"
            placeholder="user@gmail.com"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Sexo"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value="{option} id={option}" />
                      <Label htmlFor={option} className="cursor-point">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            placeholder="(+258) 82 000 0000"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
          />
        </div>
        <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
