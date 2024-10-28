import path from "node:path";
import { fileURLToPath } from "node:url";

import eslint from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/base"],
  ),

  includeIgnoreFile(gitignorePath),
  {
    rules: {
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["Layout"],
        },
      ],
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
      ecmaVersion: "latest",
    },
  },
];
