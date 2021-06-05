# Available keywords:
 * RequestObject
 * Chapter
 * Manga

# Using `::: linkedcode ts`

::: linkedcode ts
```ts
async getMangaDetails(mangaId: string): Promise<Manga> {

    // Create a createRequestObject which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}`,
        method: 'GET'
    })

    return createChapter({ ... })

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // ALWAYS use the createManga({ }) wrapper when returning
    return createManga({
        id: mangaId,
        titles: ...
        // etc
    })
}
```
:::

# Using `<CodeLinked language="ts">`
<CodeLinked language="ts">
```typescript
async getMangaDetails(mangaId: string): Promise<Manga> {

    // Create a createRequestObject which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}`,
        method: 'GET'
    })

    return createChapter({ ... })

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // ALWAYS use the createManga({ }) wrapper when returning
    return createManga({
        id: mangaId,
        titles: ...
        // etc
    })
}
```
</CodeLinked>

# Classic code block
```js
async getMangaDetails(mangaId: string): Promise<Manga> {

    // Create a createRequestObject which when executed, will yield a HTML page containing the data needed to fill out a Manga object
    const request = createRequestObject({
        url: `https://yourwebsite.com/manga/${mangaId}`,
        method: 'GET'
    })

    return createChapter({ ... })

    // Prepare to parse the page using CheerioJS (Class object included by parent class)
    let $ = this.cheerio.load(data.data)

    // ALWAYS use the createManga({ }) wrapper when returning
    return createManga({
        id: mangaId,
        titles: ...
        // etc
    })
}
```