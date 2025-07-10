"""
URL configuration for products app.
Defines API endpoints for e-commerce product management.
"""
from django.urls import path
from . import views

# URL patterns
urlpatterns = [
    # Health check
    path('health/', views.health_check, name='health-check'),
    
    # API Overview
    path('', views.api_overview, name='api-overview'),
    
    # Category endpoints
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<uuid:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    
    # Brand endpoints
    path('brands/', views.BrandListView.as_view(), name='brand-list'),
    path('brands/<uuid:pk>/', views.BrandDetailView.as_view(), name='brand-detail'),
    
    # Product endpoints
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/<uuid:product_id>/reviews/', views.ProductReviewsView.as_view(), name='product-reviews'),
    
    # Search endpoint
    path('search/', views.product_search, name='product-search'),
]

# This creates the following endpoints:
# GET /api/ - API overview
# GET /api/categories/ - List all categories, POST - Create new category
# GET /api/categories/{id}/ - Get specific category, PUT/PATCH - Update, DELETE - Delete
# GET /api/brands/ - List all brands, POST - Create new brand
# GET /api/brands/{id}/ - Get specific brand, PUT/PATCH - Update, DELETE - Delete
# GET /api/products/ - List all products (with filtering), POST - Create new product
# GET /api/products/{id}/ - Get specific product, PUT/PATCH - Update, DELETE - Delete
# GET /api/products/{id}/reviews/ - List reviews for product, POST - Create new review
# GET /api/search/ - Advanced product search with multiple filters
