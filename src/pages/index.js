import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
		query actQuery {
		  allWordpressWpAct {
		    nodes {
		      title
		      acf {
		        description
		        media {
		          vimeo
		          youtube
		          image {
		            localFile {
		              childImageSharp {
		                fixed(width: 1440) {
		                  src
		                }
		              }
		            }
		          }
		          type
		        }
		      }
		    }
		  }
		}
  `)

  return <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
}

export default IndexPage
