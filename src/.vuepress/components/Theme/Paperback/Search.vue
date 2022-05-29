<template>
	<div id="search-page">
		<div class="header">
			<div class="title">Search Everything</div>
			<div>Search</div>
		</div>

		<div class="container">
			<div>
				<el-input placeholder="Search">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>

			<!-- manga source section -->
			<div class="manga-source">
				<el-row>
					<el-col :span="8">
						<div class="manga-content">Manga 1 Logo</div>

						<div class="manga-source-text">Manga 1</div>
					</el-col>
					<el-col :span="8">
						<div class="manga-content">Manga 2 Logo</div>

						<div class="manga-source-text">Manga 2</div>
					</el-col>
					<el-col :span="8">
						<div class="manga-content">Manga 3 Logo</div>

						<div class="manga-source-text">Manga 1</div>
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

.header {
	margin: 0rem 1.25rem;
	margin-bottom: 1rem;
	display: grid;
}

.header > * {
	grid-column-start: 1;
	grid-row-start: 1;
	justify-self: center;
}

.title {
	color: var(--paperback-body-text-color);
	font-size: 18px;
	font-weight: bold;
}

/* Search text beside title */
.header > div:nth-child(2) {
	justify-self: right;
	color: #222222;
	cursor: pointer;
}

.manga-content {
	text-align: center;
	border-radius: 4px;
	width: 80px;
	min-height: 80px;
	color: var(--paperback-body-text-color);
	background: var(--paperback-foreground-color);
}

.manga-source-text {
	color: var(--paperback-body-text-color);
}

.el-input__icon {
	height: 0;
	line-height: 30px;
}
</style>

<style>
#search-page .el-input__inner {
	background: var(--paperback-foreground-color);
	border: none;
	height: 30px;
	line-height: 30px;
	margin-bottom: 1rem;
}
</style>
