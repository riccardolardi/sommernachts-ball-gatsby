require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `Sommernachts-Ball`,
    url: `http://www.sommernachts-ball.ch`,
    author: `@riccardolardi`,
  },
  plugins: [
    `@bumped-inc/gatsby-plugin-optional-chaining`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
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
        url: `${process.env.WP_BASE_URL || 'http://2020-wp.sommernachts-ball.ch'}/graphql`
      },
    },
    `gatsby-plugin-offline`,
  ],
}
