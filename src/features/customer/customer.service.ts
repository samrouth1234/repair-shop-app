import { DbType } from "@/db";
import { CustomerRepository } from "./customer.repostory";

export class CustomerService {
  private readonly customerRepository : CustomerRepository;

  constructor(db: DbType) {
    this.customerRepository = new CustomerRepository(db);
  }

  // create customer
  // async createCustomer(customer: Custoemr) {
  //   return this.customerRepository.createCustomer(customer);
  // }
}