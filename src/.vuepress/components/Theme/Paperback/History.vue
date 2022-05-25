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
			History
		</div>

		<div class="container">
			<div class="today">
				<div class="shadow" style="background-color: rgb(23, 23, 23)">
					<li v-for="index in 10" :key="index"></li>
				</div>
			</div>

			<div class="yesterday" style="--bg-color: brown">testing</div>
		</div>
	</div>
</template>

<style scoped>
.yesterday {
	background: var(--bg-color);
}
</style>
