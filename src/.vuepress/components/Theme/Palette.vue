<template>
	<div class="palette">
		<div
			:key="index"
			v-for="(value, key, index) in defaultColors"
			class="palette-block"
			:style="{
				'background-color': `rgb(${
					defaultColors[key].darkColor.red * 255
				}, ${defaultColors[key].darkColor.green * 255}, ${
					defaultColors[key].darkColor.blue * 255
				})`,
			}"
		>
			{{ key }}
		</div>
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			defaultColors: {
				borderColor: {
					lightColor: {
						red: 0.75400000810623169,
						alpha: 1,
						blue: 0.75400000810623169,
						green: 0.75400000810623169,
					},
					darkColor: {
						red: 0.37099999189376831,
						alpha: 1,
						blue: 0.37099999189376831,
						green: 0.37099999189376831,
					},
				},
				accentColor: {
					lightColor: {
						red: 0.99199998378753662,
						alpha: 1,
						blue: 0.40799999237060547,
						green: 0.41600000858306885,
					},
					darkColor: {
						red: 0.99124413728713989,
						alpha: 1,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
				},
				foregroundColor: {
					lightColor: {
						red: 0.98773139715194702,
						alpha: 1,
						blue: 1.0001950263977051,
						green: 1.0004180669784546,
					},
					darkColor: {
						red: 0.090000003576278687,
						alpha: 1,
						blue: 0.090000003576278687,
						green: 0.090000003576278687,
					},
				},
				overlayColor: {
					lightColor: {
						red: 0.94999998807907104,
						alpha: 0.69999999999999996,
						blue: 0.94999998807907104,
						green: 0.94999998807907104,
					},
					darkColor: {
						red: 0,
						alpha: 0.69999999999999996,
						blue: 0,
						green: 0,
					},
				},
				titleTextColor: {
					lightColor: {
						red: 0.12999999523162842,
						alpha: 1,
						blue: 0.12999999523162842,
						green: 0.12999999523162842,
					},
					darkColor: {
						red: 0.92100000381469727,
						alpha: 1,
						blue: 0.92100000381469727,
						green: 0.92100000381469727,
					},
				},
				backgroundColor: {
					lightColor: {
						red: 0.94999998807907104,
						alpha: 1,
						blue: 0.94999998807907104,
						green: 0.94999998807907104,
					},
					darkColor: {
						red: 0,
						alpha: 1,
						blue: 0,
						green: 0,
					},
				},
				buttonNormalTextColor: {
					lightColor: {
						red: 0.12999999523162842,
						alpha: 1,
						blue: 0.12999999523162842,
						green: 0.12999999523162842,
					},
					darkColor: {
						red: 0.92100000381469727,
						alpha: 1,
						blue: 0.92100000381469727,
						green: 0.92100000381469727,
					},
				},
				supertitleTextColor: {
					lightColor: {
						red: 0.37099999189376831,
						alpha: 1,
						blue: 0.37099999189376831,
						green: 0.37099999189376831,
					},
					darkColor: {
						red: 0.75400000810623169,
						alpha: 1,
						blue: 0.75400000810623169,
						green: 0.75400000810623169,
					},
				},
				buttonSelectedTextColor: {
					lightColor: {
						red: 1,
						alpha: 1,
						blue: 1,
						green: 1,
					},
					darkColor: {
						red: 1,
						alpha: 1,
						blue: 1,
						green: 1,
					},
				},
				separatorColor: {
					lightColor: {
						red: 0.23529411764705882,
						alpha: 0.28999999999999998,
						blue: 0.2627450980392157,
						green: 0.23529411764705882,
					},
					darkColor: {
						red: 0.32941176470588235,
						alpha: 0.59999999999999998,
						blue: 0.34509803921568627,
						green: 0.32941176470588235,
					},
				},
				bodyTextColor: {
					lightColor: {
						red: 0.12999999523162842,
						alpha: 1,
						blue: 0.12999999523162842,
						green: 0.12999999523162842,
					},
					darkColor: {
						red: 0.92100000381469727,
						alpha: 1,
						blue: 0.92100000381469727,
						green: 0.92100000381469727,
					},
				},
				buttonNormalBackgroundColor: {
					lightColor: {
						red: 1,
						alpha: 1,
						blue: 1,
						green: 1,
					},
					darkColor: {
						red: 0,
						alpha: 1,
						blue: 0,
						green: 0,
					},
				},
				buttonNormalBorderColor: {
					lightColor: {
						red: 0.99124413728713989,
						alpha: 1,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
					darkColor: {
						red: 0.99124413728713989,
						alpha: 1,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
				},
				buttonSelectedBackgroundColor: {
					lightColor: {
						red: 0.99124413728713989,
						alpha: 0.5,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
					darkColor: {
						red: 0.99124413728713989,
						alpha: 0.5,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
				},
				buttonSelectedBorderColor: {
					lightColor: {
						red: 0.99124413728713989,
						alpha: 1,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
					darkColor: {
						red: 0.99124413728713989,
						alpha: 1,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
				},
				subtitleTextColor: {
					lightColor: {
						red: 0.37099999189376831,
						alpha: 1,
						blue: 0.37099999189376831,
						green: 0.37099999189376831,
					},
					darkColor: {
						red: 0.75400000810623169,
						alpha: 1,
						blue: 0.75400000810623169,
						green: 0.75400000810623169,
					},
				},
				accentColorLight: {
					lightColor: {
						red: 0.99124413728713989,
						alpha: 0.5,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
					darkColor: {
						red: 0.99124413728713989,
						alpha: 0.5,
						blue: 0.40692430734634399,
						green: 0.41505861282348633,
					},
				},
			},
		};
	},
};
</script>

<style scoped>
.palette {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	margin: 20px 10px;
}

.palette-block {
	word-wrap: break-word;
	text-align: center;
	margin: 10px;
	border-radius: 4px;
	min-height: 90px;
	font-weight: 400;
	width: 45%;
}

:root {
	/* borderColor */
	--paperback-color-border: #3165bf;
	--paperback-color-border-light: #3165bf;

	/* accentColor and accentColorLight */
	--paperback-color-accent: #0f20d7;
	--paperback-color-accent-light: #0f20d7;
	--paperback-color-accentlight: #0f20d7;
	--paperback-color-accentlight-light: #0f20d7;

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

.paperback-color-border {
	background: var(--paperback-color-border);
}
</style>
