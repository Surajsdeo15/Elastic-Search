# Official Elasticsearch Query DSL Core Types (23 Examples)

This guide covers the 23 most recognized Elasticsearch Query DSL types, organized by category. Each section includes a short description and a minimal example.

---

## 🔹 Full-Text Queries

### 1. match
Finds documents that match a text, analyzed as needed.
```json
{
  "query": {
    "match": { "title": "Elasticsearch" }
  }
}
```

### 2. match_phrase
Matches exact phrases in a field.
```json
{
  "query": {
    "match_phrase": { "title": "Elasticsearch tutorial" }
  }
}
```

### 3. match_phrase_prefix
Matches phrases with a prefix (good for autocomplete).
```json
{
  "query": {
    "match_phrase_prefix": { "title": "elastic tut" }
  }
}
```

### 4. multi_match
Searches multiple fields at once.
```json
{
  "query": {
    "multi_match": {
      "query": "Elasticsearch",
      "fields": ["title", "body"]
    }
  }
}
```

### 5. common_terms (deprecated)
Used to handle stopwords efficiently (use match now).
```json
{
  "query": {
    "common": {
      "body": {
        "query": "the quick brown fox"
      }
    }
  }
}
```

### 6. query_string
Supports advanced query syntax (AND, OR, wildcards, etc.).
```json
{
  "query": {
    "query_string": {
      "query": "title:Elasticsearch AND body:tutorial"
    }
  }
}
```

### 7. simple_query_string
Like query_string but safer (no exceptions for invalid syntax).
```json
{
  "query": {
    "simple_query_string": {
      "query": "Elasticsearch +tutorial"
    }
  }
}
```

---

## 🔹 Term-Level Queries

### 8. term
Finds documents with an exact value (not analyzed).
```json
{
  "query": {
    "term": { "status": "active" }
  }
}
```

### 9. terms
Finds documents with any of the exact values.
```json
{
  "query": {
    "terms": { "status": ["active", "pending"] }
  }
}
```

### 10. range
Finds documents within a range (numbers, dates).
```json
{
  "query": {
    "range": {
      "age": { "gte": 18, "lte": 30 }
    }
  }
}
```

### 11. exists
Finds documents where a field exists.
```json
{
  "query": {
    "exists": { "field": "user" }
  }
}
```

### 12. prefix
Finds documents where a field starts with a prefix.
```json
{
  "query": {
    "prefix": { "user": "jo" }
  }
}
```

### 13. wildcard
Finds documents using wildcard patterns.
```json
{
  "query": {
    "wildcard": { "user": "jo*" }
  }
}
```

### 14. regexp
Finds documents using regular expressions.
```json
{
  "query": {
    "regexp": { "user": "j.*doe" }
  }
}
```

### 15. fuzzy
Finds documents with terms similar to the search term (typo-tolerant).
```json
{
  "query": {
    "fuzzy": { "user": "jons" }
  }
}
```

### 16. ids
Finds documents by their IDs.
```json
{
  "query": {
    "ids": { "values": ["1", "4", "100"] }
  }
}
```

---

## 🔹 Compound Queries

### 17. bool
Combine multiple queries with must, should, must_not, filter.
```json
{
  "query": {
    "bool": {
      "must": [ { "match": { "title": "Elasticsearch" } } ],
      "filter": [ { "term": { "status": "active" } } ]
    }
  }
}
```

### 18. dis_max
Combine queries and use the highest scoring result.
```json
{
  "query": {
    "dis_max": {
      "queries": [
        { "term": { "title": "Elasticsearch" } },
        { "term": { "body": "Elasticsearch" } }
      ]
    }
  }
}
```

### 19. constant_score
Wraps a filter and gives all matching docs the same score.
```json
{
  "query": {
    "constant_score": {
      "filter": { "term": { "status": "active" } },
      "boost": 2.0
    }
  }
}
```

### 20. function_score
Modify scores of documents using functions.
```json
{
  "query": {
    "function_score": {
      "query": { "match_all": {} },
      "random_score": {}
    }
  }
}
```

### 21. boosting
Boost relevant docs, demote others.
```json
{
  "query": {
    "boosting": {
      "positive": { "term": { "tag": "tech" } },
      "negative": { "term": { "tag": "spam" } },
      "negative_boost": 0.2
    }
  }
}
```

---

## 🔹 Joining Queries

### 22. nested
Query nested objects within documents.
```json
{
  "query": {
    "nested": {
      "path": "comments",
      "query": {
        "match": { "comments.author": "John" }
      }
    }
  }
}
```

### 23. has_child / has_parent
Query parent-child relationships.

#### has_child
```json
{
  "query": {
    "has_child": {
      "type": "comment",
      "query": { "match": { "text": "great" } }
    }
  }
}
```

#### has_parent
```json
{
  "query": {
    "has_parent": {
      "parent_type": "blog",
      "query": { "term": { "tag": "tech" } }
    }
  }
}
```

---

## 🧠 Bonus (Advanced/Extra)

### script
Use custom scripts for advanced queries.
```json
{
  "query": {
    "script": {
      "script": {
        "source": "doc['age'].value > params.min_age",
        "params": { "min_age": 21 }
      }
    }
  }
}
```

### percolate
Register queries and match documents to them.
```json
{
  "query": {
    "percolate": {
      "field": "query",
      "document": { "message": "A new product launch" }
    }
  }
}
```

### more_like_this
Find documents similar to a given text or document.
```json
{
  "query": {
    "more_like_this": {
      "fields": ["title", "body"],
      "like": "Elasticsearch tutorial"
    }
  }
}
```

### span queries (span_near, span_term, etc.)
Find documents with terms in specific positions or proximity.
```json
{
  "query": {
    "span_near": {
      "clauses": [
        { "span_term": { "text": "quick" } },
        { "span_term": { "text": "brown" } }
      ],
      "slop": 1,
      "in_order": true
    }
  }
}
```

### intervals
Advanced text matching with intervals.
```json
{
  "query": {
    "intervals": {
      "text": {
        "all_of": {
          "ordered": true,
          "intervals": [
            { "match": { "query": "quick" } },
            { "match": { "query": "brown" } }
          ]
        }
      }
    }
  }
}
```

### geo queries (geo_distance, etc.)
Find documents by geographic location.
```json
{
  "query": {
    "geo_distance": {
      "distance": "12km",
      "location": { "lat": 40.7, "lon": -74.0 }
    }
  }
}
```