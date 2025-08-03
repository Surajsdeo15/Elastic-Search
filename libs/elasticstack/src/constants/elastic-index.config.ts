export const ElasticIndexConfigs = {
  sellers: {
    index: 'sellers',
    mappings: {
      properties: {
        name: { type: 'text' },
        phone: { type: 'keyword' },
        age: { type: 'integer' },
        email: { type: 'keyword' },
        location: { type: 'text' },
        createdAt: { type: 'date' },
      },
    },
  },
  products: {
    index: 'products',
    mappings: {
      properties: {
        name: { type: 'text' },
        type: { type: 'text' },
        rating: { type: 'float' },
        price: { type: 'float' },
        sellerId: { type: 'keyword' },        // reference to seller
        createdAt: { type: 'date' },

      },
    },
  },
  locations:{
    index:'locations',
    mappings: {
              properties: {
                productId: { type: 'keyword' }, // Reference to product
                sellerId: { type: 'keyword' },  // Reference to seller
                location: { type: 'text' }, // Location as string
                createdAt: { type: 'date' },
              },
            },
  }

};