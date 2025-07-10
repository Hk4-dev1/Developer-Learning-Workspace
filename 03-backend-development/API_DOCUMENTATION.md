# E-commerce Backend API Documentation

## Overview
This is a Django REST Framework-based e-commerce backend API that provides endpoints for managing products, categories, brands, and reviews.

## Base URL
```
http://127.0.0.1:8003/api/
```

## Authentication
Currently, the API allows anonymous access for development purposes. Authentication will be added in future iterations.

## API Endpoints

### 1. API Overview
- **GET** `/api/`
- **Description**: Returns an overview of all available endpoints
- **Response**: JSON object with endpoint descriptions

### 2. Categories

#### List/Create Categories
- **GET** `/api/categories/`
- **POST** `/api/categories/`
- **Description**: List all categories or create a new category
- **Query Parameters (GET)**:
  - `search`: Search categories by name
- **Request Body (POST)**:
  ```json
  {
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "image": null
  }
  ```

#### Category Detail
- **GET** `/api/categories/{id}/`
- **PUT** `/api/categories/{id}/`
- **PATCH** `/api/categories/{id}/`
- **DELETE** `/api/categories/{id}/`
- **Description**: Retrieve, update, or delete a specific category

### 3. Brands

#### List/Create Brands
- **GET** `/api/brands/`
- **POST** `/api/brands/`
- **Description**: List all brands or create a new brand
- **Query Parameters (GET)**:
  - `search`: Search brands by name
- **Request Body (POST)**:
  ```json
  {
    "name": "Apple",
    "description": "Technology and electronics",
    "logo": null,
    "website": "https://apple.com"
  }
  ```

#### Brand Detail
- **GET** `/api/brands/{id}/`
- **PUT** `/api/brands/{id}/`
- **PATCH** `/api/brands/{id}/`
- **DELETE** `/api/brands/{id}/`
- **Description**: Retrieve, update, or delete a specific brand

### 4. Products

#### List/Create Products
- **GET** `/api/products/`
- **POST** `/api/products/`
- **Description**: List all products or create a new product
- **Query Parameters (GET)**:
  - `search`: Search products by name or description
  - `category`: Filter by category ID
  - `brand`: Filter by brand ID
  - `in_stock`: Filter by stock status (true/false)
  - `ordering`: Order results (e.g., 'price', '-price', 'name', '-created_at')
- **Request Body (POST)**:
  ```json
  {
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": "999.99",
    "original_price": "1099.99",
    "category": "category-uuid",
    "brand": "brand-uuid",
    "sku": "IPH15PRO001",
    "stock_quantity": 50,
    "in_stock": true,
    "tags": ["smartphone", "apple", "premium"],
    "specifications": {
      "storage": "256GB",
      "color": "Natural Titanium",
      "display": "6.1-inch Super Retina XDR"
    }
  }
  ```

#### Product Detail
- **GET** `/api/products/{id}/`
- **PUT** `/api/products/{id}/`
- **PATCH** `/api/products/{id}/`
- **DELETE** `/api/products/{id}/`
- **Description**: Retrieve, update, or delete a specific product

#### Product Reviews
- **GET** `/api/products/{product_id}/reviews/`
- **POST** `/api/products/{product_id}/reviews/`
- **Description**: List reviews for a product or create a new review
- **Request Body (POST)**:
  ```json
  {
    "reviewer_name": "John Doe",
    "reviewer_email": "john@example.com",
    "rating": 5,
    "comment": "Excellent product!",
    "verified_purchase": true
  }
  ```

### 5. Advanced Search
- **GET** `/api/search/`
- **Description**: Advanced product search with multiple filters
- **Query Parameters**:
  - `q`: Search query (searches name, description, and tags)
  - `category`: Category ID filter
  - `brand`: Brand ID filter
  - `min_price`: Minimum price filter
  - `max_price`: Maximum price filter
  - `min_rating`: Minimum rating filter
  - `in_stock`: Stock status filter (true/false)
  - `page`: Page number for pagination
  - `page_size`: Number of results per page (default: 20)

**Example**:
```
GET /api/search/?q=smartphone&min_price=500&max_price=1000&category=electronics-uuid
```

## 🌐 Browser Examples

You can test these endpoints directly in your browser:

### API Overview
- **URL**: `http://127.0.0.1:8003/api/`
- **Browser**: Opens a nice API overview with all available endpoints

### View All Products
- **URL**: `http://127.0.0.1:8003/api/products/`
- **Browser**: Shows paginated list of all products in JSON format

### View All Categories
- **URL**: `http://127.0.0.1:8003/api/categories/`
- **Browser**: Shows all product categories

### View All Brands
- **URL**: `http://127.0.0.1:8003/api/brands/`
- **Browser**: Shows all brands

### Search for Products
- **URL**: `http://127.0.0.1:8003/api/search/?q=phone`
- **Browser**: Search for products containing "phone"

### Filter Products by Price
- **URL**: `http://127.0.0.1:8003/api/products/?min_price=100&max_price=500`
- **Browser**: Shows products between $100-$500

### Search Electronics Category
- **URL**: `http://127.0.0.1:8003/api/categories/?search=electronics`
- **Browser**: Finds categories matching "electronics"

### Admin Interface
- **URL**: `http://127.0.0.1:8003/admin/`
- **Browser**: Django admin panel for data management

## Response Format

### Success Response
All successful responses return JSON data with appropriate HTTP status codes:
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE

### Pagination
List endpoints return paginated results:
```json
{
  "count": 25,
  "next": "http://127.0.0.1:8003/api/products/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Response
Error responses include appropriate HTTP status codes and error details:
```json
{
  "error": "Error message",
  "details": "Additional error details if available"
}
```

## Data Models

### Category
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "image": "url or null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Brand
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "logo": "url or null",
  "website": "url",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Product
```json
{
  "id": "uuid",
  "name": "string",
  "description": "text",
  "price": "decimal",
  "original_price": "decimal or null",
  "category": "category_name",
  "subcategory": "string",
  "brand": "brand_name",
  "sku": "string",
  "in_stock": "boolean",
  "stock_quantity": "integer",
  "rating": "decimal",
  "review_count": "integer",
  "tags": ["array", "of", "strings"],
  "specifications": {"key": "value"},
  "thumbnail": "url or null",
  "is_on_sale": "boolean or null",
  "discount_percentage": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Review
```json
{
  "id": "uuid",
  "product": "product_uuid",
  "reviewer_name": "string",
  "reviewer_email": "email",
  "rating": "integer (1-5)",
  "comment": "text",
  "verified_purchase": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Example Usage

### Create a Category
```bash
curl -X POST http://127.0.0.1:8003/api/categories/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics", "description": "Electronic devices"}'
```

### Search Products
```bash
curl "http://127.0.0.1:8003/api/search/?q=smartphone&min_price=500"
```

### Get Product Details
```bash
curl http://127.0.0.1:8003/api/products/product-uuid/
```

## Admin Interface
Access the Django admin interface at: `http://127.0.0.1:8003/admin/`

Default superuser credentials:
- Username: admin
- Password: admin123

## Notes
- All UUIDs are in UUID4 format
- Timestamps are in ISO 8601 format (UTC)
- File uploads (images) are stored in the `/media/` directory
- The API uses SQLite for development (production should use PostgreSQL)
- CORS is configured to allow requests from localhost:3000 and localhost:3001

## Future Enhancements
- Authentication and authorization
- User management
- Order management
- Payment integration
- Advanced filtering and sorting
- File upload endpoints for product images
- Inventory management
- Bulk operations
