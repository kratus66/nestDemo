import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { productModule } from './Products/products.module';
import { authModule } from './Auth/authModule';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [UserModule, productModule,authModule ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}
