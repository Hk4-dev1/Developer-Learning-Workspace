from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, Review

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'description': ('name',)}


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'website', 'created_at']
    search_fields = ['name']
    list_filter = ['created_at']


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    readonly_fields = ['created_at']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'brand', 'price', 'original_price', 
        'rating', 'in_stock', 'stock_quantity', 'created_at'
    ]
    list_filter = ['category', 'brand', 'in_stock', 'created_at']
    search_fields = ['name', 'description', 'tags']
    ordering = ['-created_at']
    inlines = [ProductImageInline, ReviewInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'category', 'subcategory', 'brand')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price')
        }),
        ('Stock & Availability', {
            'fields': ('in_stock', 'stock_quantity')
        }),
        ('Rating & Reviews', {
            'fields': ('rating', 'review_count'),
            'description': 'These fields are usually auto-calculated'
        }),
        ('Media', {
            'fields': ('thumbnail',)
        }),
        ('Additional Information', {
            'fields': ('tags', 'specifications'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'order', 'alt_text', 'created_at']
    list_filter = ['product__category', 'created_at']
    ordering = ['product', 'order']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        'product', 'user_name', 'rating', 'title', 
        'verified_purchase', 'helpful_count', 'created_at'
    ]
    list_filter = ['rating', 'verified_purchase', 'created_at']
    search_fields = ['product__name', 'user_name', 'title', 'comment']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
