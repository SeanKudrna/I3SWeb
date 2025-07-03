# Innovative 3D Shop - I3S Web

A premium React TypeScript website showcasing 3D printed gaming accessories from the Innovative 3D Shop Etsy store. This modern, responsive web application provides an enhanced shopping experience for retro gaming enthusiasts.

![I3S Web Screenshot](https://via.placeholder.com/800x400/2e7d32/ffffff?text=I3S+Web+Screenshot)

## 🎮 About

Innovative 3D Shop specializes in high-quality 3D printed accessories for retro gaming consoles and controllers. This website serves as a beautifully designed showcase and catalog for our Etsy shop, providing customers with an enhanced browsing experience while directing them to purchase on Etsy.

## ✨ Features

### 🛍️ Product Showcase
- **Complete Product Catalog**: Browse all active listings from our Etsy shop
- **Featured Products**: Highlighted items on the homepage
- **Product Details**: Comprehensive product pages with multiple images, descriptions, and specifications
- **Product Filtering**: Filter by price, tags, and custom options
- **Advanced Search**: Search products with autocomplete suggestions

### 🎨 User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, gaming-inspired design with smooth animations
- **Fast Performance**: Optimized loading with lazy-loaded images
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🔗 Etsy Integration
- **Real-time Data**: Live product information from Etsy API v3
- **Direct Links**: "Buy on Etsy" buttons for seamless purchasing
- **Shop Information**: Real shop statistics and reviews
- **Inventory Sync**: Up-to-date product availability

### 📱 Technical Features
- **TypeScript**: Full type safety and better development experience
- **React 18**: Latest React features with hooks and context
- **Styled Components**: CSS-in-JS for dynamic styling
- **Framer Motion**: Smooth animations and transitions
- **Error Handling**: Comprehensive error boundaries and retry mechanisms

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Etsy API v3 credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/i3sweb.git
   cd i3sweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Etsy API credentials:
   ```env
   REACT_APP_ETSY_KEYSTRING=your_etsy_api_key
   REACT_APP_ETSY_SHARED_SECRET=your_etsy_shared_secret
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Common/          # Generic components
│   ├── Layout/          # Layout components
│   └── Product/         # Product-specific components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # External API services
├── styles/              # Global styles and themes
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── assets/              # Static assets
```

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Extended React and TypeScript rules
- **Prettier**: Consistent code formatting
- **Naming**: Clear, descriptive component and function names
- **Comments**: JSDoc comments for all functions and complex logic

## 🔧 Configuration

### Etsy API Setup

1. Create an Etsy developer account at [developers.etsy.com](https://developers.etsy.com)
2. Generate API credentials for your shop
3. Add credentials to `.env` file
4. Ensure your shop ID matches in `src/services/etsyApi.ts`

### Customization

- **Shop Information**: Update `src/utils/constants.ts`
- **Styling**: Modify colors and themes in `src/utils/constants.ts`
- **Components**: Customize components in their respective directories

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Image Loading**: Lazy loading with blur placeholders
- **API Caching**: Intelligent caching of Etsy API responses

## 🧪 Testing

The project includes comprehensive tests for:
- Utility functions
- API integration
- Component rendering
- User interactions

Run tests with:
```bash
npm test
```

For coverage report:
```bash
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The `build` folder contains optimized production files.

### Deployment Options

- **Netlify**: Connect your repository for automatic deployments
- **Vercel**: Zero-config deployment for React applications
- **GitHub Pages**: Static hosting with GitHub Actions
- **Traditional Hosting**: Upload build files to any web server

### Environment Variables for Production

Ensure these environment variables are set in your deployment platform:
- `REACT_APP_ETSY_KEYSTRING`
- `REACT_APP_ETSY_SHARED_SECRET`

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Etsy API**: Powers our product data
- **React Community**: Amazing ecosystem and tools
- **Gaming Community**: Inspiration for our products
- **Open Source**: Built with love for the community

## 🐛 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-username/i3sweb/issues) page
2. Search for existing solutions
3. Create a new issue with detailed information

## 📞 Contact

- **Website**: [Innovative 3D Shop](https://www.etsy.com/shop/Innovative3DShop)
- **Email**: shop@innovative3d.com
- **Etsy**: [@Innovative3DShop](https://www.etsy.com/shop/Innovative3DShop)

---

**Built with ❤️ for the retro gaming community**