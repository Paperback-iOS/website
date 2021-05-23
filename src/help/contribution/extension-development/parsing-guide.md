---
title: A practical guide to Parsing
lang: en-US
---

# A practical guide to Parsing

We're sure that you've noticed at this point that when we're handling HTTP parsing that we are
using [CheerioJS](https://github.com/cheeriojs/cheerio). If you are familiar
with [JQuery Selectors](https://api.jquery.com/category/selectors/), fortunately a lot of this will come naturally to
you.

If you are not familiar, CheerioJS is a library which allows you to programmatically pull information from HTML. This is
the core fundamental on how Paperback works. Each source that you create is simply a set of parsing logic.

CheerioJS, just like JQuery, utilizes **CSS Selectors** as the mode of selecting elements. This means that any selector
that can be used to style elements with CSS can be used to select elements with Cheerio.


# Quick Reference Guide

## The Basics

```js
$('div').text()			// Get the text of the first 'div' block that the system can find
$('.apple').text()		// Get the text of ANY first object which has class="apple" included
$('#apple').text()		// Get the text of ANY first object which has id="apple" included
$('div.apple').text()	// Gets the text of the first 'div' block which ALSO has class="apple"
```

**An example**

```html
<p id="someText" lang="en">
    This is some text
</p>
```

---

```ts
$('p#someText').text()		// This will return 'This is some text'
$('p#someText').attr('lang')	// This will return 'en'
```

**"I need something deeper" example**

```html
<p class="someClass">
    <p class="myClass">
    	<p class="someClass">
        	Text that I want
		</p>
	</p>
</p>
```

Say in the above HTML, you need to parse out the 'Text that I want' phrase. Unfortunately, there is a big problem with
this.

* You cannot select `$('p.someClass')` as this will select the wrong element. (The root node)

Let's look at the signature for the `$` object. `$(selector, rootNode)`

In the above examples, we've only used a selector. However you are allowed to chain selectors together to be more and
more specific.

```ts
// Select a more specific area of your HTML that you wish to search inside.
let selectorContext = $('p.myClass')

/**
* At this point, selectorContext would have selected the following HTML:
* <p class="myClass">
*	<p class="someClass">
*		Text that I want
*	</p>
*</p>
* This is narrowed down enough where we can grab our text!
*/

// Select the first <p> with the class 'someClass' INSIDE of the selectorContext selection
let text = $('p.someClass', $(selectorContext)).text()	// "Text that I want"

```

## Advanced Selectors

Example HTML:

```html
<body>
    <p class="someClass" lang="en">					// Block 1
        Some Text
    </p>
    <p class="someOtherClass" lang="en-us">			// Block 2
        Some Other text
    </p>
    <p class="lastClass" lang="lang-fr">			// Block 3
        This is definitely some french text
    </p>
</body>
```

**Attribute Equals Selector**

```js
$('p[lang="en-us"]').text()	// Matches the first 'p' block with a language attribute equaling 'en-us' - Block 2
```

**Not Equals Selector**

```js
$('p[lang!="en"]').text()	// Matches the first 'p' block with a language attribute NOT equalling 'en'. - Block 2
```

**Contains Prefix Selector**

```js
$('p[lang|="en"]').text()	// Gets the first 'p' block which has a 'lang' attribute which STARTS with 'en' - Block 1
				// Note that this will ALSO match Block 2

$('p[lang|="en"]').last().text()	// This will get the LAST matching option fitting this. This will select Block 2's text.

```

**Contains Selector**

```js
$('p[lang*="en"]').text()	// Unlike the prefix selector, if any <p> containing a language which has 'en' ANYWHERE will be
                                // selected. This will select Block 1 and Block 2. (Defaulting to 1 without a .toArray())
```

**Ends With Selector**

```js
$('p[lang$="fr"]').text()	// Selects the first 'p' block which has a 'lang' attribute ENDING in 'fr'	- Block 3
```

**Starts With Selector**

```js
$('p[lang^="lang"]').text()	// Selects the first 'p' block with a 'lang' attribute STARTING with 'lang'	- Block 3
```

## Tutorial - Basic Parsing

### Loading Data

After you've made a request and have HTML available as a string, you must first tell CheerioJS to load your data.

```typescript
let data = "<div><span>some html</span></div>"// This should be the entire webpage which you've pulled.
let $ = this.cheerio.load(data)				  // This loads the Cheerio library. You may now access the DOM with the '$' keyword
```

It is recommended that you use the `$` symbol as a variable, but this is merely convention and not a requirement.

### Example

With a given HTML document, lets do some parsing.

```html
<ul id="fruits">
  <li class="apple">Three Apples</li>
  <li class="orange" data="orange-data">Four Oranges</li>
  <li meta="pear-data">Twelve Pears</li>
</ul>
```

Given the above set of HTML, say that you have loaded it into Cheerio using the instructions above. What you are looking
for, is the text inside each of the `li` objects. There should be a few thoughts which should be going through your
head;

- What _unique_ identifier is surrounding the data that I need?
	- In the example of parsing 'Three Apples', we can see that it is **always** in a `li` block, with a class
	  of `apple`
- If the object is not entirely unique, is there any constants in the formatting?
	- If there is more than 1 object with the same signature, is the piece I want always the second in the list?

In this case, to get the 'Three Apples' text, we are looking for a `li` object with a class `apple`

```js
$('li.apple')		// Selects the correct spot
$('li.apple').text()	// This will return the text inside of the selected area.
```

What if we want to get the "Twelve Pears" text? Referencing the table at the top of this document, we can use the **Attribute Equals Selector**!

```js
$('li[meta="pear-data"]').text()	// This will return 'Twelve Pears'
```

## Tutorial - Looping Example

In most cases, when you are parsing manga from a website, you will have some kind of list. And for each element of the
list, you need to get a manga object out. Lets use the following as an example.

```html
<div class="mangaList">

    <div class="mangaObject">
        <p id="title">
            Some Manga
        </p>
    </div>

    <div class="mangaObject">
        <p id="title">
            Some other Manga
        </p>
    </div>

    <div class="mangaObject">
        <p id="title">
            The last manga
        </p>
    </div>

</div>
```

We can note the following:

* Each separate manga is inside of a `div` with a class `mangaObject`
* Inside of each manga block, the title is always inside of a `p` with an ID of `title`

This brings up the question: **What happens if I select something which has more than one match?**

Fortunately, it's likely as you'd expect. **You can easily get an array of each matching block**

```ts
// Get an array of all the '<div class="mangaObject"> pieces'
let selectionArray = $('div.mangaObject').toArray()
let titles: string[] = []

// Iterate over each of the selections, and get every available title
for(let obj of selectionArray) {
    // Parse out the title. Each 'p' with the ID 'title'. Note that we want each one INSIDE of the selector we're looping in
    let title = $('p#title', $(obj)).text()
    titles.push(title)
}

// At this point, you should have a 'titles' array with 3 elements inside!
```
