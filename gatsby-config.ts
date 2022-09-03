import remarkGFM from "remark-gfm";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Jaewook's point of view`,
        shortTitle: 'point of view',
        name: 'Jaewook Ahn',
        description: `Post all about Jaewook's point of view. Write code, memorable moment, take photo, share lifestyle, experience.`,
        siteUrl: 'https://jaewook.me',
        social: [
            {
                name: 'github',
                url: 'https://github.com/Jaewoook',
            },
        ],
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/content/posts`,
            },
        },
        // {
        //     resolve: 'gatsby-plugin-page-creator',
        //     options: {
        //         path: `${__dirname}/content/posts`,
        //     },
        // },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGFM],
                },
            },
        },
        {
            resolve: 'gatsby-plugin-disqus',
            options: {
                shortname: 'jaewook-ahns-logbase',
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Jaewook\'s point of view | Blog',
                short_name: 'Jaewook\'s point of view',
                start_url: '/',
                background_color: `#fff`,
                theme_color: `#fff`,
                lang: 'ko',
                display: `standalone`,
                icon: 'src/images/favicon.png',
            },
        },
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                trackingId: 'UA-108816190-1',
            },
        },
    ],
}

export default config;