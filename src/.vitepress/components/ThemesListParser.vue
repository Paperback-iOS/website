<template>
	<section class="fetchError" v-if="typeof themesList === 'undefined'">
		<p>Failed to fetch the available themes.</p>
		<p>Check again later.</p>
	</section>
	<section
		class="fetchSuccess"
		v-else-if="canShare"
		v-for="group in themesList.themes"
	>
		<p>
			Click the "<span>Install</span>" button and share it with your
			Paperback app to install the theme (it needs to be open in the
			background for the theme to apply).
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
				<h4 v-if="accentColor.name">
					{{
						accentColor.name
							? accentColor.name.charAt(0).toUpperCase() +
							  accentColor.name.slice(1)
							: ''
					}}
				</h4>
				<p v-for="creator in accentColor.creators">
					<span>Creator: </span>
					{{ creator.charAt(0).toUpperCase() + creator.slice(1) }}
				</p>
				<p>
					{{ accentColor.description }}
				</p>
				<section>
					<img
						v-for="mode in ['dark', 'light']"
						:src="
							getImage(
								group.name,
								subGroup.name,
								accentColor.name,
								mode
							)
						"
						alt="Theme Example Image"
					/>
				</section>
				<button
					@click="
						installTheme(
							group.name,
							subGroup.name || '',
							accentColor.name || '',
							accentColor.description as string
						)
					"
				>
					Install
				</button>
				<div class="accentColorDivider"></div>
			</section>
		</section>
	</section>
	<p v-else>
		Your browser does not support installing Paperback Themes. We recommend
		using Safari.
	</p>
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
			themesList: undefined,
			canShare: true,
		} as { themesList: ThemesList | undefined; canShare: Boolean };
	},

	async beforeMount() {
		if (!navigator.canShare) {
			this.$data.canShare = false;
			return;
		}

		const themesList = await this.fetchThemesList();

		if (themesList) {
			this.$data.themesList = themesList;
		}
	},

	methods: {
		async fetchThemesList(): Promise<void | ThemesList> {
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
			}
		},

		getImage(
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

		async fetchTheme(url: string): Promise<Blob> {
			const response = await fetch(url);
			return response.blob();
		},

		async installTheme(
			group: String,
			subGroup: String,
			accentColor: String,
			description: string
		): Promise<void> {
			const title =
				group.charAt(1).toUpperCase() + group.slice(1) + ' ' + subGroup
					? subGroup.charAt(1).toUpperCase() + subGroup.slice(1)
					: '' + ' ' + accentColor
					? accentColor.charAt(1).toUpperCase() + accentColor.slice(1)
					: '';

			const url = `https://raw.githubusercontent.com/Celarye/paperback-themes/master/themes/${group}/${
				subGroup ? subGroup + '/' : ''
			}${accentColor ? accentColor + '/' : ''}theme.pbcolors`;

			console.log(url);

			const theme = await this.fetchTheme(url);
			const themeFile = new File([theme], title + '.pbcolors');

			try {
				await navigator.share({
					title: title,
					text: description,
					files: [themeFile],
				});
			} catch (error) {
				console.log(error);
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

.accentColor > h4 {
	padding: 0 0 0.5em 0;
}

.accentColor > p {
	margin: 0 !important;
	padding: 0 0 0.5em 0;
}

.accentColor > p > span {
	font-weight: bold;
}

.accentColor > section {
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
}

.accentColor > section > img {
	width: 15em;
	display: inline !important;
}

.accentColor > button {
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

.accentColor > button:hover {
	color: var(--vp-button-brand-hover-text);
	background: var(--vp-button-brand-hover-bg);
	border: 1px solid var(--vp-button-brand-hover-border);
}

.accentColor > .accentColorDivider {
	position: relative;
	top: -1px;
	border-top: 1px solid var(--vp-c-divider);
	margin-bottom: 1em;
	width: 15em;
}

@media only screen and (min-width: 578px) {
	.accentColor > .accentColorDivider {
		width: 31em;
	}
}
</style>
