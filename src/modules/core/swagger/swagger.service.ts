import { Injectable } from '@nestjs/common';

@Injectable()
export class SwaggerService {
  create() {
    return 'This action adds a new swagger';
  }

  findAll() {
    return `This action returns all swagger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} swagger`;
  }

  update(id: number) {
    return `This action updates a #${id} swagger`;
  }

  remove(id: number) {
    return `This action removes a #${id} swagger`;
  }
}
