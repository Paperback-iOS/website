// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './style.css'

const modules = import.meta.glob('../components/**/*.vue', {
  eager: true,
})

const components: any[] = []

for (const path in modules) {
  components.push(modules[path].default)
}

export default {
  extends: Theme,

  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },

  enhanceApp({ app }) {
    enhanceAppWithTabs(app)

    components.forEach((component) => {
      app.component(component.name, component)
    })
  },
}
