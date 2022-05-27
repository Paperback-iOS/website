<template>
	<div class="theme-generator" :style="cssProps">
		<Theme-Selector class="selector-column" @updateStyles="updateStyles" />
		<div class="spacer" />
		<Theme-Preview class="preview-column" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			defaultColors: {
				borderColor: {
					lightColor: this.generateColor("#c0c0c0", 1),
					darkColor: this.generateColor("#5f5f5f", 1),
				},
				accentColor: {
					lightColor: this.generateColor("#fd6a68", 1),
					darkColor: this.generateColor("#fd6a68", 1),
				},
				foregroundColor: {
					lightColor: this.generateColor("#fcffff", 1),
					darkColor: this.generateColor("#171717", 1),
				},
				overlayColor: {
					lightColor: this.generateColor("#f2f2f2", 0.7),
					darkColor: this.generateColor("#000000", 0.7),
				},
				titleTextColor: {
					lightColor: this.generateColor("#212121", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				backgroundColor: {
					lightColor: this.generateColor("#f2f2f2", 1),
					darkColor: this.generateColor("#000000", 1),
				},
				buttonNormalTextColor: {
					lightColor: this.generateColor("#1f1f1f", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				supertitleTextColor: {
					lightColor: this.generateColor("#5f5f5f", 1),
					darkColor: this.generateColor("#c0c0c0", 1),
				},
				buttonSelectedTextColor: {
					lightColor: this.generateColor("#ffffff", 1),
					darkColor: this.generateColor("#ffffff", 1),
				},
				separatorColor: {
					lightColor: this.generateColor("#3c3c43", 0.3),
					darkColor: this.generateColor("#545458", 0.6),
				},
				bodyTextColor: {
					lightColor: this.generateColor("#1f1f1f", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				buttonNormalBackgroundColor: {
					lightColor: this.generateColor("#ffffff", 1),
					darkColor: this.generateColor("#000000", 1),
				},
				buttonNormalBorderColor: {
					lightColor: this.generateColor("#fd6a68", 1),
					darkColor: this.generateColor("#fd6a68", 1),
				},
				buttonSelectedBackgroundColor: {
					lightColor: this.generateColor("#fd6a68", 0.5),
					darkColor: this.generateColor("#fd6a68", 0.5),
				},
				buttonSelectedBorderColor: {
					lightColor: this.generateColor("#fd6a68", 1),
					darkColor: this.generateColor("#fd6a68", 1),
				},
				subtitleTextColor: {
					lightColor: this.generateColor("#5f5f5f", 1),
					darkColor: this.generateColor("#c0c0c0", 1),
				},
				accentColorLight: {
					lightColor: this.generateColor("#fd6a68", 0.5),
					darkColor: this.generateColor("#fd6a68", 0.5),
				},
				accentTextColor: {
					lightColor: this.generateColor("#ffffff", 1),
					darkColor: this.generateColor("#ffffff", 1),
				},
			},
		};
	},
	methods: {
		updateStyles(colors) {
			this.defaultColors = colors;
			// console.log(this.defaultColors);
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
			return {
				"--paperback-color-accent": this.rgbaToString(
					this.defaultColors?.accentColor?.darkColor
				),
			};
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

.preview-column {
	position: sticky;
	top: 9rem;
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

<style>
:root {
	/* borderColor */
	--paperback-color-border: #3165bf;
	--paperback-color-border-light: #3165bf;

	/* accentColor and accentColorLight */
	--paperback-color-accent: #eb736d;
	--paperback-color-accent-light: #eb736d;
	--paperback-color-accentlight: #eb736d;
	--paperback-color-accentlight-light: #eb736d;

	/* foregroundColor */
	--paperback-color-foreground: #5260ff;
	--paperback-color-foreground-light: #5260ff;

	/* overlayColor */
	--paperback-color-overlay: #2dd36f;
	--paperback-color-overlay-light: #2dd36f;

	/* titleTextColor */
	--paperback-color-title-text: #ffc409;
	--paperback-color-title-text-light: #ffc409;

	/* subtitleTextColor */
	--paperback-color-subtitle-text: #ffc409;
	--paperback-color-subtitle-text-light: #ffc409;

	/* backgroundColor */
	--paperback-color-background: #eb445a;
	--paperback-color-background-light: #eb445a;

	/*
		buttonNormalTextColor
		buttonNormalBackgroundColor
		buttonNormalBorderColor
	*/
	--paperback-color-button-normal-text: #92949c;
	--paperback-color-button-normal-text-light: #92949c;
	--paperback-color-button-normal-background: #92949c;
	--paperback-color-button-normal-background-light: #92949c;
	--paperback-color-button-normal-border: #92949c;
	--paperback-color-button-normal-border-light: #92949c;

	/*
		buttonSelectedTextColor
		buttonSelectedBackgroundColor
		buttonSelectedBorderColor
	*/
	--paperback-color-button-selected-text: #92949c;
	--paperback-color-button-selected-text-light: #92949c;
	--paperback-color-button-selected-background: #92949c;
	--paperback-color-button-selected-background-light: #92949c;
	--paperback-color-button-selected-border: #92949c;
	--paperback-color-button-selected-border-light: #92949c;

	/* supertitleTextColor */
	--paperback-color-supertitle-text: #92949c;
	--paperback-color-supertitle-text-light: #92949c;

	/* separatorColor */
	--paperback-color-separator: #f4f5f8;
	--paperback-color-separator-light: #f4f5f8;

	/* bodyTextColor */
	--paperback-color-body-text: #f4f5f8;
	--paperback-color-body-text-light: #f4f5f8;
}
</style>
