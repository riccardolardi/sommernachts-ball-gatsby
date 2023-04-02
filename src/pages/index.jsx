import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import App from "../components/app"
import "../styles/index.scss"

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query SiteDataQuery {
			wpgraphql {
				generalSettings {
					title
				}
				newsItems {
					nodes {
						id
						title
						acfNews {
							online
							subtitle
							text
							title
							streamlive
							streamtext
							streamarchivevideo
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
							satellites {
								satelliteTitle
								satelliteDescription
								satelliteLink
							}
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
							schedule {
								text
								programPoints {
									programPoint
								}
							}
							artists {
								facebook
								instagram
								links {
									link
								}
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

	return (
		<Layout>
			<Seo lang="de" />
			<App data={data} />
		</Layout>
	)
}

export default IndexPage
