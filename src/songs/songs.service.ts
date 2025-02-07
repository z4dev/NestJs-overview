import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs: string[] = ['song1', 'song2', 'song3'];
  findAll(): string {
    return this.songs.join(', ');
  }
  findById(id: number): string {
    return this.songs[id];
  }

  create(CreateSongDto) {
    this.songs.push(CreateSongDto);
    return this.songs.join(', ');
  }

  update(id, Body): string {
    return `This action updates a #${id} song #${Body}`;
  }

  delete(): string {
    return `This action returns a song`;
  }
}
