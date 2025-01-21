import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @ApiHideProperty() // ซ่อน `sub` จาก Swagger
  @IsOptional()
  sub?: string;
}

export class BaseQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Search text (comma-separated for multiple values)', required: false })
  textSearch?: string='';

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Fields to search in (comma-separated for multiple fields)', required: false,example:'id,name' })
  searchField?: string='';

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'Page number', required: false, type: String,example:'1' })
  page?: string='1';

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: String,
    example:'10'
  })
  pageSize?: string='10';

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Field to sort by', required: false,example:'id' })
  sortField?: string = 'id';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  @ApiProperty({
    description: 'Sort order',
    required: false,
    enum: ['asc', 'desc'],
    example:'desc'
  })
  sortOrder?: 'asc' | 'desc' = 'desc';
}
