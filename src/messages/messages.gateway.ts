import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({ namespace: '/messages' })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  create(@MessageBody() message: string) {
    const payload: CreateMessageDto = {
      message,
      userId: '1df06af8-ba5e-401e-a2c2-e337069e1e2a',
      date: new Date(Date.now()),
    };
    this.server.emit('getMessage', message);
    return this.messagesService.create(payload);
  }

  @SubscribeMessage('getAllMessage')
  async findAll(): Promise<WsResponse<Message[]>> {
    const list = await this.messagesService.findAll();
    return { event: 'getAllMessage', data: list };
  }
}
