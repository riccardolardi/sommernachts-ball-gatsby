require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Sommernachts-Ball`,
    url: `${process.env.BASE_URL}`,
    author: `@riccardolardi`,
  },
  plugins: [
    `@bumped-inc/gatsby-plugin-optional-chaining`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://www.sommernachts-ball.ch`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sommernachts-Ball`,
        short_name: `SNB`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-hypher`,
            options: {
              language: require(`hyphenation.de`),
              leftmin: 3,
              rightmin: 2,
              minLength: 6,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `${process.env.WP_BASE_URL}/graphql`,
      },
    },
  ],
}
