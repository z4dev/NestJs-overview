import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { Roles } from 'src/common/decorator/roles/roles.decorator';
// import { ROLES } from 'src/common/constants/roles';
//sasdadsadas
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @Get()
  findAll(): string {
    return this.songsService.findAll();
  }
  @Get(':id')
  findById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return this.songsService.findById(id);
  }

  @Roles('admin')
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updatedSongDto: UpdateSongDto,
  ): string {
    return this.songsService.update(id, updatedSongDto);
  }

  @Delete(':id')
  delete(): string {
    return this.songsService.delete();
  }
}
