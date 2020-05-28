# Contributing

> You want to contribute to the website? Welcome!
> Our website runs off of VuePress. Here you will find contribution resources and advice.

If you have any questions, you can ask them in #website-dev channel in our Discord.

 * [Preparing the development environment](#preparing-the-development-environment)
 * [Guidelines](#guidelines-1)
 * [Localization](#localization)

## Preparing the development environment
### Fork the project
* Create your own fork of the repository by choosing the **Fork** option at the top right of the website github repository.
* Create a new branch before working on your new fork. The method of branching depends on the Git CLI/GUI that you use, reference your software manual, or contact us if you need help with this step.
* Once on your own branch, you're ready to start making improvements to the website

> You can use a git client like [GitHub Desktop](https://desktop.github.com/) to manage your local repository.

When your done submit a pull request. This can be done by navigating to the main page of the [website git repository](https://github.com/Paperback-iOS/website) and selecting 'pull request' at the top.  You may have to click the button titled **compare across forks**. Ensure that the base repository belongs to Paperback-iOS, whereas the head is your fork, and your branch.

### Running the website
> When you make modifications to the site, you should validate your changes and formatting yourself first.

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
* iTunes

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
### Potential issues
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
| Bulgarian  |   Rinto-kun  |                |


In development: 
|  Language  |  Translator  |    Reviewer    |
|:----------:|:------------:|:--------------:|
|  Russian   |KorewaWatchful|     Dkzver     |

### Adding a new language
 * Copy the following files:
   * `website/src/README.md` to `website/src/LANG/README.md`
   * `website/src/help` to `website/src/LANG/help`
   * `src/.vuepress/config/nav/en.js` to `src/.vuepress/config/nav/LANG.js`
   * `src/.vuepress/config/sidebar/en.js` to `src/.vuepress/config/sidebar/LANG.js`
 * Translate these files.
 * Edit `src/.vuepress/config.js` file the same way it was done for the other translations.

Don't forget to change links:
`/help/faq/#troubleshooting` -> `/fr/help/faq/#resolution-des-problemes-de-l-application`

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
