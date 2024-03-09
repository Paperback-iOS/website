<!--
Redirect to the url scheme paperback://addRepo/?displayName=displayName&url=url
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash e.g. https://paperback-ios.github.io/extensions-default/main.
-->

<template>
  <div v-if="statusSuccess" class="success">
    <h1>Adding the Repository</h1>
    <section>
      <p>The repository is being added to your Paperback app.</p>
      <p>You will be redirected to it in just a moment...</p>
      <a :href="redirectUrl">Click here to manually redirect.</a>
    </section>
  </div>
  <div v-else class="error">
    <h1>Failed to Add the Repository</h1>
    <section>
      <p>Invalid query parameters.</p>
      <p>
        More info regarding this issue can be found
        <a
          href="https://github.com/Paperback-iOS/website/tree/master/src/.vitepress/components/DeeplinkParser.vue"
          >here</a
        >.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        statusSuccess: true,
        redirectUrl: '#',
      }
    },

    beforeMount() {
      const urlParams = new URLSearchParams(window.location.search)
      const displayName = urlParams.get('displayName')
      const url = urlParams.get('url')

      if (displayName && url) {
        const deeplink = this.constructDeeplink(displayName, url)
        this.$data.redirectUrl = deeplink
        window.location.replace(deeplink)
      } else {
        this.$data.statusSuccess = false
      }
    },

    methods: {
      constructDeeplink(displayName: string, url: string) {
        return (
          'paperback://addRepo?displayName=' +
          encodeURI(displayName) +
          '&url=' +
          encodeURIComponent(url)
        )
      },
    },
  }
</script>
