import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SongsModule,
  ],
})
export class AppModule {}
