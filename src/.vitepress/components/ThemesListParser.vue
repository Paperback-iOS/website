<template>
	<p v-if="!canShare">
		Your browser does not support installing Paperback Themes. We recommend
		using Safari.
	</p>
	<section class="fetchError" v-else-if="loading">
		<p>Loading...</p>
	</section>
	<section
		class="fetchSuccess"
		v-else-if="themesList"
		v-for="group in themesList.themes"
	>
		<p>
			Click the "<span>Install</span>" button and share it with your
			Paperback app to install the theme. You can also download the theme
			file and share that with the Paperback app. Note: In both cases the
			app needs to be open in the background for the theme to apply.
		</p>
		<section class="group">
			<h2>
				{{ group.name.charAt(0).toUpperCase() + group.name.slice(1) }}
			</h2>
			<a v-bind:href="group.source" target="_blank">Source</a>
		</section>
		<section class="subGroup" v-for="subGroup in group.subGroups">
			<h3 v-if="subGroup.name">
				{{
					subGroup.name.charAt(0).toUpperCase() +
					subGroup.name.slice(1)
				}}
			</h3>
			<section
				class="accentColor"
				v-for="accentColor in subGroup.accentColors"
			>
				<h3 v-if="accentColor.name">
					{{
						accentColor.name.charAt(0).toUpperCase() +
						accentColor.name.slice(1)
					}}
				</h3>
				<p v-for="creator in accentColor.creators">
					<span>Creator: </span>
					{{ creator.charAt(0).toUpperCase() + creator.slice(1) }}
				</p>
				<p>
					{{ accentColor.description }}
				</p>
				<section class="themeImages">
					<img
						v-for="mode in ['dark', 'light']"
						:src="
							this.getThemeImage(
								group.name,
								subGroup.name || undefined,
								accentColor.name || undefined,
								mode
							)
						"
						alt="Theme Example Image"
					/>
				</section>
				<section class="themeInstallation">
					<button
						@click="
							this.installTheme(
								group.name,
								subGroup.name || undefined,
								accentColor.name || undefined,
								accentColor.description as string
							)
						"
					>
						Install
					</button>
					<a
						:href="
							this.getThemeUrl(
								group.name,
								subGroup.name || undefined,
								accentColor.name || undefined
							)
						"
						target="_blank"
						>Or download the theme.</a
					>
				</section>
				<div class="accentColorDivider"></div>
			</section>
		</section>
	</section>
	<section class="fetchError" v-else>
		<p>Failed to fetch the available themes.</p>
		<p>Check again later.</p>
	</section>
</template>

<script lang="ts">
interface ThemesList {
	themes: Theme[];
	creators: Creator;
}

interface Theme {
	name: String;
	source: string;
	subGroups: SubGroup[];
}

interface SubGroup {
	name: String;
	accentColors: AccentColors[];
}

interface AccentColors {
	name: String;
	description: String;
	creators: String[];
}

interface Creator {
	homepage: String;
	discordUsername: String;
}

export default {
	data() {
		return {
			canShare: true,
			loading: true,
			themesList: undefined,
		} as {
			loading: Boolean;
			themesList: ThemesList | undefined;
			canShare: Boolean;
		};
	},

	async beforeMount(): Promise<void> {
		try {
			if (
				!navigator.canShare({
					title: 'Test Share',
					text: 'Testing the share method',
					files: [],
				})
			) {
				this.$data.canShare = false;
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const themesList: ThemesList | undefined = await this.fetchThemesList();
		if (themesList) {
			this.$data.themesList = themesList;
			this.$data.loading = false;
		}
	},

	methods: {
		async fetchThemesList(): Promise<ThemesList | undefined> {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes-list.json'
				);

				if (!response.ok) {
					throw new Error(
						'The fetched response did return an "ok" status.'
					);
				}

				const data = response.json();
				return data as Promise<ThemesList>;
			} catch (error) {
				console.log(error);
				return undefined;
			}
		},

		getThemeImage(
			group: String,
			subGroup: String,
			accentColor: String,
			mode: String
		): string {
			const url = `https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes/${group}/${
				subGroup ? subGroup + '/' : ''
			}${accentColor ? accentColor + '/' : ''}${mode}.png`;

			return url;
		},

		getThemeTitle(
			group: String,
			subGroup: String,
			accentColor: String
		): string {
			const title =
				group.charAt(1).toUpperCase() + group.slice(1) + ' ' + subGroup
					? subGroup.charAt(1).toUpperCase() + subGroup.slice(1)
					: '' + ' ' + accentColor
					? accentColor.charAt(1).toUpperCase() + accentColor.slice(1)
					: '';
			return title;
		},

		getThemeUrl(
			group: String,
			subGroup: String,
			accentColor: String
		): string {
			const url = `https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes/${group}/${
				subGroup ? subGroup + '/' : ''
			}${accentColor ? accentColor + '/' : ''}theme.pbcolors`;
			return url;
		},

		async fetchTheme(url: string): Promise<Blob | undefined> {
			try {
				const response = await fetch(url);
				return response.blob();
			} catch (error) {
				console.log(error);
				return undefined;
			}
		},

		async installTheme(
			group: String,
			subGroup: String,
			accentColor: String,
			description: string
		): Promise<void> {
			const title: string = this.getThemeTitle(
				group,
				subGroup,
				accentColor
			);

			const url = this.getThemeUrl(group, subGroup, accentColor);
			const theme: Blob | undefined = await this.fetchTheme(url);

			if (theme) {
				const themeFile = new File([theme], title + '.pbcolors');

				try {
					navigator.share({
						title: title,
						text: description,
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
.fetchSuccess > p > span {
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

.accentColor > p > span {
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

.themeInstallation > button {
	color: var(--vp-button-brand-text);
	background: var(--vp-button-brand-bg);
	border: 1px solid var(--vp-button-brand-border);
	border-radius: 1.5em;
	padding: 0 2em;
	line-height: 2.75em;
	font-size: 0.875em;
	border: 1px solid transparent;
	transition: color 0.25s, border-color 0.25s, background-color 0.25s;
	font-weight: 600;
	margin: 1.5em 0;
}

.themeInstallation > button:hover {
	color: var(--vp-button-brand-hover-text);
	background: var(--vp-button-brand-hover-bg);
	border: 1px solid var(--vp-button-brand-hover-border);
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
