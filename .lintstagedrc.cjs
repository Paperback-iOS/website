const config = {
  '*{.vue,.ts}': () => 'npm run tsc',
  '*{.vue,.cjs,.ts}': 'npm run eslint',
  '*{.vue,.md,.css,.cjs,.ts,.json}': 'npm run prettier',
  '*': 'npm run build-only',
}

module.exports = config
