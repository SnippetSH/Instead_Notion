"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import { Button } from "../4_shared/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../4_shared/components/ui/form"
import { Input } from "../4_shared/components/ui/input"
import { UserStore } from "@/5_api/store/UserStore";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  AuthKey: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      AuthKey: "",
    },
  })

  const setUser = UserStore((s) => s.setUser);
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const res = await axios.get(`/check-key?key=${encodeURIComponent(data.AuthKey)}`);
      const result: { "exist": number, "name": string, "key": string } = res.data;
      if (result.exist > 0) {
        console.log("login");
        const per = result.exist === 3 ? "admin" : result.exist === 2 ? "user" : "unlogin";
        setUser({ name: result.name, key: result.key, permission: per });
        navigate(`/welcome/@${result.name}`)
      } else {
        console.log("failed");
      }
    } catch (e) {
      alert("Error! Please try again later")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2 mx-2">
        <FormField
          control={form.control}
          name="AuthKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Login</FormLabel>
              <FormControl>
                <Input placeholder="{InitialName}-{key}" {...field} />
              </FormControl>
              <FormDescription>
                Your Access Key
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
