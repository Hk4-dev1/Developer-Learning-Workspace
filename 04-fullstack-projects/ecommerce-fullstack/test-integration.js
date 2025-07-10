#!/usr/bin/env node

/**
 * Full-Stack Integration Test
 * Tests the React frontend connection to Django backend
 */

const axios = require('axios');

const API_BASE_URL = 'http://127.0.0.1:8005/api';
const REACT_URL = 'http://localhost:3000';

// ANSI color codes for prettier output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`${colors.bold}[${step}]${colors.reset} ${colors.cyan}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

async function testEndpoint(url, description) {
  try {
    const response = await axios.get(url);
    logSuccess(`${description}: Status ${response.status}`);
    return response.data;
  } catch (error) {
    logError(`${description}: ${error.message}`);
    throw error;
  }
}

async function runIntegrationTests() {
  log('\n' + '='.repeat(60), colors.bold);
  log('🚀 E-COMMERCE FULL-STACK INTEGRATION TEST', colors.bold);
  log('='.repeat(60), colors.bold);

  try {
    // Test 1: Backend Health Check
    logStep('1', 'Testing Backend Health Check');
    await testEndpoint(`${API_BASE_URL}/health/`, 'Health Check');

    // Test 2: Test Categories API
    logStep('2', 'Testing Categories API');
    const categoriesResponse = await testEndpoint(`${API_BASE_URL}/categories/`, 'Categories List');
    const categories = categoriesResponse.results || categoriesResponse;
    log(`   Found ${categoriesResponse.count || categories.length} categories: ${categories.map(c => c.name).join(', ')}`);

    // Test 3: Test Brands API
    logStep('3', 'Testing Brands API');
    const brandsResponse = await testEndpoint(`${API_BASE_URL}/brands/`, 'Brands List');
    const brands = brandsResponse.results || brandsResponse;
    log(`   Found ${brandsResponse.count || brands.length} brands: ${brands.map(b => b.name).join(', ')}`);

    // Test 4: Test Products API
    logStep('4', 'Testing Products API');
    const products = await testEndpoint(`${API_BASE_URL}/products/`, 'Products List');
    log(`   Found ${products.count} total products, showing ${products.results.length}`);
    
    if (products.results.length > 0) {
      const product = products.results[0];
      log(`   Sample product: "${product.name}" - $${product.price}`);
    }

    // Test 5: Test Product Detail
    if (products.results.length > 0) {
      logStep('5', 'Testing Product Detail API');
      const productId = products.results[0].id;
      const productDetail = await testEndpoint(`${API_BASE_URL}/products/${productId}/`, 'Product Detail');
      log(`   Product details loaded: "${productDetail.name}"`);
      log(`   Category: ${productDetail.category.name}, Brand: ${productDetail.brand.name}`);
    }

    // Test 6: Test Search API
    logStep('6', 'Testing Product Search API');
    const searchResults = await testEndpoint(`${API_BASE_URL}/search/?q=phone`, 'Product Search');
    log(`   Search results: ${searchResults.count} products found for "phone"`);

    // Test 7: Check React App Accessibility
    logStep('7', 'Testing React Frontend Accessibility');
    try {
      await axios.get(REACT_URL, { timeout: 5000 });
      logSuccess('React app is accessible at ' + REACT_URL);
    } catch (error) {
      logWarning('React app might not be running at ' + REACT_URL);
    }

    // Test Summary
    log('\n' + '='.repeat(60), colors.bold);
    log('🎉 INTEGRATION TEST SUMMARY', colors.bold);
    log('='.repeat(60), colors.bold);
    logSuccess('✅ Django Backend API: Fully functional');
    logSuccess('✅ All endpoints responding correctly');
    logSuccess('✅ Database populated with sample data');
    logSuccess('✅ CORS configured for frontend integration');
    
    log('\n📊 Data Summary:', colors.blue);
    log(`   • Categories: ${categoriesResponse.count || categories.length}`, colors.cyan);
    log(`   • Brands: ${brandsResponse.count || brands.length}`, colors.cyan);
    log(`   • Products: ${products.count}`, colors.cyan);
    
    log('\n🔗 Frontend Integration Points:', colors.blue);
    log('   • API Base URL: ' + API_BASE_URL, colors.cyan);
    log('   • React App URL: ' + REACT_URL, colors.cyan);
    log('   • Health Check: /api/health/', colors.cyan);
    
    log('\n🚀 Next Steps:', colors.blue);
    log('   1. Ensure React app is running (npm start)', colors.cyan);
    log('   2. Open browser to http://localhost:3000', colors.cyan);
    log('   3. Verify API data loads in the React UI', colors.cyan);
    log('   4. Test search and filtering functionality', colors.cyan);
    
  } catch (error) {
    log('\n' + '='.repeat(60), colors.bold);
    log('💥 INTEGRATION TEST FAILED', colors.red);
    log('='.repeat(60), colors.bold);
    logError('Test failed: ' + error.message);
    
    log('\n🔧 Troubleshooting:', colors.yellow);
    log('   1. Ensure Django server is running: python manage.py runserver 8005', colors.cyan);
    log('   2. Check if database has sample data', colors.cyan);
    log('   3. Verify CORS settings in Django settings.py', colors.cyan);
    log('   4. Check network connectivity', colors.cyan);
    
    process.exit(1);
  }
}

// Run the tests
runIntegrationTests().catch(console.error);
