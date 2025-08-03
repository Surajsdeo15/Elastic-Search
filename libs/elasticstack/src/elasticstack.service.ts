import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticstackService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async createIndexIfNotExists(index: string, mappings: Record<string, any>) {
        const exists = await this.elasticsearchService.indices.exists({ index });
        if (exists) {
            console.log(`Index "${index}" already exists.`);
            return 'Index already exists';
        }

        await this.elasticsearchService.indices.create({
            index,
            body: { mappings } as any,
        });

        console.log(`Index "${index}" created successfully.`);
        return 'Index created successfully';
    }

    async insertDocument(index: string, document: Record<string, any>) {
        return await this.elasticsearchService.index({
            index,
            body: document,
        });
    }

    async updateDocumentById(index: string, id: string, updateData: any) {
        return await this.elasticsearchService.update({
            index,
            id,
            body: { doc: updateData },
        });
    }

    async deleteByQuery(index: string, Id: string) {
        return await this.elasticsearchService.deleteByQuery({
            index,
            body: {
                query: {
                    term: { _id: Id },
                },
            } as any,
        });
    }


    async bulk(body: any[]) {
  return await this.elasticsearchService.bulk({ body });
}
}
