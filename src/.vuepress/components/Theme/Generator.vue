<template>
	<div class="theme-generator">
		<Theme-Selector class="selector-column" />
		<div class="spacer" />
		<Theme-Preview class="preview-column" />
	</div>
</template>

<script></script>

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
