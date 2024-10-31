import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  {
    extends: [eslint.configs.recommended],
    files: ["**/*{.js,.ts,.vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*{.ts,.vue}"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    ignores: ["**/src/devtools/generated", "**/dist"],
  },
  {
    extends: [...pluginVue.configs["flat/base"]],
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
      ecmaVersion: "latest",
    },
    rules: {
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["Layout"],
        },
      ],
    },
  },
  { ignores: ["src/.vitepress/cache/**", "src/.vitepress/dist/**"] },
);
