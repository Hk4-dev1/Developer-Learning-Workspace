#!/usr/bin/env python
"""
Sample data script for e-commerce backend.
Run this script to populate the database with sample categories, brands, and products.
"""

import os
import sys
import django

# Add the project directory to the Python path
project_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_path)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from products.models import Category, Brand, Product, Review
from decimal import Decimal
from django.db.models import Avg

def create_sample_data():
    """Create sample data for the e-commerce backend."""
    
    print("Creating sample data...")
    
    # Create Categories
    categories_data = [
        {"name": "Electronics", "description": "Electronic devices and gadgets"},
        {"name": "Clothing", "description": "Fashion and apparel"},
        {"name": "Books", "description": "Books and literature"},
        {"name": "Home & Garden", "description": "Home improvement and garden supplies"},
        {"name": "Sports", "description": "Sports and outdoor equipment"},
    ]
    
    categories = {}
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data["name"],
            defaults={"description": cat_data["description"]}
        )
        categories[cat_data["name"]] = category
        print(f"{'Created' if created else 'Found'} category: {category.name}")
    
    # Create Brands
    brands_data = [
        {"name": "Apple", "description": "Technology and electronics", "website": "https://apple.com"},
        {"name": "Samsung", "description": "Electronics and mobile devices", "website": "https://samsung.com"},
        {"name": "Nike", "description": "Sports apparel and equipment", "website": "https://nike.com"},
        {"name": "Adidas", "description": "Sports and lifestyle brand", "website": "https://adidas.com"},
        {"name": "Amazon Basics", "description": "Essential everyday items", "website": "https://amazon.com"},
        {"name": "Sony", "description": "Electronics and entertainment", "website": "https://sony.com"},
    ]
    
    brands = {}
    for brand_data in brands_data:
        brand, created = Brand.objects.get_or_create(
            name=brand_data["name"],
            defaults={
                "description": brand_data["description"],
                "website": brand_data["website"]
            }
        )
        brands[brand_data["name"]] = brand
        print(f"{'Created' if created else 'Found'} brand: {brand.name}")
    
    # Create Products
    products_data = [
        {
            "name": "iPhone 15 Pro",
            "description": "Latest iPhone with advanced features and titanium design",
            "price": Decimal("999.99"),
            "original_price": Decimal("1099.99"),
            "category": "Electronics",
            "brand": "Apple",
            "stock_quantity": 50,
            "in_stock": True,
            "tags": ["smartphone", "apple", "premium", "titanium"],
            "specifications": {
                "storage": "256GB",
                "color": "Natural Titanium",
                "display": "6.1-inch Super Retina XDR",
                "camera": "48MP Main camera",
                "chip": "A17 Pro"
            }
        },
        {
            "name": "Samsung Galaxy S24",
            "description": "Powerful Android smartphone with excellent camera and AI features",
            "price": Decimal("799.99"),
            "category": "Electronics",
            "brand": "Samsung",
            "stock_quantity": 30,
            "in_stock": True,
            "tags": ["smartphone", "samsung", "android", "ai"],
            "specifications": {
                "storage": "256GB",
                "color": "Phantom Black",
                "display": "6.2-inch Dynamic AMOLED",
                "camera": "50MP Triple camera",
                "chip": "Snapdragon 8 Gen 3"
            }
        },
        {
            "name": "MacBook Air M3",
            "description": "Ultra-thin laptop with M3 chip for incredible performance",
            "price": Decimal("1199.99"),
            "category": "Electronics",
            "brand": "Apple",
            "stock_quantity": 25,
            "in_stock": True,
            "tags": ["laptop", "apple", "m3", "ultrabook"],
            "specifications": {
                "processor": "Apple M3 chip",
                "memory": "8GB unified memory",
                "storage": "256GB SSD",
                "display": "13.6-inch Liquid Retina",
                "battery": "Up to 18 hours"
            }
        },
        {
            "name": "Nike Air Max 270",
            "description": "Comfortable running shoes with Max Air unit",
            "price": Decimal("129.99"),
            "category": "Sports",
            "brand": "Nike",
            "stock_quantity": 100,
            "in_stock": True,
            "tags": ["shoes", "running", "nike", "air max"],
            "specifications": {
                "type": "Running Shoes",
                "material": "Mesh and synthetic leather",
                "sole": "Rubber outsole",
                "technology": "Max Air cushioning"
            }
        },
        {
            "name": "Adidas Ultraboost 22",
            "description": "Premium running shoes with Boost cushioning",
            "price": Decimal("159.99"),
            "category": "Sports",
            "brand": "Adidas",
            "stock_quantity": 75,
            "in_stock": True,
            "tags": ["shoes", "running", "adidas", "boost"],
            "specifications": {
                "type": "Running Shoes",
                "material": "Primeknit upper",
                "sole": "Continental rubber outsole",
                "technology": "Boost midsole"
            }
        },
        {
            "name": "Sony WH-1000XM5",
            "description": "Industry-leading noise canceling headphones",
            "price": Decimal("349.99"),
            "category": "Electronics",
            "brand": "Sony",
            "stock_quantity": 40,
            "in_stock": True,
            "tags": ["headphones", "sony", "noise-canceling", "wireless"],
            "specifications": {
                "type": "Over-ear headphones",
                "connectivity": "Bluetooth 5.2",
                "battery": "30 hours",
                "features": "Active Noise Canceling, Quick Charge"
            }
        },
        {
            "name": "Amazon Basics Laptop Stand",
            "description": "Adjustable aluminum laptop stand for better ergonomics",
            "price": Decimal("39.99"),
            "category": "Electronics",
            "brand": "Amazon Basics",
            "stock_quantity": 200,
            "in_stock": True,
            "tags": ["laptop", "stand", "ergonomic", "aluminum"],
            "specifications": {
                "material": "Aluminum alloy",
                "adjustability": "6 height levels",
                "compatibility": "Most laptops 10-17 inches",
                "weight": "2.2 lbs"
            }
        }
    ]
    
    for product_data in products_data:
        # Check if product already exists by name
        existing_product = Product.objects.filter(name=product_data["name"]).first()
        if existing_product:
            print(f"Product already exists: {existing_product.name}")
            continue
            
        # Create the product
        product = Product.objects.create(
            name=product_data["name"],
            description=product_data["description"],
            price=product_data["price"],
            original_price=product_data.get("original_price"),
            category=categories[product_data["category"]],
            brand=brands[product_data["brand"]],
            stock_quantity=product_data["stock_quantity"],
            in_stock=product_data["in_stock"],
            tags=product_data["tags"],
            specifications=product_data["specifications"]
        )
        print(f"Created product: {product.name}")
    
    # Create some sample reviews
    products = Product.objects.all()
    reviews_data = [
        {
            "user_name": "John Smith",
            "user_email": "john@example.com",
            "rating": 5,
            "title": "Excellent Product!",
            "comment": "Excellent product! Highly recommended.",
            "verified_purchase": True
        },
        {
            "user_name": "Sarah Johnson",
            "user_email": "sarah@example.com",
            "rating": 4,
            "title": "Great Quality",
            "comment": "Great quality, fast shipping.",
            "verified_purchase": True
        },
        {
            "user_name": "Mike Wilson",
            "user_email": "mike@example.com",
            "rating": 5,
            "title": "Perfect Purchase",
            "comment": "Perfect! Exactly what I was looking for.",
            "verified_purchase": False
        }
    ]
    
    review_count = 0
    for product in products[:3]:  # Add reviews to first 3 products
        for review_data in reviews_data:
            review, created = Review.objects.get_or_create(
                product=product,
                user_email=review_data["user_email"],
                defaults={
                    "user_name": review_data["user_name"],
                    "rating": review_data["rating"],
                    "title": review_data["title"],
                    "comment": review_data["comment"],
                    "verified_purchase": review_data["verified_purchase"]
                }
            )
            if created:
                review_count += 1
    
    print(f"Created {review_count} reviews")
    
    # Update product ratings based on reviews
    for product in products:
        reviews = Review.objects.filter(product=product)
        if reviews.exists():
            avg_rating = reviews.aggregate(
                avg_rating=Avg('rating')
            )['avg_rating']
            product.rating = round(avg_rating, 2)
            product.review_count = reviews.count()
            product.save()
            print(f"Updated {product.name} rating: {product.rating} ({product.review_count} reviews)")
    
    print("\nSample data creation completed!")
    print(f"Categories: {Category.objects.count()}")
    print(f"Brands: {Brand.objects.count()}")
    print(f"Products: {Product.objects.count()}")
    print(f"Reviews: {Review.objects.count()}")

if __name__ == "__main__":
    create_sample_data()
