# Models

## Function Wrappers

Most of the specialized object types have a corresponding wrapper functions. While developing a source, these wrappers
seem to be nonfunctional. However, these wrappers are crucial, as they are the bridge between the JavaScript layer that
the extension runs on, and the Swift layer that the app runs on. The wrappers convert the Javascript object into a Swift
object that the app can use.

::: danger Warning
Not wrapping a created object with a wrapper function **will cause the app to crash** once the app
gets the object. There will also be no way to find out which object was the cause of the crash, and the unit tests will
not easily reveal the missing wrapper, as the conversion is only done within the app. The crashing behavior may be fixed
in a later version of the app, where the source will just fail instead of bringing the app down along with it.
:::

::: tip Tip
Every time an object is created using braces (`{}`), it should always be wrapped.
:::

### List of Wrapper Functions

- `createChapter` for [Chapter](#chapter) objects.
- `createChapterDetails` for [ChapterDetails](#chapterdetails) objects.
- `createIconText` for [IconText](#icontext) objects.
- `createManga` for [Manga](#manga) objects.
- `createMangaTile` for [MangaTile](#mangatile) objects.
- `createPagedResults` for [PagedResults](#pagedresults) objects.
- `createSearchRequest` for [SearchRequest](#searchrequest) objects.
- `createTag` for [Tag](#tag) objects.
- `createTagSection` for [TagSection](#tagsection) objects.

## Chapter

The Chapter object contains most metadata about a chapter. Different chapters are differentiated by the Chapter ID.
Changing the chapter ID will cause a different chapter entry to show up, even if another chapter has the same chapter
number.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | A given identifier of this chapter. This may be unique to the source. For example, one source may use `Chapter-1` in it's URLs to identify this chapter, whereas other sources may use some numeric identifier, such as `123456`. |
| `mangaId` | String | The given identifier of the Manga that owns this chapter. This should match the id of the manga that the chapter is for. |
| `chapNum` | Number | The number of the chapter, which is used for sorting the chapter list. The number may be a decimal. Multiple chapters with the same number will be sorted based on their volume number or the group that created the chapter, if it exists. Otherwise, the chapters will be sorted on the chapter ID. |
| `langCode` | [LanguageCode](#languagecode) | The language code which this chapter is associated with. This is used along with the `Content settings` option to filter the chapter list so only chapters for the languages specified by the user are shown. |

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| `name` | String | The title of the chapter. |
| `volume` | Number | The volume that the chapter belongs to. It is recommended to leave the volume number out if every chapter does not have a corresponding volume number, as the volume number interferes with sorting. |
| `group` | String | The group that posted the chapter. |
| `time` | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object | The date that the chapter is published. If omitted, the chapter will have a creation of the time when the chapter list was loaded. |

## ChapterDetails

The ChapterDetails object contains a small amount of metadata about the chapter and contains the list of pages.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | The chapter ID of the chapter that the object respresents. |
| `mangaId` | String | The given identifier of the Manga that owns this chapter. This should match the id of the manga that the chapter is for. |
| `pages` | String Array | The list of pages in the chapter. The pages are ordered by the index of the array, where the 0th index is the first page, and so on. Each item should be a link to the image file that represents the page. |
| `longStrip` | Boolean | Indicates whether or not the chapter should be rendered in **Long Strip Mode**. A long strip is a webtoon or any other form of manga that uses very tall but narrow images. |

## IconText

An icon text represents a line of text and an optional icon.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `text` | String | The text that the object represents. |

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| `icon` | String | THe icon that the object represents. |

## LanguageCode

A string enum defining full language names, and the corresponding language code.

::: warning Warning
Some full language names have typos. These may be fixed in a future version.
:::

### Values

| Language Name | Language Code |
|---------------|---------------|
| `BENGALI` | `bd` |
| `BRAZILIAN` | `br` |
| `BULGARIAN` | `bg` |
| `CHINEESE` | `cn` |
| `CHINEESE_HONGKONG` | `hk` |
| `CZECH` | `cz` |
| `DANISH` | `dk` |
| `DUTCH` | `nl` |
| `ENGLISH` | `gb` |
| `FINNISH` | `fi` |
| `FRENCH` | `fr` |
| `GERMAN` | `de` |
| `GREEK` | `gr` |
| `HUNGARIAN` | `hu` |
| `INDIAN` | `in` |
| `INDONESIAN` | `id` |
| `IRAN` | `ir` |
| `ISRELI` | `il` |
| `ITALIAN` | `it` |
| `JAPANESE` | `jp` |
| `KOREAN` | `kr` |
| `LITHUANIAN` | `lt` |
| `MALAY` | `my` |
| `MEXIAN` | `mx` |
| `MONGOLIAN` | `mn` |
| `NORWEGIAN` | `no` |
| `PHILIPPINE` | `ph` |
| `POLISH` | `pl` |
| `PORTUGUESE` | `pt` |
| `ROMANIAN` | `ro` |
| `RUSSIAN` | `ru` |
| `SAMI` | `si` |
| `SANSKRIT` | `sa` |
| `SPANISH` | `es` |
| `THAI` | `th` |
| `TURKISH` | `tr` |
| `UKRAINIAN` | `ua` |
| `UNKNOWN` | `_unknown` |
| `VIETNAMESE` | `vn` |
| `WELSH` | `gb` |

## Manga

The Manga object contains most metadata about a manga. Different manga objects are differentiated by the Manga ID, and
changing the Manga ID will return a different manga.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | The given identifier of this Manga. This may be unique to the source which uses it. For example, one source may use the value '1234' to identify a manga, whereas another one may use the value 'One-Piece' to identify |
| `image` | String | A URL pointing to a thumbnail which can be displayed to present the manga. |
| `rating` | Number | The rating which users have given this manga. Use `0` if the manga is unrated or the source has no rating system in place. |
| `status` | [MangaStatus](#mangastatus) | The status of the manga, indicating if the manga is ongoing or completed. |
| `titles` | String Array | An array of titles which this Manga is called. The first title is the manga's official title, while extra entries are treated as alternate titles for the manga. |

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| `langFlag` | String | A language code for the Manga, if one is available. Examples: `en` is English, `jp` is Japanese, etc. |
| `langName` | String | The full name of the manga's language. `English`, `Japanese`, etc. |
| `artist` | String | The name of the manga's artist. Multiple artists should be concatenated into a String with a delimiter such as a comma separating each artist. |
| `author` | String | The name of the manga's author. Multiple authors should be concatenated into a String with a delimiter such as a comma separating each author. |
| `avgRating` | Number | The average rating of the manga. May be the same value as the `rating` field. |
| `covers` | String Array | Additional covers for the manga. Each entry is a URL pointing to the cover image. |
| `desc` | String | A description of this manga. |
| `follows` | Number | The number of followers of the manga if the source supports following mangas and displays follower counts. |
| `tags` | [TagSection](#tagsection) Array | An array containing the various tag sections. Only the first entry is actually displayed in the app. |
| `users` | Number | The number of users subscribed to the manga. May be the same value as the `follows` field. |
| `views` | Number | The number of views this manga has had. |
| `hentai` | Boolean | Whether or not this manga is a hentai. If it is set to true, the manga will not be visible to the user unless the user enables mature manga. |
| `relatedIds` | String Array | The IDs of related manga. |
| `lastUpdate` | String | A string showing when the manga was last updated. It might either be an absolute date (`March 1, 2021`) or a relative date (`2 days ago`). |

## MangaStatus

An integer enum representing the various statuses a manga can have.

### Values

| Name | Value | Description |
|------|:-----:|-------------|
| `Completed` | 0 | A manga that has officially completed production. Does not mean that the current chapter list contains all chapters that the manga will ever have, as sources can add special pages posted on social media or scanlations for chapters in languages other than the official release language. |
| `Ongoing` | 1 | A manga that is still releasing chapters. |

## MangaTile

A tile representing a manga. This is a more barebones version of [the Manga object](#manga), intended for things like
homepages and searches which will not return most manga metadata.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | The given identifier of this Manga. This may be unique to the source which uses it. For example, one source may use the value '1234' to identify a manga, whereas another one may use the value 'One-Piece' to identify |
| `image` | String | A URL pointing to a thumbnail which can be displayed to present the manga. |
| `title` | [IconText](#icontext) | An Icon Text object representing the title of the manga. |

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| `subtitleText` | [IconText](#icontext) | An Icon Text object representing the subtitle of the manga. |
| `primaryText` | [IconText](#icontext) | An Icon Text which can be shown as primary text to the thumbnail. This is rendered in the bottom left of the manga object on the view. |
| `secondaryText` | [IconText](#icontext) | An Icon Text which can be shown as secondary text to the thumbnail. This is rendered on the bottom right of the manga object on the view. |

## PagedResults

An object representing a "page" of requests. There is no limit to how many mangas fit in a page, that is up to the
source to decide. These objects use the [metadata](metadata/) field.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| results | [MangaTile](#mangatile) Array | The mangas that were found in the page. |
| metadata | any | The metadata to carry onto future calls of the function returning the object. Reference the [page on metadata](metadata/) to learn more. |

## SearchRequest

An object representing the various properties in a search. The `title` parameter is the only parameter that is supported
by the search request, and future versions of the API plan on changing the way advanced searches are done.

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| `title` | String | The text that the user is searching in the search box. **Note: The title may be empty, such as if the user deletes the entire query. While some sources just treat an empty search as a queue to return all chapters, other sources might reject empty searches. Make sure to adequately deal with empty searches.** |
| `author` | String | The author that the user is searching works by. |
| `artist` | String | The artist that the user is searching works by. |
| `status` | [MangaStatus](#mangastatus) | The status of the manga. |
| `hStatus` | Boolean | Whether or not to return only explicit results or to exclude all explicit results. |
| `includeDemographic` | String Array | The demographics to include in the search. |
| `includeTheme` | String Array | The themes to include in the search. |
| `includeFormat` | String Array | The formats to include in the search. |
| `includeContent` | String Array | The content to include in the search. |
| `includeGenre` | String Array | The genres to include in the search. |
| `includeOperator` | String Array | The operators to include in the search. |
| `excludeDemographic` | String Array | The demographics to exclude in the search. |
| `excludeTheme` | String Array | The themes to exclude in the search. |
| `excludeFormat` | String Array | The formats to exclude in the search. |
| `excludeContent` | String Array | The content to exclude in the search. |
| `excludeGenre` | String Array | The genres to exclude in the search. |
| `excludeOperator` | String Array | The operators to exclude in the search. |

## Tag

A model representing an individual tag.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | The internal identifier for the tag. Usually either the tag's name or a number that represents the tag. |
| `label` | String | The text for the tag that is shown to the user. |

## TagSection

A model representing a section of tags. Most sources have a section for official genres, and some sources might have a
section of user-defined tags in addition to the official genres. Currently, only one tag section is displayed in a
manga, although this might change in the future.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | String | The ID representing this tag section. |
| `label` | String | The name of the Tag Section. The name is not currently shown to the user, but this may change in future versions of Paperback. |
| `tags` | [Tag](#tag) Array | An array of tags. |
