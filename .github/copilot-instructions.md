# Playwright E-Commerce Test Automation Framework

## Architecture Overview

This is a **Page Object Model (POM)** based Playwright framework targeting e-commerce test automation with dual JavaScript/TypeScript support, Cucumber BDD, API testing utilities, and Azure integration.

### Core Components
- **POManager**: Central factory pattern - instantiate via `new POManager(page)` then access pages via `poManager.getLoginPage()`, `poManager.getDashboardPage()`, etc.
- **Dual Language Support**: Both `pageObjects/` (JS) and `pageObjects_TS/` (TS) implement identical APIs
- **Custom Test Extension**: Use `customtest` from `utils/test-base.js` for data-driven tests with pre-configured test data

## Essential Development Patterns

### Page Object Instantiation
```javascript
// Standard pattern in all tests
const poManager = new POManager(page);
const loginPage = poManager.getLoginPage();
const dashboardPage = poManager.getDashboardPage();
// All pages follow this factory pattern
```

### Test Flow Architecture
**E-commerce test flow**: Login → Product Search → Cart → Checkout → Order Confirmation → Order History Verification
- Each step has dedicated page objects with specific methods
- Order IDs are captured and passed between pages for end-to-end verification

### API + UI Hybrid Testing
- Use `APIUtils` class for authentication/order creation via API
- Inject tokens into browser context with `page.addInitScript()`
- State management via `state.json` for session persistence

## Key File Locations

### Page Objects
- `pageObjects/POManager.js` - Master factory (JS version)
- `pageObjects_TS/POManager.ts` - Master factory (TS version)
- Each page class exposes domain-specific methods (not generic actions)

### Test Organization
- `tests/ClientAppLocator_POM.spec.js` - Main POM test examples
- `tests/WebAPIPart1.spec.js` - API authentication patterns
- `tests/WebAPIPart2.spec.js` - Session injection patterns
- `features/` - Cucumber BDD scenarios with step definitions

### Utilities
- `utils/test-base.js` - Custom test fixtures with predefined data
- `utils/APIUtils.js` - API authentication and order creation
- `utils/ExcelUtils.js` - Data-driven testing from Excel files

## Framework-Specific Conventions

### Test Data Management
- JSON files in `utils/placeOrderTestData.json` for parameterized tests
- Custom test extension provides default test data via `testDataForOrder` fixture
- Excel integration available through `ExcelUtils` class

### Locator Patterns
- CSS selectors preferred: `.card-body b`, `[routerlink*='cart']`
- Avoid generic selectors - each page object encapsulates its specific locators
- Wait strategies: `waitForLoadState('networkidle')` for navigation, `waitFor()` for element visibility

### Test Execution Commands
```bash
npm run test:headed        # Visual debugging
npm run test:ui           # Playwright UI mode
npm run webTests          # @Web tagged tests only
npm run APITests          # @API tagged tests only
npm run allure:serve      # Launch Allure reports
```

### Azure Integration
- `playwright.service.config.js` for cloud testing
- Environment variables for service tokens (not hardcoded)

## Common Development Tasks

### Adding New Page Objects
1. Create in both `pageObjects/` and `pageObjects_TS/` directories
2. Add to POManager constructor and getter methods in both versions
3. Follow existing naming: `getNewPageName()` method pattern

### BDD Test Development
- Step definitions in `features/step_definitions/steps.js`
- Use `this.poManager` for page object access in step context
- Feature files use `@Regression` and `@Validations` tags

### Error Handling
- Console logging patterns: `console.log('Order found in My Orders:', orderID)`
- Element verification before actions: check element existence/visibility
- Network waiting: Use `networkidle` for navigation completion

This framework prioritizes maintainability through clear separation of concerns, consistent patterns across JS/TS implementations, and comprehensive test data management.
