import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**"],

    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 }
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
    }
  }
]);
