import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="Unbekannte Seite" />
    <h1>Unbekannte Seite</h1>
    <p>Es scheint als hätten Sie sich verirrt...</p>
  </Layout>
)

export default NotFoundPage
