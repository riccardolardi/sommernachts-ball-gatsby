import React from "react"
import ExtraBalls from "./extraballs"
import { useScroll, useDebounce } from "react-use"
import remark from "remark"
import remarkHypher from "remark-hypher"
import hyphenation from "hyphenation.de"
import ReactPlayer from "react-player/lazy"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import Classnames from "classnames"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "../styles/main.scss"

const tanzwerkSrcB = require('../assets/tanzwerk_b.svg')
const tanzwerkSrcW = require('../assets/tanzwerk_w.svg')
const sbbSrcB = require('../assets/sbb_b.svg')
const sbbSrcW = require('../assets/sbb_w.svg')
const shopvilleSrcB = require('../assets/shopville_b.svg')
const shopvilleSrcW = require('../assets/shopville_w.svg')
const zurichSrcB = require('../assets/zurich_b.svg')
const zurichSrcW = require('../assets/zurich_w.svg')
const radio1SrcB = require('../assets/radio1_b.svg')
const radio1SrcW = require('../assets/radio1_w.svg')
const sayflowersSrcB = require('../assets/sayflowers_b.svg')
const sayflowersSrcW = require('../assets/sayflowers_w.svg')
const logoSrcB = require('../assets/migros_b.svg')
const logoSrcW = require('../assets/migros_w.svg')
const scrollDownSrc = require('../assets/scroll-down.svg')
const menuSrc = require('../assets/menu.svg')
const closeSrc = require('../assets/close.svg')

const Main = (props) => {

	const newsData = 
		props.data.wpgraphql.news.nodes.find(el => el.acfNews.online)?.acfNews
	const infoData = 
		props.data.wpgraphql.infos.nodes.find(el => el.acfInfo.online)?.acfInfo
	const lineupData = 
		props.data.wpgraphql.lineups.nodes.find(el => el.acfLineup.online)?.acfLineup
	const galleryData = 
		props.data.wpgraphql.galleries.nodes.find(el => el.acfGallery.online)?.acfGallery
	const newsletterData = 
		props.data.wpgraphql.newsletters.nodes.find(el => el.acfNewsletter.online)?.acfNewsletter
	const contactData = 
		props.data.wpgraphql.contacts.nodes.find(el => el.acfContact.online)?.acfContact

	const winWidth = typeof window !== 'undefined' ? window.innerWidth : 0
	const winHeight = typeof window !== 'undefined' ? window.innerHeight : 0

	const articleRef = React.useRef([])
	const scrollRef = React.useRef(null)

	const scrollPosition = useScroll(scrollRef)

	const [scrolledPercent, setScrolledPercent] = React.useState(0)
	const [showScrollIndicator, setShowScrollIndicator] = React.useState(false)
	const [allowScroll, setAllowScroll] = React.useState(true)
	const [delta, setDelta] = React.useState(null)
	const [newsletterEmail, setNewsletterEmail] = React.useState('')
	const [newsletterEmailIsValid, setNewsletterEmailIsValid] = React.useState(false)
	const [newsletterError, setNewsletterError] = React.useState(false)
	const [newsletterSignupSuccess, setNewsletterSignupSuccess] = React.useState(false)
	const [registeringNewsletter, setRegisteringNewsletter] = React.useState(false)

	useDebounce(() => setAllowScroll(true), 250, [delta])

	React.useEffect(() => {
		setShowScrollIndicator(props.wp !== 9 && (props.wp < 3 || scrolledPercent > 0.5 || props.isMobile))
	}, [scrolledPercent])

	React.useEffect(() => {
		setNewsletterEmailIsValid(validateEmail(newsletterEmail))
	}, [newsletterEmail])

	React.useEffect(() => {
		if (props.wp > props.prevWp && props.isTouch && 
			props.wp > 2 && props.wp !== 9 && 
			(props.isTouch || !props.isTouch && delta > 20)) {
			setAllowScroll(false)
			props.jumpTo(props.wp, 250)
			setTimeout(() => setAllowScroll(true), 250)
		}
	}, [props.wp])

	React.useLayoutEffect(() => {
		if (!articleRef.current.length) return
		const scrollTop = scrollPosition.y
		for (let i = 0; i < articleRef.current.length; i++) {
			const article = articleRef.current[i]
			if (!article) continue;
			const articleTop = article.offsetTop
			const articleHeight = article.offsetHeight
			const articleWp = parseInt(articleRef.current[i].dataset.wp)
			if (scrollTop >= articleTop && scrollTop < articleTop + articleHeight) {
				props.setPrevWp(props.wp)
				props.setWp(articleWp)
				const pctVisible = 1 - article.getBoundingClientRect().bottom / 
					winHeight * (winHeight / articleHeight)
				if (articleWp === 1) setScrolledPercent(pctVisible * 0.5)
				if (articleWp === 2) setScrolledPercent(0.5 + pctVisible * 0.5)
				if (articleWp > 2) setScrolledPercent(pctVisible)
			}
		}
	}, [scrollPosition])

	const logo1style = props.wp === 1 ? {
		transform: `scale(${2.42 + (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winHeight / 20}) 
		translateX(${(-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winWidth / 20}px)`
	} : {}

	const logo2style = props.wp === 2 ? {
		transform: `scale(${2.42 + (1 - (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2)) * winHeight / 20}) 
		translateX(${(1 - (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2)) * winWidth / -25}px)
		translateY(${Math.pow(10, 10 * scrolledPercent - 10) * winHeight/-20}px)`
	} : {}

	function onWheel(event) {
		setDelta(event.deltaY)
	}

	function scrollToNextWP() {
		const duration = props.wp < 3 ? 3000 / props.wp : 250
		props.jumpTo(props.wp < 3 ? 3 : props.wp + 1, duration)
	}

	function toggleArtistDetails(index) {
		const el = document.querySelectorAll('.artist-info .details')[index]
		el.classList.toggle('open')
	}

	function validateEmail(input) {
		return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(input)
	}

	function registerNewsletter() {
		setRegisteringNewsletter(true)
		fetch('/newsletter.php?email=' + newsletterEmail)
			.then(response => response.json())
				.then(data => {
					setRegisteringNewsletter(false)
					if (data.StatusCode === 400) {
						console.error(data)
						setNewsletterError(true)
						setNewsletterSignupSuccess(false)
					} else {
						setNewsletterError(false)
						setNewsletterSignupSuccess(true)
					}
				})
	}

	const Hyphenate = (text) => {
		return React.useMemo(() => remark().use(remarkHypher, {
			language: require('hyphenation.de'),
			leftmin: 4,
			rightmin: 4,
			// minLength: 8,
		}).processSync(text), [])
	}

	const classes = Classnames({
		'show': !props.mobileNavOpen,
		'hide': props.mobileNavOpen,
		'scroll-lock': !allowScroll
	})

  return (
  	<main id="main" className={classes} ref={scrollRef} onWheel={onWheel}>
			<article data-wp="1" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 1 ? 'active' : 'inactive'} intro`}>
				<div className="centerWrap">
			    <div className="text-logo" style={props.wp === 1 ? logo1style : null}>
			      <div className="row">
			        <span className="left suffix-slash">Sommer</span>
			        <span className="right"></span>
			      </div>
			      <div className="row">
			        <span className="left suffix-slash">Nachts</span>
			        <span className="right"></span>
			      </div>
			      <div className="row">
			        <span className="left suffix-slash">Ball</span>
			        <span className="right"></span>
			      </div>
			    </div>
			  </div>
			</article>
			<article data-wp="2" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 2 ? 'active' : 'inactive'} intro`}>
				<div className="centerWrap">
			    <div className="text-logo" style={props.wp === 2 ? logo2style : null}>
			      <div className="row">
			        <span className="left"></span>
			        <span className="right">Unser</span>
			      </div>
			      <div className="row">
			        <span className="left"></span>
			        <span className="right">Ball</span>
			      </div>
			      <div className="row">
			        <span className="left"></span>
			        <span className="right">Für alle</span>
			      </div>
			    </div>
			  </div>
			</article>
			{newsData && <article id="home" data-wp="3" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 3 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: newsData.title}} />
		    	{newsData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: newsData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{newsData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(newsData.text)}} />
		    	<br/></React.Fragment>}
	    	</div>
	    	{props.wp === 3 && <ExtraBalls wp={props.wp} />}
			</article>}
			{infoData && <article id="info" data-wp="4" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 4 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: infoData.title}} />
		    	{infoData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: infoData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{infoData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(infoData.text)}} />
		    	<br/></React.Fragment>}
					<h3>Partner</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.tanzwerk101.ch/"><img src={props.inverted ? tanzwerkSrcB : tanzwerkSrcW} alt="Tanzwerk 101" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.sbb.ch/"><img src={props.inverted ? sbbSrcB : sbbSrcW} alt="SBB" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.shopville.ch/"><img src={props.inverted ? shopvilleSrcB : shopvilleSrcW} alt="ShopVille" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.sayflowers.ch/"><img src={props.inverted ? sayflowersSrcB : sayflowersSrcW} alt="SayFlowers" /></a>
					<br/><br/>
					<h3>Patronat</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.zurich.ch/"><img src={props.inverted ? zurichSrcB : zurichSrcW} alt="Stadt Zurich" /></a>
					<br/><br/>
					<h3>Medienpartner</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.radio1.ch/"><img src={props.inverted ? radio1SrcB : radio1SrcW} alt="Radio 1" /></a>
				</div>
				{props.wp === 4 && <ExtraBalls wp={props.wp} />}
			</article>}
			{lineupData && <article id="lineup" data-wp="5" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 5 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: lineupData.title}} />
		    	{lineupData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: lineupData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{lineupData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(lineupData.text)}} />
		    	<br/></React.Fragment>}
					<div className="isolate">
						{lineupData.artists.map((artist, index) => {
							return <section key={index} className="artist-info">
								<h2 dangerouslySetInnerHTML={{__html: artist.name}} className="link" onClick={() => toggleArtistDetails(index)} />
								<div className="details">
									<div className="artist-media">
										{artist.image && <img src={artist.image.sourceUrl} className="artist-photo" alt={artist.image.altText} />}
										{artist.video && <ReactPlayer 
											className="video artist-video" 
											url={artist.video} 
											width="100%" height="100%" 
											config={{vimeo: {
												playerOptions: {
													title: true,
													byline: false,
													color: 'ffffff',
													portrait: false
												}
											}, 
											youtube: {
			      						playerVars: {
			      							showinfo: false,
			      							color: 'white'
			      						}
			    						}}}
										/>}
									</div>
									<div className="artist-text">
										<p dangerouslySetInnerHTML={{__html: Hyphenate(artist.text)}} />
										<p><a dangerouslySetInnerHTML={{__html: artist.link}} target="_blank" rel="noopener noreferrer" href={artist.link} className="link" /></p>
										{artist.facebook && <a target="_blank" rel="noopener noreferrer" href={artist.facebook}><FacebookIcon className="icon" /></a>}
										{artist.instagram && <a target="_blank" rel="noopener noreferrer" href={artist.instagram}><InstagramIcon className="icon" /></a>}
									</div>
								</div>
							</section>
						})}
					</div>
				</div>
				{props.wp === 5 && <ExtraBalls wp={props.wp} />}
			</article>}
			{galleryData && <article id="gallery" data-wp="6" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 6 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: galleryData.title}} />
		    	{galleryData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: galleryData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{galleryData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(galleryData.text)}} />
		    	<br/></React.Fragment>}
					<div className="isolate">
						{galleryData.videos && galleryData.videos.map((video, index) => {
							return <ReactPlayer 
								key={index} 
								className="video" 
								width="100%" 
								height="100%" 
								url={video.url} 
								config={{vimeo: {
									playerOptions: {
										title: true,
										byline: false,
										color: 'ffffff',
										portrait: false
									}
								}, 
								youtube: {
      						playerVars: {
      							showinfo: false,
      							color: 'white'
      						}
    						}}}
							/>
						})}
						{galleryData.images && <div className="gallery-photos">
							{galleryData.images.map((el, index) => {
								return <img key={index} src={el.image.sourceUrl} className="gallery-photo" alt={el.image.altText} />
							})}
						</div>}
					</div>
				</div>
				{props.wp === 6 && <ExtraBalls wp={props.wp} />}
			</article>}
			{newsletterData && <article id="newsletter" data-wp="7" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 7 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: newsletterData.title}} />
		    	{newsletterData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: newsletterData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{newsletterData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(newsletterData.text)}} />
		    	<br/></React.Fragment>}
					{newsletterError && <p dangerouslySetInnerHTML={{__html: newsletterData.newsletterErrorMessage}} />}
					{newsletterSignupSuccess && <p dangerouslySetInnerHTML={{__html: newsletterData.newsletterSuccessMessage}} />}
					{!newsletterSignupSuccess && !newsletterError && !registeringNewsletter && 
					<div className={`newsletter-form isolate ${props.inverted ? 'inverted' : ''}`}>
						<input type="email" value={newsletterEmail} placeholder="ihre@email.com" 
							onChange={event => setNewsletterEmail(event.target.value)} />
						{newsletterEmailIsValid && <button onClick={() => registerNewsletter()}>Registrieren</button>}
					</div>}
					{registeringNewsletter && <p>Bitte warten...</p>}
				</div>
				{props.wp === 7 && <ExtraBalls wp={props.wp} />}
			</article>}
			{contactData && <article id="kontakt" data-wp="8" ref={el => articleRef.current.push(el)} 
				className={`${props.wp === 8 ? 'active' : 'inactive'}`}>
				<div className="content">
		    	<h1 dangerouslySetInnerHTML={{__html: contactData.title}} />
		    	{contactData.subtitle && <React.Fragment><h2 dangerouslySetInnerHTML={{__html: contactData.subtitle}} />
		    	<br/></React.Fragment>}
		    	{contactData.text && <React.Fragment><p dangerouslySetInnerHTML={{__html: Hyphenate(contactData.text)}} />
		    	<br/></React.Fragment>}
	    	</div>
				{props.wp === 8 && <ExtraBalls wp={props.wp} />}
			</article>}
			<article data-wp="9" ref={el => articleRef.current[8] = el} 
				className={`${props.wp === 9 ? 'active' : 'inactive'} intro`}>
				<div className="centerWrap">
					<img src={props.inverted ? logoSrcB : logoSrcW} className='migros-logo' alt="Migros Kulturprozent" />
				</div>
			</article>
			<span className={`scroll-indicator ${props.mobileNavOpen ? 'mobile-nav-open blend' : ''} 
				${props.wp < 3 || !props.isMobile ? 'blend' : ''} 
				${props.wp < 3 && props.isMobile ? 'is-scroll' : 'is-menu'} 
				${showScrollIndicator ? 'show' : 'hide'} wp${props.wp} ${props.inverted ? 'inverted' : ''}`} 
				onWheel={props.onExtraWheel} 
				onClick={() => {
					if (!props.isMobile || (props.isMobile && props.wp < 3)) scrollToNextWP();
					if (props.isMobile && props.wp > 2) props.setMobileNavOpen(!props.mobileNavOpen);
				}}>
				<CircularProgressbarWithChildren 
					maxValue={1} 
					strokeWidth={6} 
					value={props.isMobile && props.wp > 2 ? 1 - scrolledPercent : scrolledPercent} 
					counterClockwise={props.isMobile && props.wp > 2} 
					styles={buildStyles({
		        strokeLinecap: 'butt',
		        pathColor: '#fff',
		        trailColor: 'transparent',
		        pathTransition: 'none'
		      })}>
					<img src={scrollDownSrc} className="scroll-indicator-content scroll blend" alt="" />
					<img src={menuSrc} className="scroll-indicator-content menu blend" alt="" />
					<img src={closeSrc} className="scroll-indicator-content close blend" alt="" />
				</CircularProgressbarWithChildren>
			</span>
			<span className={`scroll-timer blend ${props.isTouch || allowScroll ? 'hide' : 'show'}`} />
  	</main>
  )
}

export default Main
