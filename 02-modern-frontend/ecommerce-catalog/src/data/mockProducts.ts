// data/mockProducts.ts - Mock product data for e-commerce catalog

import { Product, Category } from '../types/Product';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest technology and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        description: 'Latest mobile phones',
        categoryId: 'electronics'
      },
      {
        id: 'laptops',
        name: 'Laptops',
        description: 'Computing devices',
        categoryId: 'electronics'
      },
      {
        id: 'accessories',
        name: 'Accessories',
        description: 'Tech accessories',
        categoryId: 'electronics'
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    subcategories: [
      {
        id: 'mens',
        name: "Men's Clothing",
        description: 'Fashion for men',
        categoryId: 'clothing'
      },
      {
        id: 'womens',
        name: "Women's Clothing",
        description: 'Fashion for women',
        categoryId: 'clothing'
      },
      {
        id: 'shoes',
        name: 'Shoes',
        description: 'Footwear for all',
        categoryId: 'clothing'
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        description: 'Home furniture',
        categoryId: 'home'
      },
      {
        id: 'decor',
        name: 'Decor',
        description: 'Home decoration',
        categoryId: 'home'
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        description: 'Kitchen appliances',
        categoryId: 'home'
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Athletic and fitness equipment',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    subcategories: [
      {
        id: 'fitness',
        name: 'Fitness Equipment',
        description: 'Workout gear',
        categoryId: 'sports'
      },
      {
        id: 'outdoor',
        name: 'Outdoor Sports',
        description: 'Outdoor activities',
        categoryId: 'sports'
      },
      {
        id: 'sportswear',
        name: 'Sportswear',
        description: 'Athletic clothing',
        categoryId: 'sports'
      }
    ]
  }
];

export const mockProducts: Product[] = [
  // Electronics - Smartphones
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    description: 'The most advanced iPhone with titanium design, A17 Pro chip, and pro camera system.',
    price: 999,
    originalPrice: 1099,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600',
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    stockQuantity: 50,
    tags: ['flagship', 'premium', 'photography', '5g'],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Storage': '128GB',
      'Camera': '48MP Main, 12MP Ultra Wide',
      'Battery': 'Up to 23 hours video playback'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Ultimate smartphone experience with S Pen, 200MP camera, and AI features.',
    price: 1199,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300',
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 35,
    tags: ['flagship', 's-pen', 'photography', 'ai'],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '200MP Main, 50MP Periscope',
      'Battery': '5000mAh'
    },
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },

  // Electronics - Laptops
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16-inch',
    description: 'Supercharged by M3 Pro or M3 Max chip for demanding workflows.',
    price: 2499,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    stockQuantity: 25,
    tags: ['professional', 'high-performance', 'creative'],
    specifications: {
      'Display': '16.2-inch Liquid Retina XDR',
      'Chip': 'Apple M3 Pro',
      'Memory': '18GB unified memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 22 hours'
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13',
    description: 'Ultra-portable laptop with 13th Gen Intel processors and stunning display.',
    price: 1299,
    originalPrice: 1399,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 40,
    tags: ['ultrabook', 'portable', 'business'],
    specifications: {
      'Display': '13.4-inch FHD+',
      'Processor': 'Intel Core i7-13700H',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB PCIe SSD',
      'Weight': '2.64 lbs'
    },
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },

  // Clothing - Men's
  {
    id: 'nike-air-jordan-1',
    name: 'Air Jordan 1 Retro High',
    description: 'Iconic basketball shoe with premium leather and classic colorway.',
    price: 170,
    category: 'clothing',
    subcategory: 'shoes',
    brand: 'Nike',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    rating: 4.8,
    reviewCount: 892,
    inStock: true,
    stockQuantity: 120,
    tags: ['basketball', 'retro', 'streetwear', 'classic'],
    specifications: {
      'Material': 'Premium leather',
      'Sole': 'Rubber outsole',
      'Fit': 'True to size',
      'Colors': 'Multiple colorways available'
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'levis-501-jeans',
    name: "Levi's 501 Original Jeans",
    description: 'The original jean with a straight fit and classic five-pocket styling.',
    price: 89,
    originalPrice: 98,
    category: 'clothing',
    subcategory: 'mens',
    brand: "Levi's",
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300',
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    stockQuantity: 85,
    tags: ['denim', 'classic', 'everyday', 'american'],
    specifications: {
      'Fit': 'Straight',
      'Material': '100% Cotton Denim',
      'Rise': 'Mid-rise',
      'Care': 'Machine wash cold'
    },
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
  },

  // Home & Garden
  {
    id: 'ikea-sofa-sectional',
    name: 'KIVIK Sectional Sofa',
    description: 'Comfortable sectional sofa with soft, durable fabric and generous seating.',
    price: 899,
    category: 'home',
    subcategory: 'furniture',
    brand: 'IKEA',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
    rating: 4.3,
    reviewCount: 234,
    inStock: true,
    stockQuantity: 15,
    tags: ['furniture', 'living-room', 'comfortable', 'modern'],
    specifications: {
      'Dimensions': '95 1/4x32 5/8x37 3/8"',
      'Material': 'Polyester fabric',
      'Seats': '4-5 people',
      'Assembly': 'Required'
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 'kitchenaid-mixer',
    name: 'KitchenAid Stand Mixer',
    description: 'Professional-grade stand mixer for all your baking and cooking needs.',
    price: 379,
    originalPrice: 429,
    category: 'home',
    subcategory: 'kitchen',
    brand: 'KitchenAid',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
    rating: 4.9,
    reviewCount: 1456,
    inStock: true,
    stockQuantity: 45,
    tags: ['kitchen', 'baking', 'professional', 'appliance'],
    specifications: {
      'Capacity': '5-quart stainless steel bowl',
      'Power': '325 watts',
      'Speeds': '10 speeds',
      'Includes': 'Flat beater, dough hook, wire whip'
    },
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z'
  },

  // Sports & Fitness
  {
    id: 'yoga-mat-premium',
    name: 'Premium Yoga Mat',
    description: 'High-quality non-slip yoga mat for all levels of practice.',
    price: 89,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'Manduka',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300',
    rating: 4.7,
    reviewCount: 678,
    inStock: true,
    stockQuantity: 95,
    tags: ['yoga', 'fitness', 'wellness', 'non-slip'],
    specifications: {
      'Dimensions': '68" x 24"',
      'Thickness': '6mm',
      'Material': 'Natural rubber',
      'Weight': '5.5 lbs'
    },
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-09T00:00:00Z'
  },
  {
    id: 'running-shoes-ultra',
    name: 'Ultra Boost Running Shoes',
    description: 'High-performance running shoes with responsive cushioning.',
    price: 180,
    category: 'sports',
    subcategory: 'sportswear',
    brand: 'Adidas',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
    rating: 4.6,
    reviewCount: 423,
    inStock: false,
    stockQuantity: 0,
    tags: ['running', 'performance', 'cushioning', 'athletic'],
    specifications: {
      'Technology': 'Boost midsole',
      'Upper': 'Primeknit',
      'Drop': '10mm',
      'Weight': '10.9 oz'
    },
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z'
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return mockProducts.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategoryId: string): Product[] => {
  return mockProducts.filter(product => product.subcategory === subcategoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return mockProducts.find(product => product.id === productId);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.rating >= 4.7);
};

export const getOnSaleProducts = (): Product[] => {
  return mockProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
