#!/usr/bin/env python3
"""
Comprehensive API Testing Script
Tests all endpoints of the e-commerce backend API
"""

import requests
import json
import sys
from datetime import datetime

BASE_URL = "http://127.0.0.1:8002/api"

def test_api_endpoint(method, endpoint, data=None, params=None, description=""):
    """Test an API endpoint and return the result"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url, params=params)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "PUT":
            response = requests.put(url, json=data)
        elif method == "PATCH":
            response = requests.patch(url, json=data)
        elif method == "DELETE":
            response = requests.delete(url)
        
        print(f"\n{'='*60}")
        print(f"🧪 {description}")
        print(f"📡 {method} {endpoint}")
        if params:
            print(f"📋 Params: {params}")
        if data:
            print(f"📤 Data: {json.dumps(data, indent=2)}")
        print(f"📊 Status: {response.status_code}")
        
        if response.headers.get('content-type', '').startswith('application/json'):
            response_data = response.json()
            print(f"📥 Response: {json.dumps(response_data, indent=2)}")
            return response.status_code, response_data
        else:
            print(f"📥 Response: {response.text}")
            return response.status_code, response.text
            
    except requests.exceptions.ConnectionError:
        print(f"\n❌ Connection Error: Could not connect to {url}")
        print("Make sure the Django server is running on port 8002")
        return None, None
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        return None, None

def run_comprehensive_tests():
    """Run comprehensive tests of all API endpoints"""
    
    print("🚀 Starting Comprehensive API Tests")
    print(f"🕒 Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 Base URL: {BASE_URL}")
    
    test_results = []
    
    # Test 1: API Overview
    status, data = test_api_endpoint(
        "GET", "/", 
        description="Test API Overview Endpoint"
    )
    test_results.append(("API Overview", status == 200))
    
    # Test 2: Categories List
    status, categories_data = test_api_endpoint(
        "GET", "/categories/", 
        description="Test Categories List Endpoint"
    )
    test_results.append(("Categories List", status == 200))
    
    # Test 3: Categories Search
    status, data = test_api_endpoint(
        "GET", "/categories/", 
        params={"search": "electronics"},
        description="Test Categories Search"
    )
    test_results.append(("Categories Search", status == 200))
    
    # Test 4: Brands List
    status, brands_data = test_api_endpoint(
        "GET", "/brands/", 
        description="Test Brands List Endpoint"
    )
    test_results.append(("Brands List", status == 200))
    
    # Test 5: Products List
    status, products_data = test_api_endpoint(
        "GET", "/products/", 
        description="Test Products List Endpoint"
    )
    test_results.append(("Products List", status == 200))
    
    # Test 6: Products with filters
    status, data = test_api_endpoint(
        "GET", "/products/", 
        params={"category": "1", "min_price": "100", "max_price": "500"},
        description="Test Products with Filters"
    )
    test_results.append(("Products Filters", status == 200))
    
    # Test 7: Product Search
    status, data = test_api_endpoint(
        "GET", "/search/", 
        params={"q": "phone"},
        description="Test Product Search"
    )
    test_results.append(("Product Search", status == 200))
    
    # Test 8: Create a new category (if we have sample data)
    if categories_data and isinstance(categories_data, dict) and 'results' in categories_data:
        test_category_data = {
            "name": "Test Category",
            "description": "A test category created by the test script"
        }
        status, data = test_api_endpoint(
            "POST", "/categories/", 
            data=test_category_data,
            description="Test Create New Category"
        )
        test_results.append(("Create Category", status == 201))
        
        # If category was created, test retrieval
        if status == 201 and isinstance(data, dict) and 'id' in data:
            category_id = data['id']
            status, data = test_api_endpoint(
                "GET", f"/categories/{category_id}/", 
                description=f"Test Retrieve Category {category_id}"
            )
            test_results.append(("Retrieve Category", status == 200))
    
    # Test 9: Get specific product details (if we have products)
    if products_data and isinstance(products_data, dict) and 'results' in products_data:
        products = products_data['results']
        if products:
            product_id = products[0]['id']
            status, data = test_api_endpoint(
                "GET", f"/products/{product_id}/", 
                description=f"Test Product Detail {product_id}"
            )
            test_results.append(("Product Detail", status == 200))
    
    # Print test results summary
    print(f"\n{'='*60}")
    print("📋 TEST RESULTS SUMMARY")
    print(f"{'='*60}")
    
    passed_tests = 0
    total_tests = len(test_results)
    
    for test_name, passed in test_results:
        status_icon = "✅" if passed else "❌"
        print(f"{status_icon} {test_name}")
        if passed:
            passed_tests += 1
    
    print(f"\n🏆 Results: {passed_tests}/{total_tests} tests passed ({(passed_tests/total_tests)*100:.1f}%)")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed! Your API is working perfectly!")
    else:
        print("⚠️  Some tests failed. Check the error messages above.")
    
    print(f"\n🕒 Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    run_comprehensive_tests()
