<template>
	<div class="colorGenerator">
		<Theme-Selector class="selector-column" />
		<div class="spacer" />
		<Theme-Preview class="preview-column" />
	</div>
</template>

<script></script>

<style scoped>
.colorGenerator {
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

@media only screen and (max-width: 992px) {
	.spacer {
		flex-basis: 0;
		display: none;
	}

	.preview-column {
		display: none;
	}
}
</style>
