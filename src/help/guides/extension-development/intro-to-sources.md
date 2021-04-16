### Introduction: A Manga Reader Without Servers

When developing a Manga Reader, first and foremost, you need to gather your content from somewhere. There are many
services out there, such as WebToons or MangaDex which run their own content providing system which their applications
can attach to without much issues.

If you do not hold this kind of infrastructure, as Paperback does not, the app needs to be designed in a way where it
can dynamically read **other** content providers.

This design paradigm has many benefits. The Apple Store is very restrictive on content provided to iOS devices, however
with a generic source system which can be added into the application at runtime allows all sorts of content to be made
available, only requiring the users to install each module correctly.

Enter the Paperback Extension system. If you are familiar with [Tachiyomi](https://tachiyomi.org) this system is
practically the same. Users are free to develop an extension completely independant with the Paperback application
builds and updates, and publish generic sources which are simply parsing definitions which understand how to import the
contents of X website.

### Where do I start?

* Validate that the website you intend to write for is not already available. A list of sources can be
  found [on the Paperback Website.](../adding-repos.md#known-repositories)
* Check out the [quickstart](cheerio-quickstart.md) page for a place to begin.
