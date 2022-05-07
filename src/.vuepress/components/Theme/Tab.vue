<template lang="html">
	<div
		class="tab"
		v-show="isActive"
		role="tab"
		:aria-hidden="!isActive"
		:id="`tab-${label}`"
		:aria-labelledby="`tab-${label}`"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
	},
	data() {
		return {
			isActive: true,
		};
	},
};
</script>

<style lang="css"></style>
