// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// @ts-ignore
const modules = import.meta.globEager('../components/**/*.vue')
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
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
