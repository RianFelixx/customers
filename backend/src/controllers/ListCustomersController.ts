import { FastifyRequest, FastifyReply } from 'fastify';
import { LIstCustomersService } from '../services/LIstCustomersService';

class ListCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {

    const listCustomerService = new LIstCustomersService();

    const customers = await listCustomerService.execute();

    reply.send(customers);
  }
}

export { ListCustomersController}

