/*import { ProductsService } from './products.service';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    console.log(id);
    return await this.productService.getProduct(id);
  }

  @Get()
  async fetchProductsByIds(@Body() ids: Array<string>) {
    return await this.productService.fetchProductsByIds(ids);
  }
  @Post()
  async addProduct(@Body() createProductDto) {
    console.log(createProductDto);
    return await this.productService.addProduct(createProductDto);
  }
  
  @Put()
  async updateProduct({ id, title, description, image, price, user_id }: any) {
    return this.productService.updateProduct(
      id,
      { title, description, image, price },
      user_id,
    );
  }

  @Delete()
  async deleteProduct({ id, user_id }: { id: string; user_id: string }) {
    return this.productService.deleteProducts(id, user_id);
  }
}
*/
