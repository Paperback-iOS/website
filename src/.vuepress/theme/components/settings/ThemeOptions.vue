<template>
	<div class="theme-options">
		<div v-if="yuu.extraOptions && yuu.extraOptions.above" class="user-options-above">
			<component :is="yuu.extraOptions.above" />
		</div>
		<ul v-if="yuu.hasThemes" class="color-theme-options">
			<li>
				<a href="#" class="default-theme" @click.prevent="setTheme()"></a>
			</li>
			<li v-for="color in yuu.themes" :key="color">
				<a href="#" :class="`${color}-theme`" @click.prevent="setTheme(color)"></a>
			</li>
		</ul>
		<div v-if="!yuu.disableDarkTheme" class="dark-theme-options toggle-option">
			<label for="dark-theme-toggle">Enable Dark Theme?</label>
			<input id="dark-theme-toggle" v-model="darkTheme" type="checkbox" @change="toggleDarkTheme" />
		</div>
		<div v-if="yuu.hasThemes && !yuu.disableThemeIgnore" class="force-theme-options toggle-option">
			<label for="force-theme-toggle">Ignore Forced Themes?</label>
			<input id="force-theme-toggle" v-model="ignoreForcedThemes" type="checkbox" @change="toggleForcedThemes" />
		</div>
		<div v-if="yuu.extraOptions && yuu.extraOptions.below" class="user-options-below">
			<component :is="yuu.extraOptions.below" />
		</div>
	</div>
</template>

<script>
import yuuConfig from '@theme/mixins/yuuConfig.js';
import themeHandler from '@theme/mixins/themeHandler.js';
import darkThemeHandler from '@theme/mixins/darkThemeHandler.js';

export default {
	name: 'ThemeOptions',
	mixins: [yuuConfig, themeHandler, darkThemeHandler],
};
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.color-theme-options {
	display: flex;
	justify-content: space-around;

	li {
		width: 33%;
		text-align: center;

		a {
			width: 15px;
			height: 15px;
			border-radius: 2px;

			&.default-theme {
				background-color: $accentColor;
			}

			&.blue-theme {
				background-color: $blueAccentColor;
			}

			&.red-theme {
				background-color: $redAccentColor;
			}

			&.purple-theme {
				background-color: $purpleAccentColor;
			}
		}
	}
}

.toggle-option {
	display: flex;
	justify-content: space-between;
	align-items: center;

	label {
		padding-right: 0.25em;
	}
}
</style>
