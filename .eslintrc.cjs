/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    // add your custom rules here
    rules: {
        indent: ['error', 4, {
            ignoredNodes: ['TemplateLiteral'],
            SwitchCase: 1
        }],
        'no-tabs': ['error', { allowIndentationTabs: true }],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'linebreak-style': ['warn', 'windows'],
        'template-curly-spacing': 'off',
        'max-len': ['off', { code: 120 }],
        'no-console': 'off',
        'arrow-parens': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        curly: ['error', 'multi-line'],
        'import/no-extraneous-dependencies': 'off',
        'require-await': 0,
        'global-require': 0,
        'import/no-unresolved': 0,
        'import/newline-after-import': 0,
        'no-underscore-dangle': 0,

        // TypeScript specific rules
        '@typescript-eslint/no-explicit-any': 'warn',

        // Vue specific rules
        'vue/multi-word-component-names': ['error', {
            ignores: ['default', 'index', '[name]', 'admin', 'login', 'register', 'user', 'account', 'profile', 'welcome']
        }],
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 4],
        'vue/no-v-html': 'off',
        'vue/attribute-hyphenation': 'off'
    }
}
