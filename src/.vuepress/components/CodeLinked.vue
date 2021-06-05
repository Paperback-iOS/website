<!--
Highlight and render in a code block the text passed as a <slot>.
The component will link popovers to keywords defined in KeywordsData using CodePopover component.

To keep spaces and indentation, the component can be used with 

::: linkedcode js
```
CODE
```
:::

<CodeLinked language="js">
```
CODE
```
</CodeLinked
-->

<template>
<!--<div :class="'language-' + language">-->
<pre :class="'linked-code language-' + language">
<code><slot></slot></code>
</pre>
<!--</div>-->
</template>

<script>

// Prism is used for syntax highlighting
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript';

// Additionals pluggins
//import 'prismjs/plugins/show-language/prism-show-language.js'
//import 'prismjs/plugins/keep-markup/prism-keep-markup.js'
// class = "no-keep-markup "


// https://github.com/PrismJS/prism/blob/80d475e4d8ddc8c5d744a4143b3078545d72d6aa/prism.js#L47

// We don't want Prism to render all code blocks, including on other pages
// We will manually call highlightElement for this vue component in `mounted`
Prism.manual = true;

// Vue is used to add the popover component
import Vue from 'vue'
import CodePopoverVue from './CodePopover.vue'

// Define which words should be linked
const KeywordsData = {
    createRequestObject: {
        title: "RequestObject",
        link: "/help/guides/extension-development/model-reference/#request",
        desc: "Make a request",
        parameters: ["url: string", "method: string", "..."]
    },
    createChapter: {
        title: "Chapter",
        link: "/help/guides/extension-development/model-reference/#chapter",
        desc: "Contains most metadata about a chapter.",
        parameters: ["id: string", "mangaId: string", "chapNum: Number"]
    },
	createManga: {
        title: "Manga",
        link: "/help/guides/extension-development/model-reference/#manga",
        desc: "Represent a Manga",
        parameters: ["id: string", "titles: [string]"]
    },
}

export default {
    props: {
		// Language of the code, used for syntax highlighting
		language: {
			type: String,
			required: false,
		},
    },
	async mounted() {
		// We highlight this component 
		const code = this.$el
		Prism.highlightElement(code);

		// Parameter: async: bool

		// We can highlight only a particular component
		//const code = this.$el.getElementsByClassName("linked-code")
		//Prism.highlightElement(code.children[0]);
		
	}
}

// After the syntax highlighting, we search for registred keywords in KeywordsData and 
// replace them with instances of CodePopover component
Prism.hooks.add('after-highlight', function (env) {

	//if (env.element.classList.contains('linked-code') && env.element.parentNode.tagName.toLowerCase() === 'pre') { // If <code> countains linked-code
	if (env.element.classList.contains('linked-code') && env.element.tagName.toLowerCase() === 'pre') {
			/*
			console.log("after-highlight");
			console.log(env)

			console.log(`code: ${env.code}`)
			console.log(`html: ${env.element.innerHTML}`)
			*/
            
			// We find keywords and use a <span> placeholder to be able to find them with getElementsByClassName
            for (const keyword of Object.keys(KeywordsData)) {
                env.element.innerHTML = env.element.innerHTML.replaceAll(keyword, `<span class="replacePlaceholder">${keyword}</span>`)
            }
            
            let itemsCollection = env.element.getElementsByClassName("replacePlaceholder")
            
			//console.log(itemsCollection)

            // Adding CodePopover components must be done after all innerHTML modifications
            // as modifying innerHTML indeed breaks associated events

            // The following loop will destroy element from the HTMLCollection itemsCollection one by one and replace them by CodePopover instances
            while (itemsCollection.length > 0) {
                const item = itemsCollection[0]

				// The parent is used to replace item
				const itemParent = item.parentNode

				// The keyword was previously passed as innerText
                const keyword = item.innerText

				/*
                console.log("Length itemsCollection", itemsCollection.length)
                console.log("item", item)
                console.log("item innertext", item.innerText)
                console.log("item parent",itemParent)
				*/

				// We create a new instance of CodePopover component, with data from KeywordsData[keyword]
				// https://css-tricks.com/creating-vue-js-component-instances-programmatically/#creating-the-instance
                var ComponentClass = Vue.extend(CodePopoverVue)
                var instance = new ComponentClass({
                    propsData: { code: keyword,
                                 title: KeywordsData[keyword].title,
                                 link: KeywordsData[keyword].link,
                                 desc: KeywordsData[keyword].desc,
                                 parameters: KeywordsData[keyword].parameters}
                })
				instance.$mount()
                
				// We replace item with our new CodePopover component
                itemParent.replaceChild(instance.$el, item);
            }
	}
})
</script>

<style lang="stylus">
.el-popover__reference
	cursor pointer

pre.linked-code
	// Code block style
	font-size 0.85em
	font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace
	padding-bottom 0px !important
	// Language name
	position relative
	&::before
		position absolute
		z-index 3
		top 0.8em
		right 1em
		font-size 0.75rem
		color rgba(255, 255, 255, 0.4)

// Language name
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/styles/code.styl
for lang in js ts
	pre.linked-code.language-{lang}
		&:before
			content ('' + lang)

pre.language-javascript
	&:before
		content "js"

pre.language-typescript
	&:before
		content "ts"

</style>
