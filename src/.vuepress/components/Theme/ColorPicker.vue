<template>
	<div
		class="grid-content"
		:style="{
			'background-color': color,
		}"
	>
		Colors Picker
		<el-color-picker v-model="color" show-alpha></el-color-picker>
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			color: "rgba(235, 115, 109, 1)",
		};
	},
};
</script>

<style scoped>
.grid-content {
	margin: 20px 0px;
	border-radius: 4px;
	min-height: 30rem;
}
.bg-purple {
	background-color: color;
}
</style>
