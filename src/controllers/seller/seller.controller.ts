import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { SellerService } from 'src/services/seller/seller.service';

interface SellerData {
  name: string;
  age: number;
  email: string;
  phone: number;
  rating: number;
  location: string;
}

interface UpdateData {
  name?: string;
  age?: number;
  email?: string;
  phone?: number;
  rating?: number;
  location?: string;
}

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create/index')
  async createSchema() {
    return await this.sellerService.createSellerIndexIfNotExists();
  }

  @Post('insert/seller')
  async insertSeller(@Body() sellersData: SellerData) {
    const result = await this.sellerService.createSeller(sellersData);
    return {
      message: 'Seller registered successfully',
      data: result,
    };
  }

  @Put('update/:id')
  async sellerUpdate(@Param('id') sellerId: string, @Body() updatedData: UpdateData) {
    const result = await this.sellerService.updateSeller(sellerId, updatedData);
    return {
      message: 'Seller updated successfully',
      data: result,
    };
  }

  @Post('delete/:id')
  async deleteSeller(@Param('id') id: string) {
    const result = await this.sellerService.deleteSeller(id);
    return {
      message: 'Seller and related data deleted successfully',
      data: result,
    };
  }
}
