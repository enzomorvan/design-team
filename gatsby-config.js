const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  siteMetadata: {
    title: `Design Team Blog`,
    description: `Design Team Blog.`,
    siteUrl: `https://designteam.blog/`,
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `designteam`,
        collection: [`posts`],
        server: { address: process.env.MONGO_URI, port: 27017 },
        auth: {
          user: process.env.MONGO_USERNAME,
          password: process.env.MONGO_PASSWORD,
        },
        extraParams: {
          replicaSet: process.env.MONGO_REPLICA_SET,
          ssl: true,
          authSource: `admin`,
          retryWrites: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allMongodbDesignteamPosts } }) => {
              return allMongodbDesignteamPosts.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    description: node.description,
                    date: node.date,
                    url: node.link,
                    guid: node.link,
                    title: node.title,
                  }
                )
              })
            },
            query: `
              {
                allMongodbDesignteamPosts(sort: {order: DESC, fields: date}) {
                  nodes {
                    title
                    link
                    description
                    date
                  }
                }
              }
              `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Design Team Blog`,
        short_name: `Design Team`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-N5XSXPR",
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
  ],
}
