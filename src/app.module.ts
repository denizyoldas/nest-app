import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    OrdersModule,
    MessagesModule,
  ],
})
export class AppModule {}
