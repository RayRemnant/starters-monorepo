import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import perfectionist from "eslint-plugin-perfectionist"
import prettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import jsonc from "eslint-plugin-jsonc"
import jsoncParser from "jsonc-eslint-parser"
import globals from "globals"

export default [
  js.configs.recommended,
  prettierConfig,
  // JSON/JSONC configuration
  ...jsonc.configs["flat/recommended-with-json"],
  {
    files: ["**/*.{json,jsonc,json5}"],
    languageOptions: {
      parser: jsoncParser
    },
    plugins: {
      perfectionist
    },
    rules: {
      "no-multiple-empty-lines": [
        "error",
        {
          max: 0,
          maxEOF: 0,
          maxBOF: 0
        }
      ],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // JSON indentation - this should fix tab issues
      "jsonc/indent": [
        "error",
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false
        }
      ],

      // Other JSON formatting
      "jsonc/object-curly-spacing": ["error", "always"],
      "jsonc/array-bracket-spacing": ["error", "never"],
      "jsonc/key-spacing": [
        "error",
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      "jsonc/comma-style": ["error", "last"],
      "jsonc/comma-dangle": ["error", "never"],
      "perfectionist/sort-objects": "off",
      "jsonc/sort-keys": [
        "error",
        {
          pathPattern: "^$", // Root level - custom order for package.json-like files
          order: [
            // Core identification
            "name",
            "version",
            "description",
            "keywords",
            "homepage",
            "bugs",
            "license",
            "author",
            "contributors",
            "funding",
            "repository",

            // Package structure & entry points
            "type",
            "main",
            "module",
            "browser",
            "exports",
            "types",
            "typings",
            "bin",
            "man",
            "directories",
            "files",

            // Scripts and configuration
            "scripts",
            "config",

            // Dependencies (in order of specificity)
            "dependencies",
            "devDependencies",
            "peerDependencies",
            "peerDependenciesMeta",
            "bundledDependencies",
            "optionalDependencies",

            // Engine and environment requirements
            "engines",
            "os",
            "cpu",

            // Publishing and package management
            "private",
            "publishConfig",
            "workspaces"

            // Tool-specific configurations (alphabetical after standard fields)
            // Examples: "babel", "eslintConfig", "prettier", "jest", etc.
          ],
          minKeys: 2
        },
        {
          pathPattern: "^scripts$", // Scripts section - alphabetical
          order: [
            "prepare",
            "preinstall",
            "install",
            "postinstall",
            "preuninstall",
            "uninstall",
            "postuninstall",
            "prepublish",
            "prepublishOnly",
            "prepack",
            "pack",
            "postpack",
            "publish",
            "postpublish",
            "prestart",
            "start",
            "poststart",
            "predev",
            "dev",
            "postdev",
            "prebuild",
            "build",
            "postbuild",
            "pretest",
            "test",
            "posttest",
            "lint",
            "format",
            "docs",
            "serve",
            "clean"
          ]
        },
        {
          pathPattern: "^(dependencies|devDependencies|peerDependencies|optionalDependencies)$", // All dependency sections - alphabetical
          order: { type: "asc" }
        },
        {
          pathPattern: ".*", // Everything else - alphabetical
          order: { type: "asc" }
        }
      ]
    }
  },
  {
    files: ["**/*.{js,mjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": typescript,
      perfectionist,
      prettier
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // Object and property sorting rules
      "perfectionist/sort-objects": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          partitionByComment: true,
          partitionByNewLine: true
        }
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          partitionByComment: true
        }
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          partitionByComment: true
        }
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          groups: [
            "type",
            "builtin",
            "external",
            "internal-type",
            "internal",
            "parent-type",
            "sibling-type",
            "parent",
            "sibling",
            "side-effect",
            "object",
            "unknown"
          ],
          newlinesBetween: "always"
        }
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],
      "perfectionist/sort-named-exports": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // Array sorting
      "perfectionist/sort-array-includes": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // JSX/React specific (if using React)
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // Class members sorting
      "perfectionist/sort-classes": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // Enum sorting
      "perfectionist/sort-enums": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // Union types sorting
      "perfectionist/sort-union-types": [
        "error",
        {
          type: "alphabetical",
          order: "asc"
        }
      ],

      // Additional useful ESLint rules
      "no-console": "off",
      "no-debugger": "error",
      "no-unused-vars": "off",
      "prefer-const": "error"
    }
  },
  // TypeScript-specific rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescript
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error"
    }
  },
  {
    ignores: ["node_modules/", "dist/", "build/", "*.min.js", "**/package-lock.json"]
  }
]
