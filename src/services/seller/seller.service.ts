import { Injectable } from '@nestjs/common';
import { ElasticIndexConfigs, ElasticstackService } from '@app/elasticstack';

@Injectable()
export class SellerService {
  constructor(private readonly elasticstackService: ElasticstackService) {}

  async createSellerIndexIfNotExists() {
    const { index, mappings } = ElasticIndexConfigs.sellers;
    return this.elasticstackService.createIndexIfNotExists(index, mappings);
  }

  async createSeller(sellersData: any) {
    const { index } = ElasticIndexConfigs.sellers;

    const document = {
      ...sellersData,
      createdAt: new Date(),
    };

    const result = await this.elasticstackService.insertDocument(index, document);

    return {
      message: 'Seller inserted successfully',
      result: result.result,
      id: result._id,
    };
  }

  async updateSeller(sellerId: string, updateData: any) {
    const { index } = ElasticIndexConfigs.sellers;

    const result = await this.elasticstackService.updateDocumentById(index, sellerId, updateData);

    return {
      message: 'Seller updated successfully',
      result,
    };
  }

  async deleteSeller(sellerId: string) {
    const { index: sellerIndex } = ElasticIndexConfigs.sellers;
    const { index: productIndex } = ElasticIndexConfigs.products;
    const { index: locationIndex } = ElasticIndexConfigs.locations;

    const sellerDeleteResult = await this.elasticstackService.deleteByQuery(sellerIndex, sellerId);

    const productDeleteResult = await this.elasticstackService.deleteByQuery(productIndex, 
    sellerId ,
    );

    const locationDeleteResult = await this.elasticstackService.deleteByQuery(locationIndex, sellerId);

    return {
      message: 'Seller and related data deleted successfully',
      sellerDeleteResult,
      productDeleteResult,
      locationDeleteResult,
    };
  }
}
