import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta }) {
  const { wpgraphql, site } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          generalSettings {
            title
            description
          }
        }
        site {
          siteMetadata {
            url
          }
        }
      }
    `
  )

  const title = wpgraphql.generalSettings.title
  const metaDescription = wpgraphql.generalSettings.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={`${title}`}
      titleTemplate={`%s ${title ? '| ' + title : ''}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: `/og.png`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `Genossenschaft Migros Zürich`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `de`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
