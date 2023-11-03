import prismaCliente from "../prisma";

type DeleteCustomerProps = {
  id: string,
}

class DeleteCustomerService {
  async execute({ id } : DeleteCustomerProps) {
    if (!id) {
      throw new Error('Solicitação invalida.');
    }

    const findCustomer = await prismaCliente.customer.findFirst({
      where: {
        id: id
      }
    });

    if (!findCustomer) {
      throw new Error('Cliente não existe!');
    }

    await prismaCliente.customer.delete({
      where: {
        id:findCustomer.id
      }
    });

    return { message: "Deletado com sucesso!"}

  }
}

export { DeleteCustomerService }
