from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, Review


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    
    class Meta:
        model = Category
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    """Serializer for Brand model"""
    
    class Meta:
        model = Brand
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for ProductImage model"""
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'alt_text', 'order']


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for Review model"""
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product list views"""
    category = serializers.StringRelatedField()
    brand = serializers.StringRelatedField()
    is_on_sale = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'original_price',
            'category', 'brand', 'in_stock', 'stock_quantity',
            'rating', 'review_count', 'thumbnail', 'thumbnail_url', 'tags',
            'is_on_sale', 'discount_percentage', 'created_at'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single product views"""
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    is_on_sale = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = '__all__'


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating products"""
    
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'original_price',
            'category', 'subcategory', 'brand', 'in_stock',
            'stock_quantity', 'rating', 'review_count',
            'tags', 'specifications', 'thumbnail', 'thumbnail_url'
        ]

    def validate(self, data):
        """Custom validation"""
        if data.get('original_price') and data.get('price'):
            if data['original_price'] <= data['price']:
                raise serializers.ValidationError(
                    "Original price must be greater than current price"
                )
        return data
