# DB relationships

#### 1 to 1

- 1 person can only have 1 passport
  - ex: so, use embedded documents

#### 1 to many

- 1 to many relationship can be implemented in 3 patterns

  - use document references
  - use embbedded documents
  - use subset pattern (show latest 10 recent reviews)

### Secinaries

- 1 person can have many bank transactions but all those transactions belong to that same 1 person
  - ex: so, use document references
- 1 person has many address but we know the upper bound.
  - ex: so, use embedded documents

#### many to many

- Example lets take two schema

```bash
book
 -> title
 -> date
 -> total_pages

authors
 -> name
 -> age
 -> phone_number
```

- In SQL to achieve many to many relationship, we use a 3rd table known as `pivot-table` or `join-table` to only store the references.

```bash
book_author
 -> bookId
 -> authorId
```

- But in NoSQL we don't use a 3rd table, instead we store refernces Id as arrays

- we can store `ids` anywhere but choose Books bcz authors will be limited
- we know the `upper-band`
- So now we can update Book collection

```bash
book
 -> title
 -> date
 -> total_pages
 -> authord_id: [objId1,objId2]
```

---

- But in case of ecommerce app we can think of these entities
  - Products
  - Customers
  - Orders

```bash

order
    -> productId: Obj("Id")
    -> customertId: Obj("Id")
```

- Since mongoDB allows embedding. We can try this approach

```bash
Customers
    -> name
    -> age
    -> orders: ["product_id1","product_id2"]
```

- But the problem in this approach, What if product info changes like, name price ?
- So its better to store them as embeddings

```bash
customers
 -> name
 -> age
 -> orders:[
    {
        product_id:("id"),
        name:"Hary potter",
        price:750.00,
    }
 ]
```

- So that we can know at the time of purchase, what was price, name ,etc ?
