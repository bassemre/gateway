import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import {
  ProductEntity,
  createProductInput,
} from 'src/shared/types/products.types';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorator';
import { UserDTO } from 'src/users/dtos/user.dto';
import { SellerGuard } from 'src/shared/guards/seller.guard';
//import { UserDataLoader } from 'src/loaders/user.loader';
@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly productsService: ProductsService,
  ) /* private readonly usersDataLoader: UserDataLoader*/ {}
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
  @UseGuards(JwtAuthGuard, new SellerGuard())
  async addProduct(
    @Args('createProductInput') createProductInput: createProductInput,
    @CurrentUser() user: UserDTO,
  ) {
    return this.productsService.addProduct(createProductInput, user.id);
  }

  @Mutation((returns) => ProductEntity, { name: 'updateProduct' })
  @UseGuards(JwtAuthGuard, new SellerGuard())
  async updateProduct(
    @Args('updateProductInput') UpdateProductInput: createProductInput,
    @CurrentUser() user: UserDTO,
    @Args('id') id: string,
  ): Promise<ProductEntity> {
    return this.productsService.updateProduct(UpdateProductInput, id, user.id);
  }

  @Mutation((returns) => ProductEntity, {
    name: 'deleteProduct',
    description: 'delete product',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard, new SellerGuard())
  async deleteProduct(@CurrentUser() user: UserDTO, @Args('id') id: string) {
    return this.productsService.deleteProduct(id, user.id);
  }
}
