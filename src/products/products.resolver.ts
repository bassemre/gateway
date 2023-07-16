/*import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ProductDTO, UserDTO, config } from '@commerce/shared';

import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../middlewares/auth.guard';
import { CreateProduct } from './create-product.validation';
import { ProductService } from './product.service';
import { SellerGuard } from '../middlewares/seller.guard';
import { UserDataLoader } from '../loaders/user.loader';
*/
import {
  Query,
  Resolver,
  Context,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import {
  ProductEntity,
  createProductInput,
} from 'src/shared/types/products.types';
@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly productsService: ProductsService, // private readonly usersDataLoader: UserDataLoader,
  ) {}
  /* @ResolveProperty('user', () => UserDTO)
  async user(@Parent() product: ProductDTO): Promise<UserDTO> {
    return this.usersDataLoader.load(product.user_id);
  }*/
  @Query((returns) => [ProductEntity], {
    name: 'products',
    description: 'get all products',
  })
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Query((returns) => ProductEntity, {
    name: 'product',
    description: 'show product',
  })
  async getProduct(@Args('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Mutation((returns) => ProductEntity, { name: 'createProduct' })
  // @UseGuards(new AuthGuard(), new SellerGuard())
  async addProduct(
    @Args('createProductInput') createProductInput: createProductInput,
    // @Context('user') user: any,
  ) {
    return this.productsService.addProduct(createProductInput /*user.id*/);
  }
  /*
  @Mutation()
  @UseGuards(new AuthGuard(), new SellerGuard())
  async updateProduct(
    @Args('data') data: CreateProduct,
    @Context('user') user: any,
    @Args('id') id: string,
  ) {
    return this.productService.update(data, id, user.id);
  }
  @Mutation()
  @UseGuards(new AuthGuard(), new SellerGuard())
  async deleteProduct(@Context('user') user: any, @Args('id') id: string) {
    return this.productService.destroy(id, user.id);
  }*/
}
