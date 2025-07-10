from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Brand, Product, Review
from .serializers import (
    CategorySerializer, BrandSerializer, ProductListSerializer,
    ProductDetailSerializer, ProductCreateUpdateSerializer, ReviewSerializer
)


class CategoryListView(generics.ListCreateAPIView):
    """List all categories or create a new category"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a category"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BrandListView(generics.ListCreateAPIView):
    """List all brands or create a new brand"""
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a brand"""
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ProductListView(generics.ListCreateAPIView):
    """List all products with filtering and search capabilities"""
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'tags']
    filterset_fields = ['category', 'brand', 'in_stock']
    ordering_fields = ['price', 'rating', 'created_at', 'name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateUpdateSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.select_related('category', 'brand')
        
        # Custom filtering
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        min_rating = self.request.query_params.get('min_rating')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if min_rating:
            queryset = queryset.filter(rating__gte=min_rating)
            
        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a product"""
    queryset = Product.objects.select_related('category', 'brand').prefetch_related('images', 'reviews')
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductCreateUpdateSerializer
        return ProductDetailSerializer


class ProductReviewsView(generics.ListCreateAPIView):
    """List reviews for a specific product or create a new review"""
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)
    
    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        serializer.save(product_id=product_id)


@api_view(['GET'])
def product_search(request):
    """Advanced product search endpoint"""
    query = request.GET.get('q', '')
    category_id = request.GET.get('category')
    brand_id = request.GET.get('brand')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    min_rating = request.GET.get('min_rating')
    in_stock = request.GET.get('in_stock')
    
    products = Product.objects.select_related('category', 'brand')
    
    if query:
        # For SQLite compatibility, we'll search in name and description only
        # and use a simpler approach for tags
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(tags__icontains=query)  # This works with SQLite as a simple string search
        )
    
    if category_id:
        products = products.filter(category_id=category_id)
    
    if brand_id:
        products = products.filter(brand_id=brand_id)
    
    if min_price:
        products = products.filter(price__gte=min_price)
    
    if max_price:
        products = products.filter(price__lte=max_price)
    
    if min_rating:
        products = products.filter(rating__gte=min_rating)
    
    if in_stock is not None:
        products = products.filter(in_stock=in_stock.lower() == 'true')
    
    # Order by relevance (simplified)
    products = products.order_by('-rating', '-created_at')
    
    # Pagination
    page_size = int(request.GET.get('page_size', 20))
    page = int(request.GET.get('page', 1))
    start = (page - 1) * page_size
    end = start + page_size
    
    total_count = products.count()
    products_page = products[start:end]
    
    serializer = ProductListSerializer(products_page, many=True)
    
    return Response({
        'count': total_count,
        'page': page,
        'page_size': page_size,
        'total_pages': (total_count + page_size - 1) // page_size,
        'results': serializer.data
    })


@api_view(['GET'])
def api_overview(request):
    """API overview and available endpoints"""
    api_urls = {
        'API Overview': '/api/',
        'Categories': '/api/categories/',
        'Category Detail': '/api/categories/<uuid:id>/',
        'Brands': '/api/brands/',
        'Brand Detail': '/api/brands/<uuid:id>/',
        'Products': '/api/products/',
        'Product Detail': '/api/products/<uuid:id>/',
        'Product Reviews': '/api/products/<uuid:product_id>/reviews/',
        'Product Search': '/api/search/?q=<query>&category=<id>&brand=<id>&min_price=<price>&max_price=<price>&min_rating=<rating>&in_stock=<true/false>',
        'Admin Panel': '/admin/',
    }
    
    return Response({
        'message': 'E-commerce Backend API',
        'version': '1.0.0',
        'endpoints': api_urls
    })


@api_view(['GET'])
def health_check(request):
    """Simple health check endpoint for API status monitoring"""
    return Response({
        'status': 'healthy',
        'message': 'E-commerce API is running',
        'timestamp': '2025-07-10T08:53:00Z',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)
