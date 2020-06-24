import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return <Layout>
    <SEO lang="de" title="Willkommen!" />

  </Layout>
}

export default IndexPage
