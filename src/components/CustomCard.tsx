"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircleIcon, CheckCircle2Icon, Loader, PopcornIcon } from "lucide-react"
import { useRouter } from "next/navigation"



const FormSchema = z.object({
  username: z.string().regex(
    /^(https:\/\/(www\.)?youtube\.com\/|https:\/\/youtu\.be\/)/,
    { message: "Invalid YouTube URL" }
  ),
});

export default function CustomCard() : React.ReactNode{


  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  const router = useRouter();

  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/sound/play/${encodeURIComponent(data.username)}`)
  }
  
  function onErorr(erorrs:any){
    return(
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

    return(
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center">Enter Your Url</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onErorr)} className="w-full space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the url</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.youtube.com/watch?....." {...field} />
                        </FormControl>
                        {form.formState.isSubmitted && form.formState.errors.username   && (
                          <Alert variant="destructive">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                              {form.formState.errors.username.message}
                            </AlertDescription>
                          </Alert>
                        )}
                        {
                          form.formState.isSubmitted && form.formState.isValid && (
                          <Alert>
                              <CheckCircle2Icon className="text-green-500"/>
                              <AlertTitle className="text-green-500">Success! Your changes have been saved</AlertTitle>
                            </Alert>
                          )
                        }
                        {
                          form.formState.isLoading && (
                          <Alert>
                              <Loader />
                              <AlertTitle className="">Loading ...</AlertTitle>
                            </Alert>
                          )
                        }
                      </FormItem>
                    )}
                  />
                <CardFooter className="flex justify-center size-full">
                  <Button type="submit">Submit</Button>
                </CardFooter>
                </form>
              </Form>
            </CardContent>
        </Card>
    )
}


