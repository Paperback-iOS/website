import type { HeadConfig, TransformContext } from "vitepress";

function generateMeta(context: TransformContext, hostname: string) {
  const head: HeadConfig[] = [];
  const { pageData } = context;
  const url = `${hostname}/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2")}`;

  head.push(["link", { rel: "canonical", href: url }]);

  head.push(["meta", { property: "og:url", content: url }]);
  head.push(["meta", { name: "twitter:url", content: url }]);

  head.push(["meta", { property: "og:type", content: "website" }]);

  head.push(["meta", { name: "twitter:site", content: "@paperbackios" }]);

  if (pageData.frontmatter.title && pageData.frontmatter.titleTemplate) {
    head.push([
      "meta",
      {
        property: "og:title",
        content: `${pageData.frontmatter.title} | ${pageData.frontmatter.title}`,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:title",
        content: `${pageData.frontmatter.title} | ${pageData.frontmatter.title}`,
      },
    ]);

    head.push(["meta", { property: "og:site_name", content: "Paperback" }]);
  } else if (pageData.frontmatter.title) {
    head.push([
      "meta",
      {
        property: "og:title",
        content: `${pageData.frontmatter.title}`,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:title",
        content: `${pageData.frontmatter.title}`,
      },
    ]);

    head.push(["meta", { property: "og:site_name", content: "Paperback" }]);
  } else {
    head.push(["meta", { property: "og:title", content: "Paperback" }]);
    head.push(["meta", { name: "twitter:title", content: "Paperback" }]);
  }

  if (pageData.frontmatter.description) {
    head.push([
      "meta",
      {
        property: "og:description",
        content: pageData.frontmatter.description,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:description",
        content: pageData.frontmatter.description,
      },
    ]);
  }

  if (pageData.filePath == "index.md") {
    head.push([
      "meta",
      { name: "twitter:card", content: "summary_large_image" },
    ]);

    head.push([
      "meta",
      { property: "og:image", content: `${hostname}/pb-logo.png` },
    ]);
    head.push(["meta", { property: "og:image:type", content: "image/png" }]);
    head.push(["meta", { property: "og:image:alt", content: "Paperback" }]);

    head.push([
      "meta",
      { name: "twitter:image", content: `${hostname}/pb-logo.png` },
    ]);
    head.push(["meta", { name: "twitter:image:alt", content: "Paperback" }]);
  } else {
    head.push(["meta", { name: "twitter:card", content: "summary" }]);
  }

  return head;
}

export default generateMeta;
