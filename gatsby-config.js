// @ts-check

// load .env file
require("dotenv").config({
  path: ".env",
});

const remarkGfm = import("remark-gfm");

/**
 * @typedef {import("./gatsby-config").AllMdx} AllMdx
 * @typedef {import("./gatsby-config").RSSSerializerReturn} RSSSerializerReturn
 * @typedef {import("./gatsby-config").SitemapQuery} SitemapQuery
 * @typedef {import("./gatsby-config").SitemapPage} SitemapPage
 * @typedef {import("./gatsby-config").Sitemap} Sitemap
 */

const siteMetadata = {
  title: "point of view.",
  author: "Jaewook Ahn",
  year: "2026",
  description: "Jaewook's point of view.",
  siteUrl: "https://jaewook.me",
  githubUrl: "https://github.com/Jaewoook",
  portfolioUrl: "https://portfolio.jaewook.me",
};

const rssQuery = `
{
  site {
    siteMetadata {
      siteUrl
    }
  }
  allMdx(sort: { frontmatter: { date: DESC } }) {
    nodes {
      frontmatter {
        title
        date
        slug
        secret
        author
      }
    }
  }
}
`;

/**
 * @type {({ query }: { query: AllMdx }) => RSSSerializerReturn}
 */
const rssSerializer = ({ query }) => {
  const siteUrl = query.site.siteMetadata?.siteUrl ?? "";

  return query.allMdx.nodes
    .filter((node) => !node.frontmatter?.secret)
    .map((node) => ({
      title: node.frontmatter?.title ?? "",
      date: node.frontmatter?.date ?? "",
      author: node.frontmatter?.author ?? "",
      url: new URL(node.frontmatter?.slug ?? "", siteUrl).href,
    }));
};

const sitemapQuery = `
{
  allSitePage {
    nodes {
      path
      pageContext
    }
  }
}
`;

/**
 * @type {(query: SitemapQuery) => SitemapPage[]}
 */
const sitemapPagesResolver = (query) => {
  const pageNodes = query.allSitePage.nodes;

  return pageNodes
    .map((pageNode) => ({
      path: pageNode.path,
      date: pageNode.pageContext?.frontmatter?.date ?? null,
      secret: pageNode.pageContext?.frontmatter?.secret ?? false,
    }))
    .filter(sitemapPagesFilter);
};

/**
 *
 * @type {(page: SitemapPage) => boolean}
 */
const sitemapPagesFilter = (page) => !page.secret;

/**
 * @type {(page: SitemapPage) => Sitemap}
 */
const sitemapPagesSerializer = ({ date, path }) => ({
  url: path,
  lastmod: date,
});

/**
 * @type {import("gatsby").PluginRef[]}
 */
const plugins = [
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "point of view.",
      short_name: "point of view.",
      start_url: "/",
      background_color: "#fff",
      theme_color: "#fafafa",
      lang: "ko",
      display: "standalone",
      icon: "src/images/favicon.png",
    },
  },
  "gatsby-plugin-postcss",
  "gatsby-plugin-image",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  "gatsby-plugin-styled-components",
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 820,
            linkImagesToOriginal: false,
            withWebp: true,
          },
        },
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            showLineNumbers: true,
            aliases: {
              ts: "javascript",
              typescript: "javascript",
            },
          },
        },
        {
          resolve: "gatsby-remark-autolink-headers",
          options: {
            elements: ["h1", "h2", "h3"],
          },
        },
      ],
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "posts",
      path: `${__dirname}/content/posts`,
    },
  },
  "gatsby-plugin-catch-links",
  {
    resolve: "gatsby-plugin-feed",
    options: {
      feeds: [
        {
          serialize: rssSerializer,
          query: rssQuery,
          output: "/rss.xml",
          title: "point of view RSS feed",
        },
      ],
    },
  },
  {
    resolve: "gatsby-plugin-google-gtag",
    options: {
      trackingIds: ["G-FQPC5W480F"],
      pluginConfig: {
        head: true,
      },
    },
  },
  {
    resolve: "gatsby-plugin-sitemap",
    options: {
      query: sitemapQuery,
      resolveSiteUrl: () => siteMetadata.siteUrl,
      resolvePages: sitemapPagesResolver,
      serialize: sitemapPagesSerializer,
    },
  },
];

plugins.push({
  resolve: "@sentry/gatsby",
  options: {
    dsn: process.env.SENTRY_DSN,
    deleteSourcemapsAfterUpload: true,
  },
});

/**
 * @type {import("gatsby").GatsbyConfig}
 */
const config = {
  siteMetadata,
  graphqlTypegen: {
    typesOutputPath: "src/types/gatsby-types.d.ts",
  },
  jsxRuntime: "automatic",
  trailingSlash: "ignore",
  plugins,
};

module.exports = config;
