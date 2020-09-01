import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import App from "../components/app"
import "../styles/index.scss"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query SiteDataQuery {
      wpgraphql {
        generalSettings {
          title
        }
		    news {
		      nodes {
		        id
		        title
		        acfNews {
		          online
		          subtitle
		          text
		          title
		        }
		      }
		    }
		    infos {
		      nodes {
		        title
		        id
		        acfInfo {
		          online
		          subtitle
		          text
		          title
		        }
		      }
		    }
		    lineups {
		      nodes {
		        id
		        title
		        acfLineup {
		          title
		          text
		          subtitle
		          online
		          artists {
		            facebook
		            instagram
		            link
		            name
		            text
		            image {
		            	mediaDetails {
		            		width
		            		height
		            	}
		              sourceUrl(size: MEDIUM)
		              altText
		            }
		            video
		          }
		        }
		      }
		    }
		    galleries {
		      nodes {
		        id
		        title
		        acfGallery {
		          online
		          subtitle
		          text
		          title
		          videos {
		            url
		          }
		          images {
		            image {
		            	mediaDetails {
		            		width
		            		height
		            	}
		              altText
		              sourceUrl(size: LARGE)
		            }
		          }
		        }
		      }
		    }
		    newsletters {
		      nodes {
		        title
		        id
		        acfNewsletter {
		          online
		          subtitle
		          text
		          title
		          newsletterErrorMessage
		          newsletterSuccessMessage
		        }
		      }
		    }
		    contacts {
		      nodes {
		        title
		        id
		        acfContact {
		          online
		          subtitle
		          text
		          title
		        }
		      }
		    }
      }
    }
  `)

  return <Layout>
    <SEO lang="de" />
    <App data={data} />
  </Layout>
}

export default IndexPage
