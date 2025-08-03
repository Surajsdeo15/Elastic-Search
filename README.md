# Elastic Search NestJS Project

A NestJS-based server-side application with Elasticsearch integration for managing products, sellers, and locations.

---

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (for running Elasticsearch locally)
- **Git** (for cloning the repository)

---

## Project Structure

```
elastic/
├── src/
│   ├── controllers/
│   │   ├── product/
│   │   ├── seller/
│   │   └── location/
│   ├── services/
│   │   ├── product/
│   │   ├── seller/
│   │   └── location/
│   └── ...
├── docker/
│   └── elasticsearch/
│       └── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Elastic_Search/elastic
```

### 2. Install Dependencies

```bash
npm install
```

---

## Running Elasticsearch with Docker Compose

The project uses Elasticsearch as its database. You can run it locally using Docker Compose.

### 1. Navigate to the Docker Compose Directory

```bash
cd docker/elasticsearch
```

### 2. Start Elasticsearch

```bash
docker-compose up -d
```

- This will start Elasticsearch on `localhost:9200`.
- You can check the status with `docker ps`.

### 3. Stop Elasticsearch

```bash
docker-compose down
```

---

## Environment Variables

If needed, create a `.env` file in the root directory and set your Elasticsearch connection string:

```
ELASTICSEARCH_NODE=http://localhost:9200
```

---

## Running the Project

From the `elastic` directory:

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run start:prod
```

### Watch Mode

```bash
npm run start:dev
```

---

## API Endpoints

The project exposes RESTful endpoints for managing products, sellers, and locations.

### Example Endpoints

- **Create Product Index:** `POST /product/create/index`  done
- **Insert Product:** `POST /product/insert/product` done
- **Bulk Insert Products:** `POST /product/bulk/insert` pending
- **Update Product:** `PUT /product/update/:id` done
- **Bulk Update Products:** `POST /product/bulk/update` pending
- **Delete Product:** `POST /product/delete/:sellerId/:productId` done
- **Bulk Delete Products:** `POST /product/bulk/delete` pending
- **Insert Seller:** `POST /seller/insert/seller` done
- **Update Seller:** `PUT /seller/update/:id` done
- **Delete Seller:** `POST /seller/delete/:id` done
- **Insert Location:** `POST /location/insert/location`done
- **Update Location:** `PUT /location/update/:id` done

> Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API.

---

## Running Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Troubleshooting

- **Elasticsearch not running?**  
  Make sure Docker is running and you have started the containers with `docker-compose up -d`.
- **Port conflicts?**  
  By default, Elasticsearch runs on `localhost:9200`. Make sure this port is free or update the `docker-compose.yml` and `.env` accordingly.

---

## Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Docker Documentation](https://docs.docker.com/)

---

## License

This project is [MIT licensed](LICENSE).

---

## Author

- [Suraj Singh Deo]
