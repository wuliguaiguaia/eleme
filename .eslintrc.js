// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard' //进入项目时选的
  ],
  // required to lint *.vue files
  plugins: [
    'vue'//强制分号
    
  ],
  // add your custom rules here
  rules: {
    // "no-alert": 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'], 
    'indent':0,
    'eslint-disable-next-line ':0,
    'space-before-function-paren':0,
    'quotes': 0,
    'require-valid-default-prop':0,
    'no-labels':0,
    // 'eol-last':0 ,//强制以换行符结束

  },
  globals:{
    '$': false,
    'jquery': false
  }
}
