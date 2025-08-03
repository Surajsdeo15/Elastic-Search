import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';

interface ProductData {
  name: string;
  type: string;
  rating: number;
  price: number;
  sellerId: string;
  location: string;
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create/index')
  async createSchema() {
    return await this.productService.createProductIndexIfNotExists();
  }

  @Post('insert/product')
  async insertProduct(@Body() productData: ProductData) {
    const result = await this.productService.insertProduct(productData);
    return { message: 'Product inserted successfully', data: result };
  }

  @Put('update/:id')
  async productUpdate(@Param('id') productId: string, @Body() updateData: any) {
    const result = await this.productService.productUpdate(productId, updateData);
    return { message: 'Product updated successfully', data: result };
  }

  @Post('delete/:sellerId/:productId')
  async deleteProduct(@Param('sellerId') sellerId: string, @Param('productId') productId: string) {
    const result = await this.productService.deleteProduct(sellerId, productId);
    return { message: 'Product deleted successfully', data: result };
  }

    @Post('bulk/insert')
async bulkInsertProducts(@Body() products: any[]) {
  return await this.productService.bulkInsertProducts(products);
}

@Post('bulk/update')
async bulkUpdateProducts(@Body() updates: { id: string; updateData: any }[]) {
  return await this.productService.bulkUpdateProducts(updates);
}

@Post('bulk/delete')
async bulkDeleteProducts(@Body() ids: string[]) {
  return await this.productService.bulkDeleteProducts(ids);
}
}
