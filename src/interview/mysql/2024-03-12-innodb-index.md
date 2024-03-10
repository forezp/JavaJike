---
lang: zh-CN
title: Inndb存储引擎支持哪些索引
headerDepth: 0
order: 13
icon: biji
description: Inndb存储引擎支持哪些索引
---



## 什么是数据库索引

数据库索引是一种数据结构，用于加速对数据库表中数据的检索。类似于书籍的目录，可以帮助数据库管理系统快速地定位到包含特定值的行，从而提高查询性能。

数据库索引的主要作用包括以下内容：

1. 提高查询性能：索引可以加速数据检索过程，使得查询操作更快速高效。
2. 加速数据排序：如果查询需要对检索出的数据进行排序，索引可以加速排序过程。
3. 提高唯一性约束：唯一索引可以确保某些列的值是唯一的，防止插入重复的数据。



## innodb存储引擎支持哪些索引

InnoDB存储引擎支持多种类型的索引，以下是InnoDB中常见的索引类型：

1. **主键索引（Primary Key）**：
   - 每个InnoDB表都应该有一个主键索引，它唯一标识表中的每一行数据。主键索引可以是单列也可以是多列。
2. **唯一索引（Unique Index）**：
   - 唯一索引确保该列中的所有的值是唯一的，允许空值。
3. **普通索引（Normal Index）**：
   - 普通索引，用于加速数据检索。普通索引允许有重复的值和空值。
4. **全文索引（Full-Text Index）**：
   - InnoDB从MySQL 5.6版本开始支持全文索引。全文索引可以加快对文本类型（如VARCHAR或TEXT）列的全文搜索。
5. **空间索引（Spatial Index）**：
   - 用于地理空间数据类型的索引，支持地理空间数据的查询和分析。
6. **前缀索引（Prefix Index）**：
   - 对索引的一部分进行索引，而不是对整个列进行索引。可以通过指定索引长度来创建前缀索引，以减少索引的大小和提高性能。
7. **联合索引（Covering Index）**：
   - 包含了查询中涉及的所有列，可以直接满足查询的需求，而无需进一步访问表。这可以提高查询性能，尤其是对于范围查询。
8. **JSON索引**：
   - 自MySQL 5.7.8版本起，InnoDB开始支持对JSON类型列的索引。这允许对JSON文档的特定字段进行索引，以便支持JSON数据的快速查询和过滤。



## 创建索引示例

创建一个表结构，表结构中包含产品名称、价格、描述和地理位置字段，并为不同的字段添加适当的索引。

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category_id INT,
    price DECIMAL(10,2),
    description TEXT,
    location POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX name_unique_index (name),
    INDEX category_index (category_id),
    INDEX price_index (price),
    FULLTEXT INDEX description_index (description),
    SPATIAL INDEX location_index (location),
    INDEX created_at_index (created_at),
    INDEX updated_at_index (updated_at),
    INDEX name_price_index (name, price)
);
```

在这个扩展示例中：

- `id`列作为主键，它是自增的。
- `name`列存储产品名称，并创建了一个唯一索引，确保产品名称是唯一的。
- `category_id`列存储产品类别的ID，并创建了一个普通索引。
- `price`列存储产品价格，并创建了一个普通索引。
- `description`列存储产品描述，并创建了一个全文索引，以便进行全文搜索。
- `location`列存储产品的地理位置坐标，并创建了一个空间索引，以支持地理空间查询。
- `created_at`和`updated_at`列分别存储产品的创建时间和更新时间，并分别创建了普通索引。
- `name_price_index`是一个联合索引，组合了产品名称和价格两列，以支持按名称和价格进行查询。
