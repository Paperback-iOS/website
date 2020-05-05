export default {
	data() {
		return {
			yuu: {},
		};
	},

	mounted() {
		const { yuu = {} } = this.$site.themeConfig;

		this.yuu = {
			themes: yuu.colorThemes || ['blue', 'red', 'purple'],
			defaultColorTheme: yuu.defaultColorTheme || 'default',
			defaultDarkTheme: yuu.defaultDarkTheme || false,
			disableDarkTheme: yuu.disableDarkTheme || false,
			disableThemeIgnore: yuu.disableThemeIgnore || false,
			extraOptions: yuu.extraOptions || {},
		};

		this.yuu.hasThemes = Array.isArray(this.yuu.themes) && this.yuu.themes.length > 0;
	},
};
