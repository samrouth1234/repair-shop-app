
import { DbType } from '@/db';
import { customers  } from '@/db/schema';

interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  active?: boolean;
}


export class CustomerRepository {
  // create constructor 
  constructor(private readonly db:DbType) {}

  // careate customer 
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