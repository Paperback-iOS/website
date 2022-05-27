<template>
	<div>
		<div class="tabs__header">
			<div
				v-for="(tab, index) in tabs"
				:key="tab.label"
				@click="selectTab(index)"
				:class="{ tab__selected: index == selectedIndex }"
				role="tab"
				:aria-selected="tab.active"
			>
				<div v-if="tab.$slots.label">
					<vnode :vnode="tab.$slots.label" />
				</div>
				<div v-else>
					{{ tab.label }}
				</div>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	components: {
		vnode: {
			functional: true,
			render: (h, ctx) => ctx.props.vnode,
		},
	},
	data() {
		return {
			selectedIndex: 0, // the index of the selected tab,
			tabs: [], // all of the tabs
		};
	},
	created() {
		this.tabs = this.$children;
	},
	mounted() {
		this.selectTab(0);
	},
	methods: {
		selectTab(i) {
			this.selectedIndex = i;

			// loop over all the tabs
			this.tabs.forEach((tab, index) => {
				tab.isActive = index === i;
			});
		},
	},
};
</script>

<style scoped lang="css">
.tabs__header {
	display: flex;
	width: 100%;
	height: 80px;
	background-color: #111111;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	z-index: 1;
}

.tabs__header > div {
	width: 100%;
	height: 49px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
}

.tab__selected svg > path:nth-last-child(1) {
	stroke: var(--paperback-color-accent);
	fill: var(--paperback-color-accent);
}
</style>
