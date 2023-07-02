import { config } from "./_build.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";
import inline from "lume/plugins/inline.ts";
import feed from "lume/plugins/feed.ts";
import sitemap from "lume/plugins/sitemap.ts";

import unified from "#plugins/unified/mod.ts";
import remarkPlugins from "#plugins/unified/remark/mod.ts";
import rehypePlugins from "#plugins/unified/rehype/mod.ts";
import md5CacheBuster from "#plugins/md5-cache-buster/mod.ts";

const site = lume({
  location: config.location,
  src: "./src",
  server: {
    page404: "/404/",
  },
}, {
  url: {
    names: {
      url: "urlFilter",
      htmlUrl: "htmlUrlFilter",
    },
  },
});

site
  .copy("assets", ".")
  .use(date())
  .use(slugify_urls({
    replace: {
      "&": "and",
    },
  }))
  .use(unified({
    remarkPlugins,
    rehypePlugins,
  }))
  .use(jsx())
  .use(sass())
  .loadAssets([".js"])
  .use(terser())
  .use(inline())
  .use(sitemap({
    filename: "sitemap.xml",
    query: "type=post",
    sort: "date=desc",
  }))
  .use(feed({
    output: ["/site.rss", "/site.json"],
    query: "type=post",
    sort: "date=desc",
    limit: 10,
    info: {
      title: "My blog",
      description: "Where I put my thoughts",
      date: new Date(),
      lang: "en",
      generator: true,
    },
    items: {
      title: "=title",
      description: "=excerpt",
      date: "=date",
      content: "=children",
      lang: "=lang",
    },
  }));

if (config.mode === "prod") {
  site.use(md5CacheBuster());
}

export default site;
