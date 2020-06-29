import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/layout.scss"

const Layout = ({ children }) => {
  return (<div id="layout">{children}</div>)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
