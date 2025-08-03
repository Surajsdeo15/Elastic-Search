// AppModule is the root module of the application
// It brings together all controllers and services, and sets up Elasticsearch
import { Module } from '@nestjs/common';

// Import services (business logic)
// import { ProductService } from './services/product/product.service';
import { SellerService } from './services/seller/seller.service';
// import { LocationService } from './services/location/location.service';

// Import controllers (handle HTTP requests)
// import { ProductController } from './controllers/product/product.controller';
import { SellerController } from './controllers/seller/seller.controller';
// import { LocationController } from './controllers/location/location.controller';

// Import Elasticsearch module for database connection
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticstackModule } from '@app/elasticstack';

@Module({
  // Register Elasticsearch connection
  imports: [ElasticstackModule],
  // Register controllers to handle incoming requests
  controllers: [ SellerController],
  // Register services to provide business logic and data access
  providers: [ SellerService],
})
export class AppModule {}
