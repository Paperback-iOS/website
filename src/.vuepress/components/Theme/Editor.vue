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
							<Theme-ColorPicker />
						</el-col>
						<el-col :xl="24">
							<!-- Export Colors -->
							<Theme-Export />
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script></script>

<style scoped></style>
