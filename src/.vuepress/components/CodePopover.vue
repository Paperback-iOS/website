<!--
Create a popover element for CodeLinked
-->

<template>
	<span>
		<el-popover
			placement="top"
			trigger="click"
    		> 
			<!-- Alternative trigger: v-model="visible" or trigger="hover" --> <!--width="160"-->

			<a :href="link"><code class="codepopover-title" > {{ title }} </code></a>
			<p> 
				<span> {{ desc }} </span>
				<br/>
				<span v-for="parameter in parameters" :key="parameter" class="codepopover-parameter"> {{ parameter }} <br/> </span>
			</p>
			<span slot="reference" @click="visible = true">{{ code }}</span>
		</el-popover>
	</span>
</template>

<script>

export default {
    data() {
      return {
        visible: false,
      };
    },
	props: {
		code: {
			// Text that will be rendered as the reference of the popover
			type: String,
			required: true
		},
		title: {
			// Title of the popover windows
			type: String,
			required: true,
		},
		link: {
			// Link of the title of the popover
			type: String,
			required: true,
		},
		desc: {
			// Description rendered in the popover
			type: String,
			required: true,
		},
		parameters: {
			// List of parameters rendered in the popover
			type: Array,
			required: false,
		},
	},

};

</script>

<style lang="stylus">
:not(pre)
	code.codepopover-title
			color #476582
			padding 0.25rem 0.5rem
			margin 0
			font-size 0.85em
			background-color rgba(27,31,35,0.05)
			border-radius 3px
			cursor pointer
	code.codepopover-title:hover
		text-decoration underline
	.codepopover-parameter
		margin-left 10px
		font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace
		font-size 0.85em
	
</style>
