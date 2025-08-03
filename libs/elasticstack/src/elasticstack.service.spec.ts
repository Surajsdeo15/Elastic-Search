import { Test, TestingModule } from '@nestjs/testing';
import { ElasticstackService } from './elasticstack.service';

describe('ElasticstackService', () => {
  let service: ElasticstackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticstackService],
    }).compile();

    service = module.get<ElasticstackService>(ElasticstackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
