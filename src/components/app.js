import React from "react"
import Classnames from "classnames"
import { createBreakpoint } from "react-use"
import { isIE, isEdge, isSafari, isMobile as isTouch } from "react-device-detect"
import easyScroll from "easy-scroll"
import Three from "./three"
import Main from "./main"
import Navi from "./navi"
import "../styles/app.scss"

let mainEl
const useBreakpoint = createBreakpoint({
	mobile: 767, 
	other: 768
})

const logoSrcB = require('../assets/migros_b.svg')
const logoSrcW = require('../assets/migros_w.svg')

const App = (props) => {

  const newsData = props.data.wpgraphql.news.nodes[0]
  const infoData = props.data.wpgraphql.infos.nodes[0]
  const lineupData = props.data.wpgraphql.lineups.nodes[0]
  const galleryData = props.data.wpgraphql.galleries.nodes[0]
  const newsletterData = props.data.wpgraphql.newsletters.nodes[0]
  const contactData = props.data.wpgraphql.contacts.nodes[0]

	const [wp, setWp] = React.useState(null)
	const [prevWp, setPrevWp] = React.useState(null)
	const [isIntro, setIsIntro] = React.useState(false)
	const [inverted, setInverted] = React.useState(false)
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
		'mobile-nav-open': mobileNavOpen,
		'isIE': isIE
	})

  return (
    <div id="app" className={classes}>
    	{isIE || isEdge ? <React.Fragment>
	      <h1>Ihr Browser (Internet Explorer) ist leider unsäglich veraltet.</h1>
	      <h2>Diese Homepage kann so nicht angezeigt werden.</h2>
	      <p>Bitte installieren Sie einen aktuellen Browser wie zB. <a href="https://www.google.com/chrome/">Google Chrome</a> oder <a href="https://www.mozilla.org/de/firefox/new/">Firefox</a>.</p>
	      <p>Mehr Informationen darüber wieso man keine veralteten Browser benutzen sollte: <a href="https://www.browser-update.org/de/update.html">hier klicken</a></p>
    	</React.Fragment> : 
    	<React.Fragment>
		    <Three show={isIntro || mobileNavOpen} aria-role="complementary" />
		    <header className={`text-logo front 
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
		    </header>
		    <img src={logoSrcW} aria-role="complementary" 
		    	className={`migros-logo blend ${wp < 3 || 
		    		mobileNavOpen ? 'show' : 'hide'}`} 
		    			alt="Migros Kulturprozent" />
		    <Main 
		    	data={props.data} 
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
		    <Navi 
		    	data={props.data} 
					wp={wp} 
					jumpTo={jumpTo} 
					isIntro={isIntro} 
					isMobile={isMobile} 
					mobileNavOpen={mobileNavOpen} 
					onExtraWheel={onExtraWheel}
		    />
	    </React.Fragment>}
	  </div>
  )
}

export default App