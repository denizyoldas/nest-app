import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
