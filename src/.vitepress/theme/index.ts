// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { App } from 'vue'
import Theme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './style.css'

const modules = import.meta.glob('../components/**/*.vue', {
  eager: true,
})

export default {
  extends: Theme,

  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },

  enhanceApp({ app }: { app: App }) {
    enhanceAppWithTabs(app)

    for (const path in modules) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = modules[path] as any
      app.component(value.default.name, value.default)
    }
  },
}
