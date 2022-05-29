<template>
	<div id="library-page">
		<div class="header">
			<div>Done</div>
		</div>
		<div class="title">Library</div>

		<div class="container">
			<div>
				<el-divider></el-divider>
				<span class="body-text"
					><i class="el-icon-collection"></i> All Manga</span
				>
				<el-divider></el-divider>
				<span class="body-text"
					><i class="el-icon-download"></i> Downloaded Manga</span
				>
				<el-divider></el-divider>
			</div>
			<div
				class="body-text"
				style="font-size: 18px; font-weight: bold; margin: 1rem 0"
			>
				Collections
			</div>

			<div style="font-size: 18px; text-align: center; cursor: pointer">
				<span class="body-text"
					><i class="el-icon-circle-plus"></i> Add Item</span
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
#library-page {
	padding: 1rem;
}

.header {
	display: grid;
}

.header > div {
	color: var(--paperback-accent-color);
	justify-self: right;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
}

.title {
	font-size: 24px;
	font-weight: bold;
	color: var(--paperback-title-text-color);
}

.body-text {
	color: var(--paperback-body-text-color);
}

.el-icon-collection,
.el-icon-download,
.el-icon-circle-plus {
	color: var(--paperback-accent-color);
}
</style>

<style>
.el-divider--horizontal {
	margin: 8px 0;
}

.el-divider {
	background: var(--paperback-separator-color);
}
</style>
