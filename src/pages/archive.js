import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArchiveGallery from "../components/archivegallery"
import "../styles/index.scss"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
		query MediaArchiveQuery {
		  wpgraphql {
		    archiveGalleries {
		      nodes {
		        title
		        acfArchiveGallery {
		          media {
		            altText
		            mediaDetails {
		              width
		              height
		              meta {
		                aperture
		                camera
		                caption
		                copyright
		                createdTimestamp
		                credit
		                focalLength
		                iso
		                shutterSpeed
		                title
		              }
		            }
		            mediaType
		            mimeType
		            largeSource: sourceUrl(size: LARGE)
		            mediumSource: sourceUrl(size: MEDIUM)
		            mediaItemUrl
		          }
		        }
		      }
		    }
		  }
		}
  `)

  return <Layout>
    <SEO lang="de" title="Medien Archiv" />
    <ArchiveGallery data={data} />
  </Layout>
}

export default IndexPage
