import { IsArray, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNotEmpty()
  readonly artists: string[];

  @IsNotEmpty()
  readonly releaseYear: number;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string;
}
