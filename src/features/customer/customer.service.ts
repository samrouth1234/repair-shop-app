import { DbType } from "@/db";

import { Customer } from "./types";
import { CustomerRepository } from "./customer.repostory";

export class CustomerService {
  private readonly customerRepository: CustomerRepository;

  constructor(db: DbType) {
    this.customerRepository = new CustomerRepository(db);
  }

  async createCustomer(customer: Customer) {
    return this.customerRepository.createCustomer(customer);
  }
}
