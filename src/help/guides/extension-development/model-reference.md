# Models
## Manga
### Description

The Manga object contains most metadata about a manga. Different manga objects are differentiated by the Manga ID, and
changing the Manga ID will return a different manga.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| id | String | The given identifier of this Manga. This may be unique to the source which uses it. For example, one source may use the value '1234' to identify a manga, whereas another one may use the value 'One-Piece' to identify |
| image | String | A URL pointing to a thumbnail which can be displayed to present the manga. |
| rating | Number | The rating which users have given this manga. Use `0` if the manga is unrated or the source has no rating system in place. |
| status | [MangaStatus](#mangastatus) | The status of the manga, indicating if the manga is ongoing or completed. |
| titles | String Array | An array of titles which this Manga is called. The first title is the manga's official title, while extra entries are treated as alternate titles for the manga. |

### Optional Fields

| Name | Type | Description |
|------|------|-------------|
| langFlag | String | A language code for the Manga, if one is available. Examples: `en` is English, `jp` is Japanese, etc. |
| langName | String | The full name of the manga's language. `English`, `Japanese`, etc. |
| artist | String | The name of the manga's artist. Multiple artists should be concatenated into a String with a delimiter such as a comma separating each artist. |
| author | String | The name of the manga's author. Multiple authors should be concatenated into a String with a delimiter such as a comma separating each author. |
| avgRating | Number | The average rating of the manga. May be the same value as the `rating` field. |
| covers | String Array | Additional covers for the manga. Each entry is a URL pointing to the cover image. |
| desc | String | A description of this manga. |
| follows | Number | The number of followers of the manga if the source supports following mangas and displays follower counts. |
| tags | [TagSection](#tagsection) Array | An array containing the various tag sections. Only the first entry is actually displayed in the app. |
| users | Number | The number of users subscribed to the manga. May be the same value as the `follows` field. |
| views | Number | The number of views this manga has had. |
| hentai | Boolean | Whether or not this manga is a hentai. If it is set to true, the manga will not be visible to the user unless the user enables mature manga. |
| relatedIds | String Array | The IDs of related manga. |
| lastUpdate | String | A string showing when the manga was last updated. It might either be an absolute date (`March 1, 2021`) or a relative date (`2 days ago`). |

## MangaStatus

An integer enum representing the various statuses a manga can have.

### Values

| Name | Value | Description |
|------|-------|-------------|
| Completed | 0 | A manga that has officially completed production. Does not mean that the current chapter list contains all chapters that the manga will ever have, as sources can add special pages posted on social media or scanlations for chapters in languages other than the official release language. |
| Ongoing | 1 | A manga that is still releasing chapters. |

## Tag

A model representing an individual tag.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| id | String | The internal identifier for the tag. Usually either the tag's name or a number that represents the tag. |
| label | String | The text for the tag that is shown to the user. |

## TagSection

A model representing a section of tags. Most sources have a section for official genres, and some sources might have a
section of user-defined tags in addition to the official genres. Currently, only one tag section is displayed in a
manga, although this might change in the future.

### Required Fields

| Name | Type | Description |
|------|------|-------------|
| id | String | The ID representing this tag section. |
| label | String | The name of the Tag Section. The name is not currently shown to the user, but this may change in future versions of Paperback. |
| tags | [Tag](#tag) Array | An array of tags. |
