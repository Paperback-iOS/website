const config = {
  '*{.vue,.js,.cjs,.ts}': 'npm run eslint',
  '*{.vue,.md,.css,.js,.cjs,.ts,.json}': 'npm run prettier',
  '*': 'npm run build-only',
}

module.exports = config
