
# 📘 Elasticsearch cURL Cheat Sheet

This file contains commonly used cURL commands to interact with Elasticsearch.

---

## 🟢 Cluster-Level Commands

```bash
# Cluster health status
curl -X GET http://localhost:9200/_cluster/health?pretty

# Cluster stats
curl -X GET http://localhost:9200/_cluster/stats?pretty

# Cluster settings
curl -X GET http://localhost:9200/_cluster/settings?pretty

# Manual shard reroute
curl -X POST http://localhost:9200/_cluster/reroute
```

---

## 🧠 Node-Level Commands

```bash
# Node information
curl -X GET http://localhost:9200/_nodes?pretty

# Node stats
curl -X GET http://localhost:9200/_nodes/stats?pretty

# Node hot threads
curl -X GET http://localhost:9200/_nodes/hot_threads?pretty
```

---

## 📂 Index-Level Commands

```bash
# Create index
curl -X PUT http://localhost:9200/myindex

# Get index info
curl -X GET http://localhost:9200/myindex?pretty

# Delete index
curl -X DELETE http://localhost:9200/myindex

# List all indices
curl -X GET http://localhost:9200/_cat/indices?v
```

---

## 📄 Document-Level Commands

```bash
# Insert document
curl -X POST http://localhost:9200/myindex/_doc/1 -H "Content-Type: application/json" -d '{"name":"Suraj"}'

# Get document by ID
curl -X GET http://localhost:9200/myindex/_doc/1?pretty

# Update document by ID
curl -X POST http://localhost:9200/myindex/_update/1 -H "Content-Type: application/json" -d '{"doc":{"name":"Updated"}}'

# Delete document by ID
curl -X DELETE http://localhost:9200/myindex/_doc/1
```

---

## 🔍 Search Queries

```bash
# Search all documents
curl -X GET http://localhost:9200/myindex/_search?pretty

# Match query
curl -X GET "http://localhost:9200/myindex/_search" -H "Content-Type: application/json" -d '{
  "query": {
    "match": {
      "name": "suraj"
    }
  }
}'
```

---

## 🔁 Alias & Templates

```bash
# Add alias
curl -X POST http://localhost:9200/_aliases -H "Content-Type: application/json" -d '{
  "actions": [
    { "add": { "index": "myindex", "alias": "myalias" } }
  ]
}'

# Add index template
curl -X PUT http://localhost:9200/_template/template_1 -H "Content-Type: application/json" -d '{...}'
```

---

## 🧾 Cat API (Monitoring)

```bash
# List all indices
curl -X GET http://localhost:9200/_cat/indices?v

# Shards information
curl -X GET http://localhost:9200/_cat/shards?v

# Node overview
curl -X GET http://localhost:9200/_cat/nodes?v

# Thread pool info
curl -X GET http://localhost:9200/_cat/thread_pool?v
```

---

## ✅ Cluster Status Color Code

| Status  | Meaning |
|---------|---------|
| green   | All primary and replica shards are active |
| yellow  | All primary active, but some replicas missing |
| red     | One or more primary shards not active (critical) |
