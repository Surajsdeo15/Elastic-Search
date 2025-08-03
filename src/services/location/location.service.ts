// src/services/location/location.service.ts
import { Injectable } from '@nestjs/common';
import { ElasticstackService, ElasticIndexConfigs } from '@app/elasticstack';

@Injectable()
export class LocationService {
  constructor(private readonly elasticstackService: ElasticstackService) {}

  // Create index if not exists using ElasticstackService
  async createLocationIndexIfNotExists() {
    const { index, mappings } = ElasticIndexConfigs.locations;
    return await this.elasticstackService.createIndexIfNotExists(index, mappings);
  }

  // Update location document by ID
  async locationUpdate(locationId: string, updateData: any) {
    const { index } = ElasticIndexConfigs.locations;
    return await this.elasticstackService.updateDocumentById(index, locationId, updateData);
  }
}
