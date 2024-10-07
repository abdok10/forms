"use server";

import { submissionSchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function TalkToSalesAction(
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: submissionSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(process.env.TALK_TO_SALES_URL!, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
      return redirect("/error");
  }

  return redirect("/success");
}


export async function SupportTicketAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: submissionSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const response = await fetch(process.env.TALK_TO_SALES_URL!, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return redirect("/error");
  }

  return redirect("/success");
}