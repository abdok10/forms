"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline">
          <Loader2 className="size-4 mr-2 animate-spin" /> Submitting...
        </Button>
      ) : (
        <Button type="submit" className="font-semibold bg-gradient-to-r from-[#946263] to-[#676394]">Submit Message</Button>
      )}
    </>
  );
}