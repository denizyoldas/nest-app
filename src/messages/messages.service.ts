import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    this.messageRepository.insert(createMessageDto);
  }

  findAll() {
    return this.messageRepository.find({ order: { date: 'ASC' } });
  }

  remove(id: string) {
    return this.messageRepository.delete(id);
  }
}
