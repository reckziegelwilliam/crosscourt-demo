"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "schema/index";

import { register } from "@/app/actions/register";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { useTransition } from "react";

export  async function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  startTransition(async () => {
    const data = await register(values);
    if (data && data.success) setSuccess(data.success);
    if (data && data.error) setError(data.error);
  });
};

return (
  <Card className="w-[400px]">
  <CardHeader>
    <CardTitle>CrossCourt Sign Up</CardTitle>
    <CardDescription>Pop on our paddle app.</CardDescription>
  </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="******" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <Button type="submit" size="lg" className="w-full">
      Sign in
    </Button>
  </form>
  </Form>
  </CardContent>
  <CardFooter>
      <p className="text-center text-sm text-gray-600">
        {"Don't have an account? "}
        <Link href="/register" className="font-semibold text-gray-800">
          Sign up
        </Link>
        {' for free.'}
      </p>
    </CardFooter>

  </Card>
)
}