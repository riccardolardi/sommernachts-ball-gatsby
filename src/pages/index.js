import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Classnames from "classnames"
import { createBreakpoint } from "react-use"
import { isIE, isSafari, isMobile as isTouch } from "react-device-detect"
import easyScroll from "easy-scroll"
import Layout from "../components/layout"
import Main from "../components/main"
import SEO from "../components/seo"
import Three from "../components/three"
import "../styles/index.scss"
import "../styles/app.scss"

let mainEl
const useBreakpoint = createBreakpoint({
	mobile: 767, 
	other: 768
})

const logoSrcB = require('../assets/migros_b.svg')
const logoSrcW = require('../assets/migros_w.svg')

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
		              sourceUrl(size: LARGE)
		              altText
		            }
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
		            vimeoUrl
		          }
		          images {
		            image {
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

  const newsData = data.wpgraphql.news.nodes[0]
  const infoData = data.wpgraphql.infos.nodes[0]
  const lineupData = data.wpgraphql.lineups.nodes[0]
  const galleryData = data.wpgraphql.galleries.nodes[0]
  const newsletterData = data.wpgraphql.newsletters.nodes[0]
  const contactData = data.wpgraphql.contacts.nodes[0]

	const [wp, setWp] = React.useState(null)
	const [prevWp, setPrevWp] = React.useState(null)
	const [isIntro, setIsIntro] = React.useState(false)
	const [inverted, setInverted] = React.useState(true)
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
	const isMobile = useBreakpoint() === 'mobile'

	React.useEffect(() => {
		setInverted(!inverted)
		setMobileNavOpen(false)
		setIsIntro(wp <= 2 || wp === 9)
	}, [wp])

	React.useLayoutEffect(() => {
		mainEl = document.querySelector('main#main')
	}, [])

	function jumpTo(newWp, time) {
		const targetEl = document.querySelectorAll('[data-wp="'+newWp+'"]')[0]
		const scrollEl = mainEl
		if (time === 0) {
			setMobileNavOpen(false)
			scrollEl.scrollTo(0, targetEl.offsetTop)
			return
		}
		easyScroll({
		  'scrollableDomEle': scrollEl,
		  'direction': 'bottom',
		  'duration': time,
		  'easingPreset': 'easeOutQuad',
		  'scrollAmount': targetEl.offsetTop - scrollEl.scrollTop
		})
	}

	function onExtraWheel(event) {
		if (isMobile || !isSafari) return
		mainEl.scrollTop += event.deltaY
	}

	const classes = Classnames({
		'inverted': inverted,
		'mobile-nav-open': mobileNavOpen
	})

  return <Layout>
    <SEO lang="de" title="Willkommen!" />
    <div id="app" className={classes}>
	    <Three show={isIntro || mobileNavOpen} />
	    <aside className={`text-logo front 
	    	${!isIntro && !isMobile || mobileNavOpen ? 'show' : 'hide'}`}>
	      <div className="row">
	        <span className="left suffix-slash">Sommer</span>
	        {/*<span className="right">Abgesagt</span>*/}
	      </div>
	      <div className="row">
	        <span className="left suffix-slash">Nachts</span>
	        {/*<span className="right">Aufgrund</span>*/}
	      </div>
	      <div className="row">
	        <span className="left suffix-slash">Ball</span>
	        {/*<span className="right">Coronavirus</span>*/}
	      </div>
	    </aside>
	    <img src={logoSrcW} 
	    	className={`migros-logo blend ${wp < 3 || 
	    		mobileNavOpen ? 'show' : 'hide'}`} 
	    			alt="Migros Kulturprozent" />
	    <Main 
	    	wp={wp} 
	    	setWp={setWp} 
	    	prevWp={prevWp} 
	    	setPrevWp={setPrevWp} 
	    	jumpTo={jumpTo} 
	    	inverted={inverted} 
	    	isIntro={isIntro} 
	    	isMobile={isMobile} 
	    	isTouch={isTouch} 
	    	mobileNavOpen={mobileNavOpen} 
	    	setMobileNavOpen={setMobileNavOpen} 
	    	onExtraWheel={onExtraWheel}
	    />
	  </div>
  </Layout>
}

export default IndexPage
