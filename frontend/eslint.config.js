import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**"],

    languageOptions: {
      globals: { 
        ...globals.browser, 
        ...globals.es2021,
        // Vitest globals for testing
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      }
    },

    // DO NOT put "@eslint/js" inside plugins — it's not a plugin
    extends: [
      js.configs.recommended,                     // JavaScript rules
      ...tseslint.configs.recommended,            // TS rules
    ],
  },

  {
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react-refresh/only-export-components": "off", // Allow context exports
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    }
  }
]);
