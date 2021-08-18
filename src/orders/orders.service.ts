import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrdersService {
  private readonly orders = [{ id: 1, name: 'demo' }];

  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders[id];
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
