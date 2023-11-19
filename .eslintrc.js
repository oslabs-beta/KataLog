module.exports = {
  "env": {
    "browser": true,
    "es2022": true // Update to the latest ECMAScript version or specify a different version
  },
  "extends": [
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "files": [
        ".eslintrc.js", // Adjust file pattern if necessary
        ".eslintrc.cjs"
      ],
      "env": {
        "node": true
      },
      "parserOptions": {
        "sourceType": "script"
      }
    },
    {
      "files": ["*.jsx", "*.tsx"], // Patterns for React files
      "rules": {
        "indent": ["error", 2] // Indentation rule set to 2 spaces for React files
        // Add other React-specific rules here if needed
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": 2022, // Update to a specific ECMAScript version
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "version": "detect" // Specify your React version or use "detect"
    }
  },
  "rules": {
    // Add or override rules as needed
    "indent": ["error", 2] // Global indentation rule set to 2 spaces
  }
}
  