<template>
  <section v-if="loading" class="fetching">
    <p>Loading...</p>
  </section>
  <section
    v-for="group in themesList.themes"
    v-else-if="themesList"
    :key="group.name"
    class="fetchSuccess"
  >
    <section v-if="canShare">
      <p>
        Click the "<span>Install</span>" button and share it with your Paperback
        app to install the theme. You can also download the theme file and share
        that with the Paperback app.
      </p>
      <p>Notes:</p>
      <ul>
        <li>
          The app needs to be open in the background while sharing the theme for
          it to apply.
        </li>
        <li>
          Mac users need to download the theme file and open it to install it.
        </li>
      </ul>
    </section>
    <section v-else>
      <p>
        Your browser does not support direct theme installation. Instead, you
        can download the theme file and share that with the Paperback app.
      </p>
      <p>Notes:</p>
      <ul>
        <li>
          The app needs to be open in the background while sharing the theme for
          it to apply.
        </li>
        <li>
          Mac users need to download the theme file and open it to install it.
        </li>
      </ul>
    </section>
    <section class="group">
      <h2>
        {{ group.name.charAt(0).toUpperCase() + group.name.slice(1) }}
      </h2>
      <a :href="group.source" target="_blank" rel="noreferrer">Source</a>
    </section>
    <section
      v-for="subGroup in group.subGroups"
      :key="subGroup.name"
      class="subGroup"
    >
      <h3 v-if="subGroup.name">
        {{ subGroup.name.charAt(0).toUpperCase() + subGroup.name.slice(1) }}
      </h3>
      <section
        v-for="accentColor in subGroup.accentColors"
        :key="accentColor.name"
        class="accentColor"
      >
        <h3 v-if="accentColor.name">
          {{
            accentColor.name.charAt(0).toUpperCase() + accentColor.name.slice(1)
          }}
        </h3>
        <p>
          <span class="label"
            >Creator<span v-if="accentColor.creators.length > 1">s</span>:
          </span>
          <span v-for="creator in accentColor.creators" :key="creator">
            {{ creator.charAt(0).toUpperCase() + creator.slice(1)
            }}<span
              v-if="
                !(
                  accentColor.creators.length - 1 ==
                  accentColor.creators.indexOf(creator)
                )
              "
              >,
            </span>
          </span>
        </p>
        <p>
          {{ accentColor.description }}
        </p>
        <section class="themeImages">
          <img
            v-for="mode in ['dark', 'light']"
            :key="mode"
            :src="
              getThemeImage(group.name, subGroup.name, accentColor.name, mode)
            "
            alt="Theme Example Image"
          />
        </section>
        <section class="themeInstallation">
          <button
            v-if="canShare"
            @click="installTheme(group.name, subGroup.name, accentColor.name)"
          >
            Install
          </button>
          <a
            :href="getThemeUrl(group.name, subGroup.name, accentColor.name)"
            target="_blank"
            rel="noreferrer"
            >Download</a
          >
        </section>
        <div class="accentColorDivider" />
      </section>
    </section>
    <p>
      These themes are hosted on the Paperback Themes GitHub repository, you can
      find it
      <a href="https://github.com/Celarye/Paperback-themes">here</a>.
    </p>
  </section>
  <section v-else class="fetchError">
    <p>Failed to fetch the available themes.</p>
    <p>
      Either check again later or manually get them from the Paperback Themes
      GitHub repository which you can find
      <a href="https://github.com/Celarye/Paperback-themes">here</a>.
    </p>
  </section>
</template>

<script lang="ts">
interface ThemesList {
  themes: Theme[];
}

interface Theme {
  name: string;
  source: string;
  subGroups: SubGroup[];
}

interface SubGroup {
  name: string;
  accentColors: AccentColor[];
}

interface AccentColor {
  name: string;
  description: string;
  creators: string[];
}

export default {
  data() {
    return {
      canShare: true,
      loading: true,
      themesList: undefined,
    } as {
      canShare: boolean;
      loading: boolean;
      themesList: ThemesList | undefined;
    };
  },

  async mounted(): Promise<void> {
    try {
      if (
        !navigator.canShare({
          title: "Test",
          files: [],
        })
      ) {
        this.$data.canShare = true;
      }
    } catch (error) {
      console.log(error);
      this.$data.canShare = false;
    }

    const themesList: ThemesList | null = await this.fetchThemesList();
    if (themesList) {
      this.$data.themesList = themesList;
      this.$data.loading = false;
    }
  },

  methods: {
    async fetchThemesList(): Promise<ThemesList | null> {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes-list.json",
        );

        if (!response.ok) {
          throw new Error('The fetched response did return an "ok" status.');
        }

        const data = response.json();
        return data as Promise<ThemesList>;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getThemeImage(
      group: string,
      subGroup: string,
      accentColor: string,
      mode: string,
    ): string {
      const url = `https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes/${group}/${
        subGroup ? subGroup + "/" : ""
      }${accentColor ? accentColor + "/" : ""}${mode}.png`;

      return url;
    },

    getThemeTitle(
      group: string,
      subGroup: string,
      accentColor: string,
    ): string {
      const title = `${group.charAt(0).toUpperCase() + group.slice(1)}${
        subGroup
          ? " " + subGroup.charAt(0).toUpperCase() + subGroup.slice(1)
          : ""
      }${
        accentColor
          ? " " + accentColor.charAt(0).toUpperCase() + accentColor.slice(1)
          : ""
      }`;

      return title;
    },

    getThemeUrl(group: string, subGroup: string, accentColor: string): string {
      const url = `https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes/${group}/${
        subGroup ? subGroup + "/" : ""
      }${accentColor ? accentColor + "/" : ""}theme.pbcolors`;
      return url;
    },

    async fetchTheme(url: string): Promise<Blob | null> {
      try {
        const response = await fetch(url);
        return response.blob();
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async installTheme(
      group: string,
      subGroup: string,
      accentColor: string,
    ): Promise<void> {
      const title: string = this.getThemeTitle(group, subGroup, accentColor);

      const url = this.getThemeUrl(group, subGroup, accentColor);
      const theme: Blob | null = await this.fetchTheme(url);

      if (theme) {
        const themeFile = new File([theme], title + ".pbcolors", {
          type: "application/pbcolors",
        });

        try {
          await navigator.share({
            files: [themeFile],
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="css">
.fetchSuccess > section > p > span {
  font-weight: bold;
}

.group {
  display: flex;
  align-items: end;
  gap: 0.5em;
  padding-bottom: 0.5em;
}

.group > h2 {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.group > a {
  font-size: 0.75em;
}
.subGroup {
  padding-left: 1em;
  border-left: 1px solid var(--vp-c-divider);
  margin-bottom: 1em;
}

.subGroup > h3 {
  margin: 0 !important;
  padding: 0 0 0.5em 0;
}

.accentColor {
  padding-left: 1em;
  border-left: 1px solid var(--vp-c-divider);
}

.accentColor > h3 {
  margin: 0 !important;
  padding: 0 0 0.5em 0;
}

.accentColor > p {
  margin: 0 !important;
  padding: 0 0 0.5em 0;
}

.accentColor > p > span.label {
  font-weight: bold;
}

.themeImages {
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
}

.themeImages > img {
  width: 47.5%;
  display: inline !important;
}

.themeInstallation {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-bottom: 1.5em;
}

section.themeInstallation {
  padding-bottom: 0 !important;
}

.themeInstallation > button {
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 1.5em;
  padding: 0 2em;
  line-height: 2.75em;
  font-size: 0.875em;
  border: 1px solid transparent;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
  font-weight: 600;
  margin: 1.5em 0 0 0;
}

.themeInstallation > button:hover {
  color: var(--vp-button-brand-hover-text);
  background: var(--vp-button-brand-hover-bg);
  border: 1px solid var(--vp-button-brand-hover-border);
}

.themeInstallation > button:active {
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
}

.themeInstallation > a {
  margin: 1.5em 0;
}

.accentColor > .accentColorDivider {
  position: relative;
  top: -1px;
  border-top: 1px solid var(--vp-c-divider);
  margin-bottom: 1em;
  width: 100%;
}

@media only screen and (min-width: 397px) {
  .themeInstallation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    padding-bottom: 0;
  }

  .themeInstallation > button {
    margin: 1.5em 0;
  }
}

@media only screen and (min-width: 594px) {
  .themeImages {
    gap: 1.7em;
  }

  .themeImages > img {
    width: 15em;
    display: inline !important;
  }

  .accentColor > .accentColorDivider {
    width: 31.7em;
  }
}
</style>
