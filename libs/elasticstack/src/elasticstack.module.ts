import { Module } from '@nestjs/common';
import { ElasticstackService } from './elasticstack.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [ElasticsearchModule.register({
    node:'http://localhost:9200',

  })],
  providers: [ElasticstackService],
  exports: [ElasticstackService],
})
export class ElasticstackModule {}
