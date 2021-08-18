import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
})
export class OrdersModule {}
