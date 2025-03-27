"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import VerficationInput from "react-verification-input";

const JoinPage = () => {
    // Logic to get workspace data to join 
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-full bg-white p-8 rounded-lg shadow-md">
      <Image src="/logo.png" alt="logo" width={60} height={60} />
      <div className="max-w-md flex flex-col justify-center items-center gap-y-4">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join Workspace</h1>
          <p className="text-md text-muted-foreground">
            Enter the code to join
          </p>
        </div>
        <VerficationInput
        length={6}
        autoFocus
          classNames={{
            container: "flex gap-x-2",
            character:
              "uppercase h-auto rounded-md border border-gray-300 text-lg font-medium text-gray-500 flex justify-center items-center",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
        />
      </div>
      <div className="flex gap-x-4">
        <Button variant="outline" size="lg" asChild>
            <Link href="/workspace/1" >Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
