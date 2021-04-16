# Required Methods
## getMangaDetails
### Method signature
`async getMangaDetails(mangaId: string): Promise<Manga>`

### Parameters
| Parameter | Type | Description|
|-----------|------|------------|
|  mangaId  | String | The ID of a manga. The manga ID is provided from the other discovery functions, such as the home page and performed searches. The manga ID should be used to return information about the manga, such as the title and author.|

### Returns
Given an ID, this async function should return a filled out [Manga](model-reference.md#Manga) object.

### Example Implementation
```ts
async getMangaDetails(mangaId: string): Promise<Manga> {

    // Create a request object which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}`,
        method: 'GET'
    })


    /*
    Execute the request, and retrieve the HTML page
    this.requestManager is provided to you by the parent class. Always use this to make requests.
    The second parameter is the number of retries the app is allowed to make, if the request fails the first time.
    */
    const data = await this.requestManager.schedule(request, 1)

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // -- Parse all of the information here --
    // ALWAYS use the createManga({ }) wrapper when returning
    return createManga({
        id: mangaId,
        titles: ...
        // etc
    })
}
```

## getChapters
### Method signature
`async getChapters(mangaId: string): Promise<Chapter[]>`

### Parameters
| Parameter | Type | Description|
|-----------|------|------------|
|  mangaId  | String | The ID of a manga. The manga ID is provided from the other discovery functions, such as the home page and performed searches. The manga ID should be used to return information about the manga, such as the title and author.|

### Return

Given an ID, this async function should return an array of [Chapter](model-reference.md#Chapter) objects.

### Example Implementation
```typescript
async getChapters(mangaId: string): Promise<Chapter[]> {

    // Create a request object which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}`,
        method: 'GET'
    })


    /*
    Execute the request, and retrieve the HTML page
    this.requestManager is provided to you by the parent class. Always use this to make requests.
    The second parameter is the number of retries the app is allowed to make, if the request fails the first time.
    */
    const data = await this.requestManager.schedule(request, 1)

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // Prepare a storage location for all available chapters
    let chapters: Chapter[] = []

    // Chances are, you're going to need to loop over some HTML element which each chapter identifier is displayed in
    for(let obj of $('someSelector').toArray()) {

        // Parse an individual chapter object's values here

        chapters.push(
            createChapter({
                id: "your manga chapter id here",
                mangaId: mangaId,
                // etc
            }
    }

    // Return a list of all of the chapters discovered
    return chapters
}
```

## getChapterDetails
### Method Signature
`async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails>`

### Parameters
| Parameter | Type | Description|
|-----------|------|------------|
|  mangaId  | String | The ID of a manga. The manga ID is provided from the other discovery functions, such as the home page and performed searches. The manga ID should be used to return information about the manga, such as the title and author.|
| chapterId | String | The ID of a chapter. defined by the [Get Chapters](#getchapters) method. The chapter ID can only contain letters, numbers, dashes and underscores. |

### Returns
Given both a Manga and a Chapter ID, this function should populate a [ChapterDetails](model-reference.md#ChapterDetails) object.

Example Implementation:
```typescript
async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails>

    // Create a request object which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}/${chapterId}`,
        method: 'GET'
    })


    /*
    Execute the request, and retrieve the HTML page
    this.requestManager is provided to you by the parent class. Always use this to make requests.
    The second parameter is the number of retries the app is allowed to make, if the request fails the first time.
    */
    const data = await this.requestManager.schedule(request, 1)

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // -- Parse all of the information here --

    // ALWAYS use the createChapterDetails({ }) wrapper when returning
    return createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        longstrip: false,
        pages: // An array of strings, each being a URL to a page. See the typings for more information.
    })
}
```


# Optional Methods
To be filled out
