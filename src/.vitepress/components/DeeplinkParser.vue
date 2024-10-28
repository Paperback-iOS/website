<!--
Redirect to the url scheme paperback://addRepo/?displayName=displayName&url=url
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash e.g. https://paperback-ios.github.io/extensions-default/main.
-->

<template>
  <div v-if="statusSuccess == true" class="success">
    <h1>Adding the Repository</h1>
    <section>
      <p>The repository is being added to your Paperback app.</p>
      <p>You will be redirected to it in just a moment...</p>
      <a :href="redirectUrl">Click here to manually redirect.</a>
    </section>
  </div>
  <div v-if="statusSuccess == false" class="error">
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
  <div v-else />
</template>

<script lang="ts">
export default {
  data() {
    return {
      statusSuccess: undefined,
      redirectUrl: undefined,
    } as {
      statusSuccess: boolean | undefined;
      redirectUrl: string | undefined;
    };
  },

  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const displayName = urlParams.get("displayName");
    const url = urlParams.get("url");

    if (displayName && url && (await this.fetchVersioning(url))) {
      this.$data.statusSuccess = true;
      document.title = "Adding Repository | Paperback";

      const deeplink = this.constructDeeplink(displayName, url);
      this.$data.redirectUrl = deeplink;
      window.location.replace(deeplink);
    } else {
      this.$data.statusSuccess = false;
      document.title = "Failed | Paperback";
    }
  },

  methods: {
    async fetchVersioning(url: string): Promise<JSON | null> {
      try {
        const response = await fetch(`${url}/versioning.json`);

        if (!response.ok) {
          throw new Error('The fetched response did return an "ok" status.');
        }

        const data = response.json();
        return data as Promise<JSON>;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    constructDeeplink(displayName: string, url: string) {
      return (
        "paperback://addRepo?displayName=" +
        encodeURI(displayName) +
        "&url=" +
        encodeURIComponent(url)
      );
    },
  },
};
</script>
