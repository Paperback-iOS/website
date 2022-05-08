<template>
	<el-row :gutter="10">
		<el-col :md="24" :lg="12" :xl="6">
			<!-- iPhone Mockup -->
			<Theme-Mockup />
		</el-col>
		<el-col :md="24" :lg="12" :xl="18">
			<el-row :gutter="10">
				<el-col :lg="24" :xl="10">
					<!-- Theme Colors -->
					<Theme-Palette />
				</el-col>
				<el-col :lg="24" :xl="14">
					<el-row :gutter="10">
						<el-col :xl="24">
							<!-- Color Picker -->
							<div class="grid-content bg-purple">
								Colors Picker
								<el-color-picker
									v-model="color"
									show-alpha
								></el-color-picker>
							</div>
						</el-col>
						<el-col :xl="24">
							<!-- Export Colors -->
							<div class="grid-content bg-purple">Export</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
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

<style scoped>
.grid-content {
	margin: 20px 0px;
	border-radius: 4px;
	min-height: 36px;
}
.bg-purple {
	background-color: purple;
}
</style>
