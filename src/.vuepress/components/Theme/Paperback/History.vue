<template>
	<div class="container">
		<div>Today</div>
		<div class="foreground">
			<div>
				<div>Title 1</div>
				<div>Vol. 1 Ch. 69</div>
				<div>
					<span>Last Page Read: 18</span>
					<span>7 hr ago</span>
				</div>
			</div>
			<div>
				<div>Title 2</div>
				<div>Vol. 1 Ch. 69</div>
				<div>
					<span>Last Page Read: 18</span>
					<span>7 hr ago</span>
				</div>
			</div>
		</div>
		<div>Yesterday</div>
		<div class="foreground">
			<div>
				<div>Title 3</div>
				<div>Vol. 1 Ch. 69</div>
				<div>
					<span>Last Page Read: 18</span>
					<span>1 day ago</span>
				</div>
			</div>
			<div>
				<div>Title 4</div>
				<div>Vol. 1 Ch. 69</div>
				<div>
					<span>Last Page Read: 18</span>
					<span>1 day ago</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	padding: 1rem;
}

.foreground {
	background: var(--paperback-foreground-color);
	border-radius: 8px;
	margin: 20px 0px;
	padding: 1rem;
}
</style>
