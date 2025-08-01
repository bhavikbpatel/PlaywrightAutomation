# PlaywrightAutomation

## Overview

Playwright POM based framework with Cucumber Feature example, Allure Report and Azure integration.

This is a comprehensive Playwright test automation framework designed for e-commerce application testing. The framework implements the Page Object Model (POM) design pattern and provides utilities for both UI and API testing.

**Author:** Bhavik  
**Created:** 2025-08-01  
**Version:** 1.0.0  

## Features

- 🎭 **Playwright Framework**: Modern, fast, and reliable end-to-end testing
- 📄 **Page Object Model**: Clean, maintainable test structure
- 🌐 **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit
- 📱 **Mobile Testing**: Mobile viewport configurations available
- 🔄 **API Testing**: Utility classes for API interactions
- 📊 **Excel Integration**: Read/write test data from Excel files
- 📸 **Screenshots & Traces**: Comprehensive debugging capabilities
- 📋 **HTML Reports**: Detailed test execution reports

## Project Structure

```
PlayWright_UD/
├── pageObjects/           # Page Object Model classes
│   ├── CartPage.js       # Cart page interactions
│   ├── CheckOutPage.js   # Checkout page interactions
│   ├── DashboardPage.js  # Dashboard/product listing page
│   ├── LoginPage.js      # Login page interactions
│   ├── MyOrderPage.js    # Order history page
│   ├── POManager.js      # Page Object Manager (factory)
│   └── ThankYouPage.js   # Order confirmation page
├── tests/                # Test specification files
│   ├── ClientAppLocator.spec.js
│   ├── UIBasictest.spec.js
│   ├── WebAPIPart1.spec.js
│   └── ... (other test files)
├── utils/                # Utility classes
│   ├── APIUtils.js       # API testing utilities
│   └── ExcelUtils.js     # Excel file operations
├── test-results/         # Test execution artifacts
├── playwright-report/    # HTML test reports
├── playwright.config.js  # Playwright configuration
└── package.json          # Project dependencies
```

## Prerequisites

- **Node.js**: Version 14 or higher
- **npm**: Node package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PlayWright_UD
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Usage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/ClientAppLocator.spec.js

# Run tests on specific browser
npx playwright test --project=chromium
```

### View Test Reports

```bash
npm run report
```

## Page Object Classes

### LoginPage
Handles user authentication and login page interactions.

### DashboardPage
Manages product browsing, searching, and adding items to cart.

### CartPage
Controls shopping cart operations and checkout navigation.

### CheckOutPage
Handles order placement, shipping details, and payment processing.

### MyOrderPage
Manages order history viewing and order detail navigation.

### ThankYouPage
Verifies order confirmation and success messages.

### POManager
Central factory class for managing all page object instances.

## Utility Classes

### APIUtils
Provides methods for:
- User authentication via API
- Order creation through API calls
- Token management

### ExcelUtils
Offers functionality for:
- Reading data from Excel files
- Writing data to Excel files
- Finding specific values in worksheets

## Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Timeout settings
- Browser configurations
- Reporter settings
- Screenshot and trace collection options

## Test Data Management

- Excel files can be used for test data storage
- API utilities support data-driven testing
- Environment-specific configurations supported

## Browser Support

- **Chromium** (Default)
- **Firefox** (Available)
- **WebKit/Safari** (Available)
- **Mobile browsers** (Configurable)

## Debugging Features

- **Screenshots**: Automatically captured on test completion
- **Traces**: Collected on test failure for debugging
- **Video Recording**: Available for test execution
- **Console Logs**: Captured during test execution

## Best Practices Implemented

1. **Page Object Model**: Separation of page logic from test logic
2. **Single Responsibility**: Each class has a specific purpose
3. **Reusability**: Common utilities and page objects
4. **Maintainability**: Clear structure and documentation
5. **Error Handling**: Robust wait strategies and assertions

## Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate documentation for new features
3. Include unit tests for utility functions
4. Update README for significant changes

## Test Execution Flow

1. **Login**: Authenticate user credentials
2. **Product Selection**: Browse and add products to cart
3. **Cart Verification**: Verify selected products in cart
4. **Checkout**: Complete order placement with shipping details
5. **Order Confirmation**: Verify order success and retrieve order ID
6. **Order History**: Verify order appears in order history

## Reporting

The framework generates comprehensive HTML reports including:
- Test execution summary
- Pass/fail status for each test
- Screenshots for failed tests
- Execution traces for debugging
- Performance metrics

## License

ISC License

## Support

For questions or issues, please contact: Bhavik

---

**Happy Testing! 🎭**
