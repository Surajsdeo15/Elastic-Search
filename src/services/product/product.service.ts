import { Injectable } from '@nestjs/common';
import { ElasticstackService } from '@app/elasticstack';
import { ElasticIndexConfigs } from '@app/elasticstack'; // adjust path as needed

@Injectable()
export class ProductService {
  constructor(private readonly elasticstackService: ElasticstackService) {}

  async createProductIndexIfNotExists() {
    const { index, mappings } = ElasticIndexConfigs.products;
    return await this.elasticstackService.createIndexIfNotExists(index, mappings);
  }

  async insertProduct(productData: any) {
    const { index: productIndex } = ElasticIndexConfigs.products;
    const { index: locationIndex } = ElasticIndexConfigs.locations;

    const document = {
      ...productData,
      createdAt: new Date(),
    };

    const result = await this.elasticstackService.insertDocument(productIndex, document);

    if (productData.location && productData.sellerId) {
      await this.elasticstackService.insertDocument(locationIndex, {
        productId: result._id,
        sellerId: productData.sellerId,
        location: productData.location,
        createdAt: new Date(),
      });
    }

    return result;
  }

  async productUpdate(productId: string, updateData: any) {
    const { index } = ElasticIndexConfigs.products;
    return await this.elasticstackService.updateDocumentById(index, productId, updateData);
  }

  async deleteProduct(sellerId: string, productId: string) {
    const { index: productIndex } = ElasticIndexConfigs.products;
    const { index: locationIndex } = ElasticIndexConfigs.locations;

    const productDeleteResult = await this.elasticstackService.deleteByQuery(
      productIndex,
      productId,
      
    );

    const locationDeleteResult = await this.elasticstackService.deleteByQuery(
      locationIndex,
      productId,
    );

    return {
      productDeleteResult,
      locationDeleteResult,
    };
  }


  
  async bulkInsertProducts(products: any[]) {
    const { index } = ElasticIndexConfigs.products;
    const body = products.flatMap((doc) => [
      { index: { _index: index } },
      { ...doc, createdAt: new Date() },
    ]);

    return await this.elasticstackService.bulk(body);
  }

  
  async bulkUpdateProducts(updates: { id: string; updateData: any }[]) {
       const { index } = ElasticIndexConfigs.products;
    const body = updates.flatMap((item) => [
      { update: { _index: index, _id: item.id } },
      { doc: item.updateData },
    ]);

    return await this.elasticstackService.bulk(body);
  }

 
  async bulkDeleteProducts(ids: string[]) {
       const { index } = ElasticIndexConfigs.products;
    const body = ids.map((id) => ({
      delete: { _index: index, _id: id },
    }));

    return await this.elasticstackService.bulk(body);
  }

}
