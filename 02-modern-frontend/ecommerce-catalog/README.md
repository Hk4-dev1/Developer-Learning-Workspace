# E-commerce Product Catalog

A modern, responsive E-commerce Product Catalog built with React, TypeScript, and advanced state management. This project demonstrates modern frontend development practices including Context API, useReducer, local storage persistence, and responsive design.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse through a rich collection of products with detailed information
- **Advanced Search**: Real-time search with debounced input for optimal performance
- **Smart Filtering**: Comprehensive filter sidebar with category, brand, price range, rating, and availability filters
- **Multiple View Modes**: Switch between grid and list view layouts
- **Shopping Cart**: Add/remove items with quantity management and persistent storage
- **Wishlist**: Save favorite products with local storage persistence
- **Product Quick View**: Modal popup with product details and related product recommendations
- **Product Recommendations**: Smart product suggestions based on categories and user behavior
- **Recent Searches**: Track and display recent search history with trending searches
- **Cart Management**: Advanced cart features including clear cart, export/share functionality

### Enhanced UI/UX Features
- **Filter Sidebar**: Collapsible sidebar with multiple filter options and real-time updates
- **Loading Skeletons**: Smooth loading animations with skeleton placeholders
- **Related Products**: Product recommendations in quick view modal
- **Search Suggestions**: Recent searches dropdown with trending items
- **Cart Analytics**: View cart statistics and export functionality
- **Responsive Design**: Mobile-first approach optimized for all device sizes
- **Modern Animations**: Smooth transitions and hover effects throughout the app

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Context API + useReducer**: Advanced state management pattern
- **Local Storage Persistence**: Cart and wishlist data persists between sessions
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Debounced Search**: Optimized search performance with custom hooks
- **Modern UI/UX**: Clean, intuitive interface with hover effects and animations
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Dark Mode Support**: Automatic dark mode based on system preferences

## 🛠️ Technologies Used

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **CSS3** - Modern styling with Grid, Flexbox, and custom properties
- **Lucide React** - Beautiful, customizable icons
- **Create React App** - Build tooling and development server

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header/          # Navigation header with search and actions
│   ├── ProductCard/     # Individual product display component
│   ├── ProductList/     # Product grid/list container
│   └── ProductQuickView/ # Modal for quick product preview
├── context/             # React Context and state management
│   ├── AppContext.tsx   # Main application context provider
│   └── AppReducer.ts    # Reducer functions and action creators
├── data/                # Mock data and static content
│   └── mockProducts.ts  # Sample product data
├── hooks/               # Custom React hooks
│   ├── useCart.ts       # Cart-specific operations and analytics
│   ├── useDebounce.ts   # Debounced values and callbacks
│   └── useLocalStorage.ts # localStorage integration
├── types/               # TypeScript type definitions
│   └── Product.ts       # Product, Cart, User, and App state types
├── utils/               # Utility functions
│   └── helpers.ts       # Currency formatting, filtering, sorting
└── App.tsx              # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation and search header
│   ├── ProductCard/     # Individual product display
│   ├── ProductList/     # Product grid/list container
│   ├── ProductQuickView/# Product detail modal
│   ├── CartSidebar/     # Shopping cart sidebar
│   ├── FilterSidebar/   # Advanced filtering sidebar
│   ├── RecentSearches/  # Search history component
│   ├── ProductRecommendations/ # Related products
│   └── LoadingSkeleton/ # Loading animations
├── context/             # React Context and state management
│   ├── AppContext.tsx   # Main application context
│   └── AppReducer.ts    # State reducer logic
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts # Local storage management
│   ├── useDebounce.ts   # Debounced input handling
│   └── useCart.ts       # Cart management logic
├── types/               # TypeScript type definitions
│   └── Product.ts       # Product and app types
├── data/                # Mock data and constants
│   └── mockProducts.ts  # Sample product data
├── utils/               # Utility functions
│   └── helpers.ts       # Helper functions
└── styles/              # Global styles and themes
```

## 🎯 Key Learning Concepts

### State Management
- **useReducer Pattern**: Complex state logic with predictable updates
- **Context API**: Global state sharing without prop drilling
- **Action Creators**: Type-safe action dispatching
- **State Persistence**: localStorage integration for data persistence

### Performance Optimization
- **Debounced Search**: Optimized search input handling
- **Lazy Loading**: Images loaded on demand
- **Memoization**: Preventing unnecessary re-renders
- **Code Splitting**: Component-level code organization

### Modern React Patterns
- **Custom Hooks**: Reusable stateful logic
- **Compound Components**: Flexible component composition
- **Render Props**: Component logic sharing
- **TypeScript Integration**: Full type safety

### CSS & Styling
- **CSS Grid & Flexbox**: Modern layout techniques
- **Responsive Design**: Mobile-first approach
- **CSS Custom Properties**: Theme-able design system
- **Animation & Transitions**: Smooth user interactions

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px+ (Full-featured layout)
- **Tablet**: 768px - 1199px (Optimized for touch)
- **Mobile**: 320px - 767px (Simplified interface)

## 🎨 UI/UX Features

### Visual Design
- Clean, modern interface with subtle shadows and gradients
- Consistent color scheme with purple/blue brand colors
- Smooth transitions and hover effects
- Loading states and empty state illustrations

### User Experience
- Intuitive navigation with clear visual hierarchy
- Quick actions (add to cart, wishlist) without page reloads
- Real-time search results with instant feedback
- Persistent user preferences and cart state

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus indicators for all interactive elements

## 🔧 Configuration & Customization

### Adding New Products
Update the `src/data/mockProducts.ts` file with new product data following the `Product` interface.

### Customizing Styles
The application uses CSS custom properties for easy theming. Modify the variables in each component's CSS file.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.

## 🔄 Future Enhancements

### Completed Features ✅
- [x] Advanced filtering with price ranges, categories, brands, ratings
- [x] Product recommendations based on categories
- [x] Recent searches and trending functionality
- [x] Shopping cart with export/share capabilities
- [x] Loading skeletons and enhanced UI states
- [x] Product quick view with related products
- [x] Responsive design with filter sidebar

### Planned Features
- [ ] User authentication and profiles
- [ ] Product reviews and ratings system
- [ ] Category browsing with subcategories
- [ ] Shopping cart checkout process
- [ ] Order history and tracking
- [ ] Product comparison feature
- [ ] Import cart functionality
- [ ] Backend API integration

### Technical Improvements
- [ ] Unit and integration tests
- [ ] End-to-end testing with Cypress
- [ ] Performance monitoring
- [ ] Error boundary implementation
- [ ] Progressive Web App (PWA) features
- [ ] Server-side rendering (SSR)
- [ ] Database integration for real product data

## 📚 Learning Resources

This project demonstrates concepts from:
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Modern CSS Techniques](https://css-tricks.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 💡 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Design inspiration from modern e-commerce platforms
- Built as part of a frontend development learning curriculum

---

**Built with ❤️ using React & TypeScript**

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
