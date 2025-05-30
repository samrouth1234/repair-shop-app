import { db } from "@/db";
import { BadRequestException, InternalServerErrorException } from "@/error";
import { CustomerService } from "@/features/customer";
import { createCustomerSchema } from "@/features/customer/validation/createCustomerSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createCustomerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const customerService = new CustomerService(db);
    const newCustomer = await customerService.createCustomer(parsed.data);

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Create customer failed:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
