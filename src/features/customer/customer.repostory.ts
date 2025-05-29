import { DbType } from "@/db";
import { customers } from "@/db/schema";
import { Customer } from "./types";

export class CustomerRepository {
  constructor(private readonly db: DbType) {}

  async createCustomer(customer: Customer) {
    const {
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      notes,
      active = true,
    } = customer;

    const [newCustomer] = await this.db
      .insert(customers)
      .values({
        firstName,
        lastName,
        email,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        notes,
        active,
      })
      .returning();

    return newCustomer;
  }
}
