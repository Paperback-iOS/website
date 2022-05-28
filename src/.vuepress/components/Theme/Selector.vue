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
							@input="updateColors(name, 'lightColor', $event)"
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
							@input="updateColors(name, 'darkColor', $event)"
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
			></i><i class="download-json el-icon-download" @click="downloadBlob(JSON.stringify(outputColors), 'theme.pbcolors', 'application/octet-stream')"></i><code>{{ outputColors }}</code></pre>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			copyButonActive: false,
			activeColor: "borderColor",
			// To make the theme generator work, we need to have a default theme
			// Vue2 will not have reactivity if inital data state is not created
			defaultColors: {
				// A: This is not used at the moment, leave values as is.
				borderColor: {
					lightColor: this.generateColor("#c0c0c0", 1),
					darkColor: this.generateColor("#5f5f5f", 1),
				},
				accentColor: {
					lightColor: this.generateColor("#fd6a68", 1),
					darkColor: this.generateColor("#fd6a68", 1),
				},
				// B: The boxes https://imgur.com/a/IzMuE0c (everything in red is what will change, this does not include buttons which have destructive functions (like "Clear")).
				foregroundColor: {
					lightColor: this.generateColor("#fcffff", 1),
					darkColor: this.generateColor("#171717", 1),
				},
				// C: Overlay when refreshing library. Change "X", "Y" and "Z" to the same values you choose for the background ("E").
				overlayColor: {
					lightColor: this.generateColor("#f2f2f2", 0.7),
					darkColor: this.generateColor("#000000", 0.7),
				},
				// D: This is not used at the moment, leave values as is.
				titleTextColor: {
					lightColor: this.generateColor("#212121", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				// E: The background https://imgur.com/a/6ErnRpk (everything in red is what will change, this does not include buttons which have destructive functions (like "Clear")).
				backgroundColor: {
					lightColor: this.generateColor("#f2f2f2", 1),
					darkColor: this.generateColor("#000000", 1),
				},
				// F: This is not used at the moment, leave values as is.
				buttonNormalTextColor: {
					lightColor: this.generateColor("#1f1f1f", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				// G: This is not used at the moment, leave values as is.
				supertitleTextColor: {
					lightColor: this.generateColor("#5f5f5f", 1),
					darkColor: this.generateColor("#c0c0c0", 1),
				},
				// H: This is not used at the moment, leave values as is.
				buttonSelectedTextColor: {
					lightColor: this.generateColor("#ffffff", 1),
					darkColor: this.generateColor("#ffffff", 1),
				},
				// I: Thin line between certain elements (visible in "Discover", "History" and the manga viewer).
				separatorColor: {
					lightColor: this.generateColor("#3c3c43", 0.3),
					darkColor: this.generateColor("#545458", 0.6),
				},
				// J: Main text https://imgur.com/a/1syDeob (everything in red is what will change, this does not include buttons which have destructive functions (like "Clear")).
				bodyTextColor: {
					lightColor: this.generateColor("#1f1f1f", 1),
					darkColor: this.generateColor("#ebebeb", 1),
				},
				// K: This is not used at the moment, leave values as is.
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
				// L: Secondary text https://imgur.com/a/N3Azw8R (everything in red is what will change, this does not include buttons which have destructive functions (like "Clear")).
				subtitleTextColor: {
					lightColor: this.generateColor("#5f5f5f", 1),
					darkColor: this.generateColor("#c0c0c0", 1),
				},
				// M: This is not used at the moment, leave values as is.
				accentColorLight: {
					lightColor: this.generateColor("#fd6a68", 0.5),
					darkColor: this.generateColor("#fd6a68", 0.5),
				},
				// 6: The text inside of the red boxes/buttons in the standard theme.
				accentTextColor: {
					lightColor: this.generateColor("#ffffff", 1),
					darkColor: this.generateColor("#ffffff", 1),
				},
			},
		};
	},
	methods: {
		copyToClipBoard(textToCopy) {
			this.copyButonActive = true;

			if (navigator.clipboard) {
				navigator.clipboard.writeText(textToCopy);
			} else {
				let copyelement = document.createElement("textarea");
				document.body.appendChild(copyelement);
				copyelement.value = textToCopy;
				copyelement.select();
				document.execCommand("Copy");
				copyelement.remove();
			}

			setTimeout(() => {
				this.copyButonActive = false;
			}, 1000);
		},
		setActiveColor(name) {
			this.activeColor = name;
		},
		updateColors(name, theme, event) {
			let { alpha } = this.defaultColors[name][theme];
			let rgba = this.generateColor(event.target.value, alpha);

			this.$set(this.defaultColors[name], theme, rgba);
			this.$emit("updateStyles", this.defaultColors);
		},
		generateColor(hex, alpha) {
			let rgb = this.hexToRGB(hex);

			return { ...rgb, alpha };
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
		downloadURL(data, fileName) {
			const a = document.createElement("a");
			a.href = data;
			a.download = fileName;
			document.body.appendChild(a);
			a.style.display = "none";
			a.click();
			a.remove();
		},
		downloadBlob(data, fileName, mimeType) {
			// create a Blob from our buffer
			const blob = new Blob([data], {
				type: mimeType,
			});
			const url = window.URL.createObjectURL(blob);
			this.downloadURL(url, fileName);
			setTimeout(() => window.URL.revokeObjectURL(url), 1000);
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
	font-weight: 600;
	cursor: pointer;
	position: absolute;
	top: 0.8em;
	right: 3em;
}

div[class*="language-"] .download-json {
	display: inline-block;
	font-weight: 600;
	cursor: pointer;
	position: absolute;
	top: 0.8em;
	right: 5em;
}

.paperback-color-border {
	background: var(--paperback-border-color);
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
