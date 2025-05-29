"use client";

import {
  CreateCustomer,
  createCustomerSchema,
} from "@/features/customer/validation/createCustomerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateCustomerFrom = ({
  customer,
  onSucess,
}: {
  customer?: CreateCustomer;
  onSucess?: () => void;
}) => {
  const form = useForm<CreateCustomer>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: customer || {},
  });

  const onSubmit = async (values: CreateCustomer) => {
    const respone = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (respone.ok && onSucess) onSucess();
  };

  return (
    <section>
      <Card className="max-w-xl mx-auto">
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="First Name" {...form.register("firstName")} />
            <Input placeholder="Last Name" {...form.register("lastName")} />
            <Input
              placeholder="Email"
              type="email"
              {...form.register("email")}
            />
            <Input placeholder="Phone" {...form.register("phone")} />
            <Input placeholder="Address 1" {...form.register("address1")} />
            <Input placeholder="Address 2" {...form.register("address2")} />
            <Input placeholder="City" {...form.register("city")} />
            <Input placeholder="State" {...form.register("state")} />
            <Input placeholder="Zip" {...form.register("zip")} />
            <Input placeholder="Notes" {...form.register("notes")} />
            <Button type="submit">Create Customer</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateCustomerFrom;
