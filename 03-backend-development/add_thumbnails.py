#!/usr/bin/env python
"""
Add thumbnail images to existing products.
This script updates existing products with thumbnail URLs from Unsplash.
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

from products.models import Product, ProductImage

def add_thumbnails():
    """Add thumbnail URLs to existing products"""
    
    # Mapping of product names to thumbnail URLs and additional images
    product_images = {
        "iPhone 15 Pro": {
            "thumbnail": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop"
            ]
        },
        "Samsung Galaxy S24": {
            "thumbnail": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=600&fit=crop"
            ]
        },
        "MacBook Air M3": {
            "thumbnail": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop"
            ]
        },
        "Nike Air Max 270": {
            "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop"
            ]
        },
        "Adidas Ultraboost 22": {
            "thumbnail": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"
            ]
        },
        "Sony WH-1000XM5": {
            "thumbnail": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop"
            ]
        },
        "Amazon Basics Laptop Stand": {
            "thumbnail": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop"
            ]
        }
    }
    
    print("Adding thumbnail images to products...")
    
    updated_count = 0
    for product in Product.objects.all():
        if product.name in product_images:
            image_data = product_images[product.name]
            
            # Update thumbnail URL
            product.thumbnail_url = image_data["thumbnail"]
            product.save()
            print(f"✅ Updated thumbnail for '{product.name}'")
            
            # Clear existing product images
            ProductImage.objects.filter(product=product).delete()
            
            # Add product images
            for i, image_url in enumerate(image_data["images"]):
                ProductImage.objects.create(
                    product=product,
                    image_url=image_url,
                    alt_text=f"{product.name} - Image {i+1}",
                    order=i
                )
            
            print(f"   Added {len(image_data['images'])} additional images")
            updated_count += 1
    
    print(f"\n🎉 Successfully updated {updated_count} products with images!")
    print("✅ All products now have thumbnail and additional images")

if __name__ == "__main__":
    add_thumbnails()
