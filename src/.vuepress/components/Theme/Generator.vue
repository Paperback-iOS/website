<template>
	<div class="theme-generator" :style="cssProps">
		<Theme-Selector class="selector-column" @updateStyles="updateStyles" />
		<div class="spacer" />
		<Theme-Preview class="preview-column" @updateTheme="updateTheme" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			theme: "dark",
			// To make the theme generator work, we need to have a default theme
			// Vue2 will not have reactivity if inital data state is not created
			defaultColors: {
				accentColor: {
					darkColor: this.generateColor("#fd6a68", 1),
					lightColor: this.generateColor("#fd6a68", 1),
				},
				accentColorLight: {
					darkColor: this.generateColor("#fd6a68", 0.5),
					lightColor: this.generateColor("#fd6a68", 0.5),
				},
				accentTextColor: {
					darkColor: this.generateColor("#ffffff", 1),
					lightColor: this.generateColor("#ffffff", 1),
				},
				backgroundColor: {
					darkColor: this.generateColor("#000000", 1),
					lightColor: this.generateColor("#f2f2f2", 1),
				},
				bodyTextColor: {
					darkColor: this.generateColor("#ebebeb", 1),
					lightColor: this.generateColor("#1f1f1f", 1),
				},
				borderColor: {
					darkColor: this.generateColor("#5f5f5f", 1),
					lightColor: this.generateColor("#c0c0c0", 1),
				},
				buttonNormalBackgroundColor: {
					darkColor: this.generateColor("#000000", 1),
					lightColor: this.generateColor("#ffffff", 1),
				},
				buttonNormalBorderColor: {
					darkColor: this.generateColor("#fd6a68", 1),
					lightColor: this.generateColor("#fd6a68", 1),
				},
				buttonNormalTextColor: {
					darkColor: this.generateColor("#ebebeb", 1),
					lightColor: this.generateColor("#1f1f1f", 1),
				},
				buttonSelectedBackgroundColor: {
					darkColor: this.generateColor("#fd6a68", 0.5),
					lightColor: this.generateColor("#fd6a68", 0.5),
				},
				buttonSelectedBorderColor: {
					darkColor: this.generateColor("#fd6a68", 1),
					lightColor: this.generateColor("#fd6a68", 1),
				},
				buttonSelectedTextColor: {
					darkColor: this.generateColor("#ffffff", 1),
					lightColor: this.generateColor("#ffffff", 1),
				},
				foregroundColor: {
					darkColor: this.generateColor("#171717", 1),
					lightColor: this.generateColor("#fcffff", 1),
				},
				overlayColor: {
					darkColor: this.generateColor("#000000", 0.7),
					lightColor: this.generateColor("#f2f2f2", 0.7),
				},
				separatorColor: {
					darkColor: this.generateColor("#545458", 0.6),
					lightColor: this.generateColor("#3c3c43", 0.3),
				},
				subtitleTextColor: {
					darkColor: this.generateColor("#c0c0c0", 1),
					lightColor: this.generateColor("#5f5f5f", 1),
				},
				supertitleTextColor: {
					darkColor: this.generateColor("#c0c0c0", 1),
					lightColor: this.generateColor("#5f5f5f", 1),
				},
				titleTextColor: {
					darkColor: this.generateColor("#ebebeb", 1),
					lightColor: this.generateColor("#212121", 1),
				},
			},
		};
	},
	methods: {
		updateStyles(colors) {
			this.defaultColors = colors;
		},
		updateTheme(theme) {
			this.theme = theme;
		},
		rgbaToString({ red, green, blue, alpha }) {
			let r = Math.round(red);
			let g = Math.round(green);
			let b = Math.round(blue);

			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		},
		generateColor(hex, alpha) {
			let rgb = this.hexToRGB(hex);

			return { ...rgb, alpha };
		},
		hexToRGB(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			let red = parseInt(result[1], 16);
			let green = parseInt(result[2], 16);
			let blue = parseInt(result[3], 16);

			return {
				red,
				green,
				blue,
			};
		},
	},
	computed: {
		cssProps() {
			let cssVariables = {};

			for (const name in this.defaultColors) {
				// split the name into its parts to form the css variable name
				let cssVariablesString = `--paperback-${name
					.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-")
					.toLowerCase()}`;

				// get the color object base on the theme
				let themeColor =
					this.theme === "dark"
						? this.defaultColors[name].darkColor
						: this.defaultColors[name].lightColor;

				// eg. --paperback-foreground-color: rgba(0, 0, 0, 1);
				cssVariables[cssVariablesString] = this.rgbaToString(
					themeColor
				);
			}

			return cssVariables;
		},
	},
};
</script>

<style scoped>
.theme-generator {
	display: flex;
	justify-content: center;
}

.selector-column {
	flex-grow: 1;
	min-width: 0;
}

.spacer {
	flex-basis: 5rem;
}

@media only screen and (max-width: 768px) {
	.spacer {
		flex-basis: 0;
		display: none;
	}

	.preview-column {
		display: none;
	}
}
</style>

<!-- This style scection isn't used, just here for reference, see computed method for used styles -->
<style scoped>
:root {
	/* borderColor */
	--paperback-border-color: #5f5f5f;

	/*
		accentColor
		accentColorLight
		accentTextColor
	*/
	--paperback-accent-color: #fd6a68;
	--paperback-accent-color-light: #fd6a68;
	--paperback-accent-text-color: #ffffff;

	/* foregroundColor */
	--paperback-foreground-color: #171717;

	/* overlayColor */
	--paperback-overlay-color: #000000;

	/* titleTextColor */
	--paperback-title-text-color: #ebebeb;

	/* backgroundColor */
	--paperback-background-color: #000000;

	/*
		buttonNormalTextColor
		buttonNormalBackgroundColor
		buttonNormalBorderColor
	*/
	--paperback-button-normal-text-color: #ebebeb;

	--paperback-button-normal-background-color: #000000;

	--paperback-button-normal-border-color: #fd6a68;

	/* supertitleTextColor */
	--paperback-supertitle-text-color: #c0c0c0;

	/*
		buttonSelectedTextColor
		buttonSelectedBackgroundColor
		buttonSelectedBorderColor
	*/
	--paperback-button-selected-text-color: #ffffff;

	--paperback-button-selected-background-color: #fd6a68;

	--paperback-button-selected-border-color: #fd6a68;

	/* separatorColor */
	--paperback-separator-color: #545458;

	/* bodyTextColor */
	--paperback-body-text-color: #ebebeb;

	/* subtitleTextColor */
	--paperback-subtitle-text-color: #c0c0c0;
}
</style>
