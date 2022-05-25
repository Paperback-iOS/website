<template>
	<div>
		<div
			style="
				color: white;
				font-size: 18px;
				font-weight: bold;
				text-align: center;
			"
		>
			Search Everything
		</div>

		<div class="container">
			<div>
				<el-input placeholder="Search">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>

			<!-- manga source section -->
			<div class="manga-source">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-image
							class="image"
							src="https://via.placeholder.com/250x250.png"
							alt="placeholder"
						>
						</el-image>

						<div class="manga-source-item">Manga 1</div>
					</el-col>
					<el-col :span="8">
						<el-image
							class="image"
							src="https://via.placeholder.com/250x250.png"
							alt="placeholder"
						>
						</el-image>
						<div class="manga-source-item">Manga 2</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin: 0px 1.25rem;
}
</style>
