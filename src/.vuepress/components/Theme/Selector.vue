<template>
	<div>
		<ul class="select-colors">
			<li
				class="item"
				:class="{ isOpen: activeColor === name ? true : false }"
				:key="index"
				v-for="(value, name, index) in defaultColors"
				@click="setActiveColor(name)"
			>
				<div class="title-row">
					<div class="title-row-start">
						<i
							:class="{
								'el-icon-brush':
									activeColor !== name ? true : false,
								'el-icon-edit-outline':
									activeColor === name ? true : false,
							}"
						></i>
						&nbsp;
						{{
							name[0].toUpperCase() +
							name
								.substring(1)
								.split(/(?=[A-Z])/)
								.join(" ")
						}}
					</div>
					<div class="title-row-end">
						<svg
							width="10px"
							height="6px"
							viewBox="0 0 10 6"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g
								id="Welcome"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<g
									id="Desktop-HD"
									transform="translate(-1025.000000, -335.000000)"
									stroke="#AEB4BE"
									strokeWidth="2"
								>
									<polyline
										id="arrow"
										transform="translate(1030.000000, 338.000000) rotate(90.000000) translate(-1030.000000, -338.000000) "
										points="1028 334 1032 338.020022 1028 342"
									></polyline>
								</g>
							</g>
						</svg>
					</div>
				</div>

				<ul class="submenu">
					<li class="subcategory">
						<div class="heading-groups">
							<span
								>Light&nbsp;
								<code>
									{{
										rgbToHex(defaultColors[name].lightColor)
									}}
								</code>
							</span>
						</div>

						<input
							@input="update(name, 'lightColor', $event)"
							type="color"
							id="body"
							name="body"
							:value="rgbToHex(defaultColors[name].lightColor)"
						/>
					</li>
					<li class="subcategory">
						<div class="heading-groups">
							<span
								>Dark&nbsp;
								<code>
									{{
										rgbToHex(defaultColors[name].darkColor)
									}}
								</code>
							</span>
						</div>

						<input
							@input="update(name, 'darkColor', $event)"
							type="color"
							id="body"
							name="body"
							:value="rgbToHex(defaultColors[name].darkColor)"
						/>
					</li>
				</ul>
			</li>
		</ul>
		<div class="output language-json">
			<pre class="language-json"><i
				:class="{
					'el-icon-copy-document': !copyButonActive,
					'el-icon-check': copyButonActive,
				}"
				class="copy-json"
				@click="copyToClipBoard(JSON.stringify(outputColors))"
			></i><code>{{ outputColors }}</code></pre>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			copyButonActive: false,
			activeColor: "borderColor",
			defaultColors: {
				borderColor: {
					lightColor: {
						red: 255 * 0.8,
						green: 255 * 0.8,
						blue: 255 * 0.8,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.4,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
				},
				accentColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
				},
				foregroundColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 1,
						blue: 255 * 1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.1,
						green: 255 * 0.1,
						blue: 255 * 0.1,
						alpha: 1,
					},
				},
				overlayColor: {
					lightColor: {
						red: 255 * 0.9,
						green: 255 * 0.9,
						blue: 255 * 0.9,
						alpha: 0.7,
					},
					darkColor: {
						red: 255 * 0,
						green: 255 * 0,
						blue: 255 * 0,
						alpha: 0.7,
					},
				},
				titleTextColor: {
					lightColor: {
						red: 255 * 0.1,
						green: 255 * 0.1,
						blue: 255 * 0.1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.9,
						green: 255 * 0.9,
						blue: 255 * 0.9,
						alpha: 1,
					},
				},
				backgroundColor: {
					lightColor: {
						red: 255 * 0.9,
						green: 255 * 0.9,
						blue: 255 * 0.9,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0,
						green: 255 * 0,
						blue: 255 * 0,
						alpha: 1,
					},
				},
				buttonNormalTextColor: {
					lightColor: {
						red: 255 * 0.1,
						green: 255 * 0.1,
						blue: 255 * 0.1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.9,
						green: 255 * 0.9,
						blue: 255 * 0.9,
						alpha: 1,
					},
				},
				supertitleTextColor: {
					lightColor: {
						red: 255 * 0.4,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.8,
						green: 255 * 0.8,
						blue: 255 * 0.8,
						alpha: 1,
					},
				},
				buttonSelectedTextColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 1,
						blue: 255 * 1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 1,
						blue: 255 * 1,
						alpha: 1,
					},
				},
				separatorColor: {
					lightColor: {
						red: 255 * 0.2,
						green: 255 * 0.2,
						blue: 255 * 0.3,
						alpha: 0.3,
					},
					darkColor: {
						red: 255 * 0.3,
						green: 255 * 0.3,
						blue: 255 * 0.3,
						alpha: 0.6,
					},
				},
				bodyTextColor: {
					lightColor: {
						red: 255 * 0.1,
						green: 255 * 0.1,
						blue: 255 * 0.1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.9,
						green: 255 * 0.9,
						blue: 255 * 0.9,
						alpha: 1,
					},
				},
				buttonNormalBackgroundColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 1,
						blue: 255 * 1,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0,
						green: 255 * 0,
						blue: 255 * 0,
						alpha: 1,
					},
				},
				buttonNormalBorderColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
				},
				buttonSelectedBackgroundColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 0.5,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 0.5,
					},
				},
				buttonSelectedBorderColor: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
				},
				subtitleTextColor: {
					lightColor: {
						red: 255 * 0.4,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 1,
					},
					darkColor: {
						red: 255 * 0.8,
						green: 255 * 0.8,
						blue: 255 * 0.8,
						alpha: 1,
					},
				},
				accentColorLight: {
					lightColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 0.5,
					},
					darkColor: {
						red: 255 * 1,
						green: 255 * 0.4,
						blue: 255 * 0.4,
						alpha: 0.5,
					},
				},
			},
		};
	},
	methods: {
		copyToClipBoard(textToCopy) {
			this.copyButonActive = true;
			navigator.clipboard.writeText(textToCopy);
			setTimeout(() => {
				this.copyButonActive = false;
			}, 1000);
		},
		setActiveColor(name) {
			this.activeColor = name;
		},
		isOpen(name) {
			this.activeColor === name ? true : false;
		},
		update(name, theme, event) {
			let rgb = this.hexToRGB(event.target.value);
			let rgba = { ...this.defaultColors[name][theme], ...rgb };

			this.$set(this.defaultColors[name], theme, rgba);
		},
		componentToHex(c) {
			const hex = c.toString(16);
			return hex.length === 1 ? `0${hex}` : hex;
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
		rgbToHex({ red, green, blue }) {
			let r = Math.round(red);
			let g = Math.round(green);
			let b = Math.round(blue);

			return (
				"#" +
				this.componentToHex(r) +
				this.componentToHex(g) +
				this.componentToHex(b)
			);
		},
	},
	computed: {
		outputColors() {
			let temp = JSON.parse(JSON.stringify(this.defaultColors));

			for (const key in temp) {
				temp[key].darkColor.red /= 255;
				temp[key].darkColor.green /= 255;
				temp[key].darkColor.blue /= 255;
				temp[key].lightColor.red /= 255;
				temp[key].lightColor.green /= 255;
				temp[key].lightColor.blue /= 255;
			}

			return temp;
		},
	},
};
</script>

<style scoped>
.output {
	position: relative;
}

div[class*="language-"] .copy-json {
	display: inline-block;
	cursor: pointer;
	position: absolute;
	top: 35px;
	right: 15px;
}

.paperback-color-border {
	background: var(--paperback-color-border);
}

.title-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
}

.title-row-start {
	font-size: 1.2rem;
	display: flex;
	align-items: center;
}

.title-row-end {
	display: flex;
}

.select-colors,
.submenu {
	margin: 0;
	padding: 0;
}

.select-colors {
	display: block;
	padding-top: 20px;
	margin-bottom: 80px;
	font-size: 0.875rem;
	font-weight: 500;
	margin-block-start: 2rem;
	margin-block-end: 4rem;
}

.select-colors li {
	list-style-type: none;
}

.item {
	margin: 0;
	position: relative;
	border-bottom: 1px solid rgba(115, 132, 154, 0.2);
}

.item {
	cursor: pointer;
}

.item svg {
	margin: 1rem;
	transition: 100ms transform;
	pointer-events: none;
}

.item:first-child {
	border-top: 1px solid rgba(115, 132, 154, 0.2);
}

.subcategory {
	height: 0;
	opacity: 0;
	margin: 0;
	pointer-events: none;
	transition: height 0.35s cubic-bezier(0.36, 0.66, 0.04, 1) 25ms,
		opacity 0.35s cubic-bezier(0.36, 0.66, 0.04, 1) 25ms;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.subcategory :global .color-dot {
	margin-inline-end: 1rem;
}

.subcategory .heading-groups {
	display: flex;
	padding-inline-start: 2rem;
}

.item.isOpen svg {
	transform: rotate(180deg);
}

.item.isOpen .subcategory {
	height: 4.5rem;
	opacity: 1;
	pointer-events: all;
	transition: height 0.35s cubic-bezier(0.36, 0.66, 0.04, 1) 25ms,
		opacity 0.35s cubic-bezier(0.36, 0.66, 0.04, 1) 0s;
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
