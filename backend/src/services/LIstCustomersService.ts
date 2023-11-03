import prismaCliente from "../prisma";

class LIstCustomersService {
  async execute() {

    const customers = await prismaCliente.customer.findMany();

    return customers;
  }
}

export { LIstCustomersService }
