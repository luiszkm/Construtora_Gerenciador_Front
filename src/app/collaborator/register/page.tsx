"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"




export default function Register() {
  const {push} = useRouter()
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    role: z.string().min(2).max(50),
    workingDays: z.number().min(1),
    dailyPrice: z.number().min(1),
    additionalMoney: z.number().optional(),
    active: z.boolean(),
    pixkey: z.string().optional(),

  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      active: true,
      pixkey: "",
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    push('/dashboard')  // Redirect to the dashboard page.
    console.log(values)
  }
 return (
  <main>
  <h1 className="mb-4 mt-4" >Registrar Colaborador</h1>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome do Colaborador" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cargo</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Pedreiro" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="dailyPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diária</FormLabel>
            <FormControl>
              <Input placeholder="Valor da diária" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
         <FormField
        control={form.control}
        name="workingDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dias trabalhados</FormLabel>
            <FormControl>
              <Input placeholder="Total de dias há trabalhar" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="additionalMoney"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adicionais</FormLabel>
            <FormControl>
              <Input placeholder="Ex: passagem" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pixkey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chave PIX</FormLabel>
            <FormControl>
              <Input placeholder="chave pix" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Registar</Button>
    </form>
  </Form>
</main>
 )
}