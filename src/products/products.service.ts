import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  create_product,
  fetch_products_by_ids,
  get_products,
  show_product,
} from 'src/shared/config/cmd-patterns/products.patterns';
import {
  ProductEntity,
  createProductInput,
} from 'src/shared/types/products.types';
import { redis, redisProductsKey } from '../utils/redis';

@Injectable()
export class ProductsService {
  constructor(@Inject('REDIS') private redis: ClientProxy) {}

  async getProducts() {
    return await new Promise((resolve, reject) => {
      // get products through cache.
      redis.get(redisProductsKey, (err, products) => {
        // if products don't persist, retrieve them, and store in redis.
        if (!products) {
          console.log('noproducts');
          this.redis.send<ProductEntity[]>({ cmd: get_products }, []).subscribe(
            (products) => {
              redis.set(
                redisProductsKey,
                JSON.stringify(products),
                'EX',
                60 * 60 * 30, // 30 mins until expiration
              );
              return resolve(products);
            },
            (error) => reject(error),
          );
        }
        // return the parsed products from cache.
        return resolve(JSON.parse(products));
      });
    });
  }

  async getProduct(id: string) {
    return await this.redis.send({ cmd: show_product }, id);
  }

  async fetchProductsByIds(ids: Array<string>) {
    return await this.redis.send({ cmd: fetch_products_by_ids }, ids);
  }
  async addProduct(createProductInput: createProductInput) {
    return new Promise((resolve, reject) => {
      this.redis
        .send<createProductInput>(
          { cmd: create_product },
          /* {
            ...data,
            user_id: id,
          },*/
          createProductInput,
        )
        .subscribe(
          (product) => {
            redis.del(redisProductsKey);
            return resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
}