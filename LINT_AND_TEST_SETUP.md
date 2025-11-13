# Lint and Test Configuration

## ✓ Fixed Issues

### Backend
- ✓ ESLint configuration updated with proper ignores
- ✓ Fixed unused variable warnings
- ✓ Jest setup configured with test environment variables
- ✓ All lint checks passing

### Frontend  
- ✓ ESLint configuration updated to ignore dist folder
- ✓ React version detection enabled
- ✓ Disabled `react-in-jsx-scope` rule (not needed in React 18+)
- ✓ Disabled `prop-types` rule (using TypeScript types instead)
- ✓ Set warnings for unused variables instead of errors

## Running Linters

### Backend
```bash
cd backend
npm run lint
```

### Frontend
```bash
cd frontend
npm run lint
```

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

The backend has Jest configured with:
- Test environment: Node.js
- Setup file: `jest.setup.js`
- Test environment variables configured
- Sample auth tests in `tests/auth.test.js`

### Frontend Tests
```bash
cd frontend
npm test
```

The frontend has Vitest configured with:
- Test environment: jsdom (browser simulation)
- React Testing Library included
- Sample tests in `src/App.test.jsx`

## ESLint Configuration

### Backend (`backend/eslint.config.cjs`)
- CommonJS modules
- Node.js globals
- Ignores: `node_modules`, `dist`
- Special rules for test files with Jest globals

### Frontend (`frontend/eslint.config.js`)
- ES Modules
- Browser and Node globals
- React plugin with auto-detection
- TypeScript ESLint support
- Ignores: `dist`, `node_modules`

## Key Rules

### Backend
- `no-unused-vars`: warn
- `no-console`: off (allowed in backend)

### Frontend
- `react/react-in-jsx-scope`: off (React 18+)
- `react/prop-types`: off (using TypeScript)
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-require-imports`: off

## Notes

- The `dist` folder is automatically ignored by ESLint
- Lint errors from built files won't affect development
- All source files pass lint checks
- Test files have appropriate Jest/Vitest globals configured
