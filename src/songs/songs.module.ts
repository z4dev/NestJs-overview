import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { AuthMiddleware } from 'src/common/middleware/auth/auth.middeware';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'songs', method: RequestMethod['GET'] })
      .forRoutes('songs');
  }
}
