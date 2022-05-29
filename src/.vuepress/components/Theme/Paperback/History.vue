<template>
	<div id="history-page">
		<div class="header">
			<div class="title">History</div>
			<div>Clear</div>
		</div>

		<div class="container">
			<div class="body-text day-text">Today</div>
			<div class="foreground">
				<div class="history-item">
					<div>
						<el-image
							class="image"
							src="https://via.placeholder.com/45x70.png"
							alt="placeholder"
						>
						</el-image>
					</div>
					<div>
						<div class="body-text">Title 1</div>
						<div class="body-text">Vol. 1 Ch. 69</div>
						<div class="subtitle-text">
							<span>Last Page Read: 27</span>
							<span>7 hr ago</span>
						</div>
					</div>
				</div>
				<div class="history-item">
					<div>
						<el-image
							class="image"
							src="https://via.placeholder.com/45x70.png"
							alt="placeholder"
						>
						</el-image>
					</div>
					<div>
						<div class="body-text">Title 2</div>
						<div class="body-text">Vol. 1 Ch. 420</div>
						<div class="subtitle-text">
							<span>Last Page Read: 20</span>
							<span>8 hr ago</span>
						</div>
					</div>
				</div>
			</div>

			<div class="body-text day-text">Yesterday</div>
			<div class="foreground">
				<div class="history-item">
					<div>
						<el-image
							class="image"
							src="https://via.placeholder.com/45x70.png"
							alt="placeholder"
						>
						</el-image>
					</div>
					<div>
						<div class="body-text">Title 3</div>
						<div class="body-text">Vol. 1 Ch. 5</div>
						<div class="subtitle-text">
							<span>Last Page Read: 21</span>
							<span>1 day ago</span>
						</div>
					</div>
				</div>
				<div class="history-item">
					<div>
						<el-image
							class="image"
							src="https://via.placeholder.com/45x70.png"
							alt="placeholder"
						>
						</el-image>
					</div>
					<div>
						<div class="body-text">Title 4</div>
						<div class="body-text">Vol. 1 Ch. 124</div>
						<div class="subtitle-text">
							<span>Last Page Read: 18</span>
							<span>1 day ago</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	padding: 1rem;
}

.container > .day-text {
	margin-top: 20px;
	margin-bottom: 10px;
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

.header > div:nth-child(2) {
	color: var(--paperback-accent-color);
	justify-self: right;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
}

.title {
	color: var(--paperback-title-text-color);
	font-size: 18px;
	font-weight: bold;
}

.foreground {
	background: var(--paperback-foreground-color);
	border-radius: 8px;
	padding: 0.8rem;
}

.history-item {
	display: flex;
	padding: 2px 0;
}

.history-item div {
	margin: 0 2px;
}

.image {
	border-radius: 8px;
}

.day-text {
	font-size: 18px;
	font-weight: bold;
}

.body-text {
	color: var(--paperback-body-text-color);
}

.subtitle-text {
	font-size: 14px;
	padding: 10px 0;
	color: var(--paperback-subtitle-text-color);
	border-bottom: var(--paperback-separator-color) solid 1px;
}

.subtitle-text > span:nth-child(2) {
	margin-left: 15px;
}
</style>
