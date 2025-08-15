"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";


export default function Home() {


  const router = useRouter();

  return (
    <>
    <div className="flex w-screen h-screen items-center justify-center px-9 md:px-9">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>The avilable Services</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button variant={"default"} onClick={() => router.push("/sound")}>
            Youtaudio
          </Button>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
