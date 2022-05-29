<template>
	<div id="discover-page">
		<div class="header">
			<div class="title">Discover</div>
			<i class="el-icon-cloudy header-icon"> </i>
		</div>

		<div class="container">
			<!-- manga source tabs -->
			<el-tabs value="first" class="manga-tabs">
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
					<span class="body-text">Genres</span>
					<span class="body-text">View &gt;</span>
				</div>
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="genres-content accent-text">Action</div>
					</el-col>
					<el-col :span="8">
						<div class="genres-content accent-text">Adventure</div>
					</el-col>
					<el-col :span="8">
						<div class="genres-content accent-text">Adventure</div>
					</el-col>
				</el-row>
			</div>

			<!-- hot updates section -->
			<el-row :gutter="20" class="hot-updates">
				<div class="flex-container">
					<span class="body-text">Hot Updates</span>
					<span class="body-text">View &gt;</span>
				</div>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
				<el-col :span="8">
					<el-badge :value="3" class="badge-item">
						<el-image
							class="image"
							src="https://via.placeholder.com/100x150.png"
							alt="placeholder"
						>
						</el-image>
						<div class="body-text">Title</div>
					</el-badge>
				</el-col>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
			</el-row>

			<!-- latest updates section -->
			<el-row :gutter="20" class="latest-updates">
				<div class="flex-container">
					<span class="body-text">Latest Updates</span>
					<span class="body-text">View &gt;</span>
				</div>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
				<el-col :span="8">
					<el-image
						class="image"
						src="https://via.placeholder.com/100x150.png"
						alt="placeholder"
					>
					</el-image>
					<div class="body-text">Title</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin: 0px 1.25rem;
}

.header {
	margin: 0 1.25rem;
	display: grid;
}

.header > * {
	grid-column-start: 1;
	grid-row-start: 1;
	justify-self: center;
}

.header-icon {
	color: var(--paperback-accent-color);
	justify-self: right;
	font-size: 1.5rem;
	cursor: pointer;
}

.title {
	color: var(--paperback-title-text-color);
	font-size: 18px;
	font-weight: bold;
}

.genres-content {
	border-radius: 4px;
	min-height: 36px;
	background: var(--paperback-accent-color);
}

.body-text {
	color: var(--paperback-body-text-color);
	padding-bottom: 5px;
}

.accent-text {
	color: var(--paperback-accent-text-color);
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
#discover-page .manga-tabs .el-tabs__item.is-active {
	color: var(--paperback-accent-color) !important;
}

#discover-page .manga-tabs .el-tabs__item {
	color: var(--paperback-body-text-color) !important;
}

#discover-page .el-badge__content,
#discover-page .manga-tabs .el-tabs__active-bar {
	background-color: var(--paperback-accent-color) !important;
}

#discover-page .manga-tabs .el-tabs__content {
	display: none !important;
}
</style>
