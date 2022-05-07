<template>
	<el-container>
		<el-aside width="500px"> <Theme-Mockup /></el-aside>
		<el-main>
			<el-color-picker v-model="color" show-alpha></el-color-picker>
		</el-main>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			color: "rgba(235, 115, 109, 1)",
		};
	},
};
</script>

<style scoped></style>
