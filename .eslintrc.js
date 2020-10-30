module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    "@typescript-eslint/no-var-requires": "off",

    /**
     * Essa regra acusa erroneamente slots com objetos nested como
     * v-slot="foo.bar" de ser inválido ele entende essa notação como
     * um modificador (que não é permitido) ao invés de um acesso a propriedade
     * do objeto do slot, isso não tem problema algum no vue-2 mas
     * no vue-3 isso não sera mais permitido.
     *
     * Como não vamos migrar pro vue-3 tão cedo e essa regra é "quebrada" pouquissimas
     * vezes desabilito-a, rever ao migrar pro vue-3.
     *
     * quem tiver usando VSCODE com vetur coloque no seu .vscode -> settings.json a linha
     * "vetur.validation.template": false
     *
     * para que o vetur passe a usar a configuração aqui no .eslintrc ao invés de sua própria
     */
    "vue/valid-v-slot": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
}
