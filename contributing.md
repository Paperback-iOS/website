# Contributing

> You want to contribute to the website? Welcome!
> You will find here resources and advices that could help you.

If you have any questions, you can ask them in #website-dev channel in our Discord.

 * [Preparing the development environment](#preparing-the-development-environment)
 * [Guidelines](#guidelines-1)
 * [Localization](#localization)

<!-- /code_chunk_output -->


## Preparing the development environment
### Fork the project
* Fork the repo.
* **Always create a new branch before working on your fork.**
* You can now improve the website.

> You can use a git client like [GitHub Desktop](https://desktop.github.com/) to manage your local repository.

When your done submit a pull request.

### Running the website
> When you make modifications to the site it can be useful to render the code. You will thus see how the modifications look like.

See [Building local enviroment](https://github.com/Paperback-iOS/website#building-local-enviroment)

## Guidelines
### Glossary

 * App/application --> app
 * Device/iPhone/iPad/phone --> iPhone or iPad
 * iOS --> iOS or iPadOS

> Be careful of capitalization:

* Paperback
* MangaDex

* AltStore
* AltServer

* Safari
* macOS

### Syntax and layout
> To create a numbered list use `1.` on all lines:
```markdown
1. Line 1
1. Line 2
```

> Write `.IPA` in a code block.

> Use `[Image]()` or `[GIF]()` to link to an explicative picture.

### "Not up to date" warning
> You've made a major modification to the English version of the site and you want to show that a translation is not up to date?
> You can  mark a page as "not up to date" by adding the following code at the top of the concerned page.

```html
<notuptodate/>
```
It will create a translated warning saying:
> Major changes have been made in the English version of this page. We suggest you to use this one.

### Components
You can use the following components. Try not to abuse of `warning`.
```markdown
::: tip Title
 Content
:::
```
```markdown
::: warning Title
 Content
:::
```
```markdown
:::: el-tabs
::: el-tab-pane label="Tab1"
Content1
:::
::: el-tab-pane label="Tab2"
Content2
:::
::::
```
```html
<el-tag type="warning">Not the Windows Store app!</el-tag>
```
```html
<Download text="from here"/>
```
```html
<notuptodate/>
```
### Potential issue
**Note that `tabs` currently needs to begin by a `h3` and finish by an `ol` components.** 
Otherwise there will be padding issues. See [PR #20](https://github.com/Paperback-iOS/website/pull/20)

## Localization
You want to translate the website?
The following languages are currently available:
|  Language  |  Translator  |    Reviewer    |
|:----------:|:------------:|:--------------:|
|   English  |              |                |
|   French   |     Lemon    |  Sirus, fma16  |
|  Italiano  |   Kinpatsu   |                |
| Nederlands |     Joery    |       Syn      |


In development: 
|  Language  |  Translator  |    Reviewer    |
|:----------:|:------------:|:--------------:|
|  Russian   |KorewaWatchful|     Dkzver     |


### Adding a new language
* Copy `website/src/README.md` to `website/src/LANG/README.md` and `website/src/help` to `website/src/LANG/help`.
* Don't forget to edit `.vuepress` folder.

### Translation decisions
> You will find here decisions made for the translation. 
> If you want to change or improve them, please make the modification in all the website. It will allow to have a consistent translation.

<details>
  <summary>French</summary>
  
  * "An ad-free manga reader for iOS. " : "Une application pour lire des manga, sur iOS, sans publicités"
  * "Getting started" : "Démarrer"
  
  * "Patron" : "Supporter sur Patreon"
  
  * "Public build" : "version accessible au publique"
  * "Full release" : "publication définitive"
  
  * Ponctuation: use `’`
</details>