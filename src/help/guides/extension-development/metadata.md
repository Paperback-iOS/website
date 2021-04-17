# The Metadata Parameter

Any function that returns the [PagedData](model-reference.md#pageddata) object will also accept a parameter
called `metadata` with type `any`. However, it is unclear how this parameter actually works just from looking at the
method signature.

Metadata has a type signature of `any` because it can be used however the source developer works. The purpose
of `metadata` is to carry information between method calls, or a rudimentary method of keeping state.

One of the parameters in [PagedData](model-reference.md#pageddata) is `metadata`, which also has a type value of `any`.
When a method containing `metadata` is first called, `metadata` will be null. Future invocations of the method will use
the value of `metadata` from the last invocation's PagedData's `metadata` field.

For example, if I return a paged object that contains the following fields:

```ts
createPagedObject({
	results: [...],
	metadata: 1
});
```

The next time the same method is called again, it will be called with this signature: `(..., 1)`.

The purpose of metadata is mostly for pagination. Methods such as searching are called once to get the initial results
and again every time the user scrolls down. If the user scrolls down, we don't want to show the first page of results
again, but rather the second page of results. This is useful when there are hundreds of pages of results, because
otherwise it would take too much time to fetch all 100 pages if the user is only interested in the first few pages.

Most developers return an object with the page number, although it is not necessary to return an object.

## Example Implementation of Metadata

See the [example implementation of the `searchRequest` method](function-definitions.md#example-implementation-4) on how
to use the metadata parameter.
