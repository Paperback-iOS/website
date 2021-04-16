# Required Methods
## getMangaDetails
`async getMangaDetails(mangaId: string): Promise<Manga>`

- A manga ID is defined by the source developer. However IDs are provided to Paperback in other functions, will be given to this function in the same format.

Given an ID, this async function should return a filled out Manga object.

Example Implementation:
```typescript
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
`async getChapters(mangaId: string): Promise<Chapter[]>`

- A manga ID is defined by the source developer. However IDs are provided to Paperback in other functions, will be given to this function in the same format.

Given an ID, this async function should get all available chapters for a provided chapter.

Example Implementation:
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
`async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails>`

- A manga ID is defined by the source developer. However IDs are provided to Paperback in other functions, will be given to this function in the same format.
- A ChapterID is defined by the [Get Chapters](#getChapters) method. However it is returned there, will be fed into this function.

Given both a Manga and a Chapter ID, this function should populate a ChapterDetails object, which goes into further detail of what each chapter contains.

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
