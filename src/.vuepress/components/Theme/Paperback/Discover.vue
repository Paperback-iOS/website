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
			Discover
		</div>

		<div class="container">
			<!-- manga source tabs -->
			<el-tabs value="first">
				<el-tab-pane label="Manga 1" name="first"></el-tab-pane>
				<el-tab-pane label="Manga 2" name="second"></el-tab-pane>
			</el-tabs>

			<!-- featured section -->
			<div class="featured">
				<el-image
					class="image"
					src="https://via.placeholder.com/350x220.png"
					alt="placeholder"
				>
				</el-image>
			</div>

			<!-- genres section -->
			<div class="genres">
				<div class="flex-container">
					<span class="text">Genres</span>
					<span class="text">View &gt;</span>
				</div>
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content genres-item">Action</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content genres-item">Adventure</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content genres-item">Comedy</div>
					</el-col>
				</el-row>
			</div>

			<!-- hot updates section -->
			<el-row :gutter="20" class="hot-updates">
				<div class="flex-container">
					<span class="text">Hot Updates</span>
					<span class="text">View &gt;</span>
				</div>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
				<el-col :span="6">
					<el-badge :value="3" class="item">
						<el-image
							class="image"
							src="https://via.placeholder.com/150x250.png"
							alt="placeholder"
						>
						</el-image>
						<div>Title</div>
					</el-badge>
				</el-col>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
			</el-row>

			<!-- latest updates section -->
			<el-row :gutter="20" class="latest-updates">
				<div class="flex-container">
					<span class="text">Latest Updates</span>
					<span class="text">View &gt;</span>
				</div>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
				<el-col :span="6">
					<el-image
						class="image"
						src="https://via.placeholder.com/150x250.png"
						alt="placeholder"
					>
					</el-image>
					<div>Title</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin: 0px 1.25rem;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
	background: #eb736d;
}

.text {
	color: white;
}

.image {
	border-radius: 8px;
}

.flex-container {
	font-size: 16px;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
}

.featured,
.genres,
.hot-updates,
.latest-updates {
	margin-bottom: 1rem;
}
</style>

<style>
.el-tabs__item {
	color: #f3f3f3 !important;
}

.el-tabs__item.is-active {
	color: #eb736d !important;
}

.el-tabs__active-bar {
	background-color: #eb736d !important;
}

.el-tabs__content {
	display: none;
}
</style>
