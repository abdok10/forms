"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TalkToSalesAction } from "@/actions/actions";
import { SubmitButton } from "@/components/SubmitButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { submissionSchema } from "@/lib/zodSchemas";
import { useFormState } from "react-dom";

export default function Home() {
  const [lastResult, action] = useFormState(TalkToSalesAction, undefined);
  const [form, salesFields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: submissionSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <section className="min-h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold mb-2">Contact Us</h1>
      <Card className="max-w-[500px] w-full">
        <Tabs defaultValue="sales">
          <CardContent className="mt-5">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="sales" tabIndex={0}>
                Talk to Sales
              </TabsTrigger>
              <TabsTrigger value="support" tabIndex={0}>
                Support Ticket
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sales">
              <p className="text-muted-foreground text-sm">
                You want to integrate your product with us? We can help you.
                Please contact us down below.
              </p>
              <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                className="flex flex-col gap-y-4 mt-5"
                noValidate
              >
                <input type="hidden" name="_gotcha" />
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    key={salesFields.name.key}
                    name={salesFields.name.name}
                    defaultValue={salesFields.name.initialValue}
                    placeholder="John Doe"
                  />
                  <p className="text-red-500 text-sm">
                    {salesFields.name.errors}
                  </p>
                </div>
                <div className="space-y-1 flex flex-col">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    key={salesFields.email.key}
                    name={salesFields.email.name}
                    defaultValue={salesFields.email.initialValue}
                    placeholder="john.doe@example.com"
                  />
                  <p className="text-red-500 text-sm">
                    {salesFields.email.errors}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Question or Comment</Label>
                  <Textarea
                    key={salesFields.message.key}
                    name={salesFields.message.name}
                    defaultValue={salesFields.message.initialValue}
                    placeholder="Pleae share some details about your needs..."
                    className="h-32"
                  />
                  <p className="text-red-500 text-sm">
                    {salesFields.message.errors}
                  </p>
                </div>

                <SubmitButton />
              </form>
            </TabsContent>

            <TabsContent value="support">
              <p className="text-muted-foreground text-sm">
                Troubleshoot a technical issue or payment problem.
              </p>
              <form className="flex flex-col gap-y-4 mt-5">
                <input type="hidden" name="_gotcha" />
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                  <p className="text-red-500 text-sm">
                    {/* {supportFields.name.errors} */}
                  </p>
                </div>
                <div className="space-y-1 flex flex-col">
                  <Label htmlFor="email">Account Email</Label>
                  <Input id="email" placeholder="John.Doe@example.com" />
                  <p className="text-red-500 text-sm">
                    {/* {supportFields.email.errors} */}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="problem">Problem</Label>
                  <Textarea
                    placeholder="Something is wrong..."
                    className="h-32"
                  />
                  <p className="text-red-500 text-sm">
                    {/* {supportFields.message.errors} */}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="problem">Asset</Label>
                  <Input type="file" id="image" />
                </div>

                <SubmitButton />
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </section>
  );
}
