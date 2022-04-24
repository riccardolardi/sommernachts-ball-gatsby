import React from "react"
// import ExtraBalls from "./extraballs"
// import Stream from "./stream"
import { useScroll } from "react-use"
import {
	LazyLoadImage,
	LazyLoadComponent,
} from "react-lazy-load-image-component"
import remark from "remark"
import remarkHypher from "remark-hypher"
// import hyphenation from "hyphenation.de"
import Autolinker from "autolinker"
import ReactPlayer from "react-player"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import Classnames from "classnames"
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar"
import "../styles/main.scss"

import alzheimberSrcB from "../assets/alzheimer_b.svg"
import tanzwerkSrcB from "../assets/tanzwerk_b.svg"
import sbbSrcB from "../assets/sbb_b.svg"
import shopvilleSrcB from "../assets/shopville_b.svg"
import radio1SrcB from "../assets/radio1_b.svg"
import SbbSrcB from "../assets/sbb_b.svg"
import logoSrcB from "../assets/migros_b.svg"
import logoSrcW from "../assets/migros_w.svg"
import scrollDownSrc from "../assets/scroll-down.svg"
import menuSrc from "../assets/menu.svg"
import closeSrc from "../assets/close.svg"
import swissdanceSrc from "../assets/swissdance.png"

const isSSR = typeof window === "undefined"
const ClientSideOnlyLazyStream = React.lazy(() => import("./stream"))

const Main = (props) => {
	const newsData = props.data.wpgraphql.newsItems.nodes.find(
		(el) => el.acfNews.online
	)?.acfNews
	const infoData = props.data.wpgraphql.infos.nodes.find(
		(el) => el.acfInfo.online
	)?.acfInfo
	const lineupData = props.data.wpgraphql.lineups.nodes.find(
		(el) => el.acfLineup.online
	)?.acfLineup
	const galleryData = props.data.wpgraphql.galleries.nodes.find(
		(el) => el.acfGallery.online
	)?.acfGallery
	const newsletterData = props.data.wpgraphql.newsletters.nodes.find(
		(el) => el.acfNewsletter.online
	)?.acfNewsletter
	const contactData = props.data.wpgraphql.contacts.nodes.find(
		(el) => el.acfContact.online
	)?.acfContact

	const winWidth = typeof window !== "undefined" ? window.innerWidth : 0
	const winHeight = typeof window !== "undefined" ? window.innerHeight : 0

	const articleRef = React.useRef([])
	const scrollRef = React.useRef(null)

	const scrollPosition = useScroll(scrollRef)

	const [scrolledPercent, setScrolledPercent] = React.useState(0)
	const [showScrollIndicator, setShowScrollIndicator] = React.useState(false)
	const [allowScroll, setAllowScroll] = React.useState(true)
	const [newsletterEmail, setNewsletterEmail] = React.useState("")
	const [newsletterEmailIsValid, setNewsletterEmailIsValid] =
		React.useState(false)
	const [newsletterError, setNewsletterError] = React.useState(false)
	const [newsletterSignupSuccess, setNewsletterSignupSuccess] =
		React.useState(false)
	const [registeringNewsletter, setRegisteringNewsletter] =
		React.useState(false)

	React.useEffect(() => {
		setShowScrollIndicator(
			props.wp !== 9 &&
				(props.wp < 3 || scrolledPercent > 0.5 || props.isMobile)
		)
	}, [scrolledPercent])

	React.useEffect(() => {
		setNewsletterEmailIsValid(validateEmail(newsletterEmail))
	}, [newsletterEmail])

	React.useEffect(() => {
		if (
			props.wp > props.prevWp &&
			props.isMobile &&
			props.wp > 2 &&
			props.wp < 9
		) {
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
			if (!article) continue
			const articleTop = article.offsetTop
			const articleHeight = article.offsetHeight
			const articleWp = parseInt(articleRef.current[i].dataset.wp)
			if (scrollTop >= articleTop && scrollTop < articleTop + articleHeight) {
				props.setPrevWp(props.wp)
				props.setWp(articleWp)
				const pctVisible =
					1 -
					(article.getBoundingClientRect().bottom / winHeight) *
						(winHeight / articleHeight)
				if (articleWp === 1) setScrolledPercent(pctVisible * 0.5)
				if (articleWp === 2) setScrolledPercent(0.5 + pctVisible * 0.5)
				if (articleWp > 2) setScrolledPercent(pctVisible)
			}
		}
	}, [scrollPosition])

	const logo1style =
		props.wp === 1
			? {
					transform: `scale(${
						2.42 +
						((-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winHeight) / 20
					}) 
		translateX(${
			((-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winWidth) / 20
		}px)`,
			  }
			: {}

	const logo2style =
		props.wp === 2
			? {
					transform: `scale(${
						2.42 +
						((1 - -(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winHeight) /
							20
					}) 
		translateX(${
			((1 - -(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winWidth) / -25
		}px)
		translateY(${(Math.pow(10, 10 * scrolledPercent - 10) * winHeight) / -20}px)`,
			  }
			: {}

	function scrollToNextWP() {
		const duration = props.wp < 3 ? 3000 / props.wp : 250
		props.jumpTo(props.wp < 3 ? 3 : props.wp + 1, duration)
	}

	function toggleArtistDetails(index) {
		const el = document.querySelectorAll(".artist-info .details")[index]
		el.classList.toggle("open")
	}

	function validateEmail(input) {
		return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(input)
	}

	function registerNewsletter() {
		setRegisteringNewsletter(true)
		fetch("/newsletter.php?email=" + newsletterEmail)
			.then((response) => response.json())
			.then((data) => {
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
		return React.useMemo(
			() =>
				remark()
					.use(remarkHypher, {
						language: require("hyphenation.de"),
						leftmin: 4,
						rightmin: 4,
						// minLength: 8,
					})
					.processSync(
						Autolinker.link(text, {
							newWindow: true,
							className: "link",
						})
					),
			[]
		)
	}

	const classes = Classnames({
		show: !props.mobileNavOpen,
		hide: props.mobileNavOpen,
		"scroll-lock": !allowScroll,
	})

	return (
		<main id="main" className={classes} ref={scrollRef}>
			<article
				data-wp="1"
				ref={(el) => articleRef.current.push(el)}
				className={`${props.wp === 1 ? "active" : "inactive"} intro`}
			>
				<div className="centerWrap">
					<div className="text-logo" style={props.wp === 1 ? logo1style : null}>
						<div className="row">
							<span className="left suffix-slash">Zurück</span>
							<span className="right"></span>
						</div>
						<div className="row">
							<span className="left suffix-slash">im</span>
							<span className="right"></span>
						</div>
						<div className="row">
							<span className="left suffix-slash">HB</span>
							<span className="right"></span>
						</div>
					</div>
				</div>
			</article>
			<article
				data-wp="2"
				ref={(el) => articleRef.current.push(el)}
				className={`${props.wp === 2 ? "active" : "inactive"} intro`}
			>
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
			{newsData && (
				<article
					id="home"
					data-wp="3"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 3 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{ __html: Hyphenate(newsData.title) }}
						/>
						{newsData.subtitle && (
							<React.Fragment>
								<h2 dangerouslySetInnerHTML={{ __html: newsData.subtitle }} />
								<br />
							</React.Fragment>
						)}
						{newsData.text && !newsData.streamlive && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{ __html: Hyphenate(newsData.text) }}
								/>
								<br />
							</React.Fragment>
						)}
						{!isSSR && (newsData.streamlive || newsData.streamarchivevideo) && (
							<React.Suspense fallback={<div />}>
								<ClientSideOnlyLazyStream
									streamLive={newsData.streamlive}
									archiveVideo={newsData.streamarchivevideo}
								/>
							</React.Suspense>
						)}
					</div>
					{/*{props.wp === 3 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			{lineupData && (
				<article
					id="lineup"
					data-wp="5"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 5 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{ __html: Hyphenate(lineupData.title) }}
						/>
						{lineupData.subtitle && (
							<React.Fragment>
								<h2 dangerouslySetInnerHTML={{ __html: lineupData.subtitle }} />
								<br />
							</React.Fragment>
						)}
						{lineupData.text && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{
										__html: Hyphenate(lineupData.text),
									}}
								/>
								<br />
							</React.Fragment>
						)}
						{lineupData.schedule && (
							<div className="schedule">
								<p>{lineupData.schedule.text}</p>
								<ul className="acts">
									{lineupData.schedule.programPoints.map((element, index) => (
										<li key={index}>{element.programPoint}</li>
									))}
								</ul>
							</div>
						)}
						<div className="isolate">
							{lineupData.artists.map((artist, index) => {
								return (
									<section key={index} className="artist-info">
										<h2
											dangerouslySetInnerHTML={{ __html: artist.name }}
											className="link"
											onClick={() => toggleArtistDetails(index)}
										/>
										<div className="details">
											<div className="artist-media">
												{artist.image && (
													<LazyLoadImage
														className="artist-photo"
														src={artist.image.sourceUrl}
														width={artist.image.mediaDetails.width}
														height={artist.image.mediaDetails.height}
														alt={artist.image.altText}
													/>
												)}
												{artist.video && (
													<LazyLoadComponent>
														<ReactPlayer
															className="video artist-video"
															url={artist.video}
															width="100%"
															height="100%"
															config={{
																vimeo: {
																	playerOptions: {
																		title: true,
																		byline: false,
																		color: "ffffff",
																		portrait: false,
																	},
																},
																youtube: {
																	playerVars: {
																		showinfo: false,
																		color: "white",
																	},
																},
															}}
														/>
													</LazyLoadComponent>
												)}
											</div>
											<div className="artist-text">
												<p
													dangerouslySetInnerHTML={{
														__html: Hyphenate(artist.text),
													}}
												/>
												<p>
													{artist.links.map((link, index) => (
														<a
															key={index}
															dangerouslySetInnerHTML={{
																__html: link.link.replace(/(^\w+:|^)\/\//, ""),
															}}
															target="_blank"
															rel="noopener noreferrer"
															href={link.link}
															className="link"
														/>
													))}
												</p>
												{artist.facebook && (
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={artist.facebook}
													>
														<FacebookIcon className="icon" />
													</a>
												)}
												{artist.instagram && (
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={artist.instagram}
													>
														<InstagramIcon className="icon" />
													</a>
												)}
											</div>
										</div>
									</section>
								)
							})}
						</div>
					</div>
					{/*{props.wp === 5 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			{infoData && (
				<article
					id="info"
					data-wp="4"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 4 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{ __html: Hyphenate(infoData.title) }}
						/>
						{infoData.subtitle && (
							<React.Fragment>
								<h2 dangerouslySetInnerHTML={{ __html: infoData.subtitle }} />
								<br />
							</React.Fragment>
						)}
						{infoData.text && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{ __html: Hyphenate(infoData.text) }}
								/>
								<br />
							</React.Fragment>
						)}
						{/*<h3>Satellitenbälle</h3>
						{infoData.satellites?.map((satellite) => {
							return (
								<div className="satellite" key={satellite.satelliteTitle}>
									<h4>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={satellite.satelliteLink}
										>
											{satellite.satelliteTitle}
										</a>
									</h4>
									<p>{satellite.satelliteDescription}</p>
								</div>
							)
						})}
					*/}
						{/*<h3>Partner</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.tanzwerk101.ch/"><img src={props.inverted ? tanzwerkSrcB : tanzwerkSrcW} alt="Tanzwerk 101" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.sbb.ch/"><img src={props.inverted ? sbbSrcB : sbbSrcW} alt="SBB" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.shopville.ch/"><img src={props.inverted ? shopvilleSrcB : shopvilleSrcW} alt="ShopVille" /></a>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.sayflowers.ch/"><img src={props.inverted ? sayflowersSrcB : sayflowersSrcW} alt="SayFlowers" /></a>
					<br/><br/>
					<h3>Patronat</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.zurich.ch/"><img src={props.inverted ? zurichSrcB : zurichSrcW} alt="Stadt Zurich" /></a>
					<br/><br/>
					<h3>Medienpartner</h3>
					<a className="partner" target="_blank" rel="noopener noreferrer" href="http://www.radio1.ch/"><img src={props.inverted ? radio1SrcB : radio1SrcW} alt="Radio 1" /></a>*/}
					</div>
					{/*{props.wp === 4 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			{galleryData && (
				<article
					id="gallery"
					data-wp="6"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 6 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{ __html: Hyphenate(galleryData.title) }}
						/>
						{galleryData.subtitle && (
							<React.Fragment>
								<h2
									dangerouslySetInnerHTML={{ __html: galleryData.subtitle }}
								/>
								<br />
							</React.Fragment>
						)}
						{galleryData.text && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{
										__html: Hyphenate(galleryData.text),
									}}
								/>
								<br />
							</React.Fragment>
						)}
						<p>
							Hier geht's zum{" "}
							<a
								className="link"
								target="_blank"
								rel="noopener noreferrer"
								href="/archive"
							>
								Medien-Archiv
							</a>
						</p>
						<br />
						<div className="isolate">
							{galleryData.videos &&
								galleryData.videos.map((video, index) => {
									return (
										<LazyLoadComponent key={index}>
											<ReactPlayer
												className="video"
												width="100%"
												height="100%"
												url={video.url}
												config={{
													vimeo: {
														playerOptions: {
															title: true,
															byline: false,
															color: "ffffff",
															portrait: false,
														},
													},
													youtube: {
														playerVars: {
															showinfo: false,
															color: "white",
														},
													},
												}}
											/>
										</LazyLoadComponent>
									)
								})}
							{galleryData.images && (
								<div className="gallery-photos">
									{galleryData.images.map((el, index) => {
										return (
											<LazyLoadImage
												key={index}
												src={el.image.sourceUrl}
												width={el.image.mediaDetails.width}
												height={el.image.mediaDetails.height}
												className="gallery-photo"
												threshold={200}
												alt={el.image.altText}
											/>
										)
									})}
								</div>
							)}
						</div>
					</div>
					{/*{props.wp === 6 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			{newsletterData && (
				<article
					id="newsletter"
					data-wp="7"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 7 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{
								__html: Hyphenate(newsletterData.title),
							}}
						/>
						{newsletterData.subtitle && (
							<React.Fragment>
								<h2
									dangerouslySetInnerHTML={{ __html: newsletterData.subtitle }}
								/>
								<br />
							</React.Fragment>
						)}
						{newsletterData.text && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{
										__html: Hyphenate(newsletterData.text),
									}}
								/>
								<br />
							</React.Fragment>
						)}
						{newsletterError && (
							<p
								dangerouslySetInnerHTML={{
									__html: newsletterData.newsletterErrorMessage,
								}}
							/>
						)}
						{newsletterSignupSuccess && (
							<p
								dangerouslySetInnerHTML={{
									__html: newsletterData.newsletterSuccessMessage,
								}}
							/>
						)}
						{!newsletterSignupSuccess &&
							!newsletterError &&
							!registeringNewsletter && (
								<div
									className={`newsletter-form isolate ${
										props.inverted ? "inverted" : ""
									}`}
								>
									<label htmlFor="email-input">Ihre Email-Adresse:</label>
									<input
										id="email-input"
										type="email"
										value={newsletterEmail}
										placeholder="ihre@email.com"
										onChange={(event) => setNewsletterEmail(event.target.value)}
									/>
									{newsletterEmailIsValid && (
										<button onClick={() => registerNewsletter()}>
											Registrieren
										</button>
									)}
								</div>
							)}
						{registeringNewsletter && <p>Bitte warten...</p>}
					</div>
					{/*{props.wp === 7 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			{contactData && (
				<article
					id="kontakt"
					data-wp="8"
					ref={(el) => articleRef.current.push(el)}
					className={`${props.wp === 8 ? "active" : "inactive"}`}
				>
					<div className="content">
						<h1
							dangerouslySetInnerHTML={{ __html: Hyphenate(contactData.title) }}
						/>
						{contactData.subtitle && (
							<React.Fragment>
								<h2
									dangerouslySetInnerHTML={{ __html: contactData.subtitle }}
								/>
								<br />
							</React.Fragment>
						)}
						{contactData.text && (
							<React.Fragment>
								<p
									dangerouslySetInnerHTML={{
										__html: Hyphenate(contactData.text),
									}}
								/>
								<br />
							</React.Fragment>
						)}
						<h3>Impressum:</h3>
						<br />
						<p>
							Design:{" "}
							<a
								className="link"
								href="http://www.komun.ch"
								target="_blank"
								rel="noopener noreferrer"
							>
								Komun
							</a>
							,{" "}
							<a
								className="link"
								href="http://www.stephanwalter.ch"
								target="_blank"
								rel="noopener noreferrer"
							>
								Stephan Walter
							</a>
						</p>
						<p>
							Code:{" "}
							<a
								className="link"
								href="http://www.riccardolardi.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Studio Riccardo Lardi
							</a>
						</p>
						<br />
						<h3>Partner</h3>
						<br />
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="http://www.tanzwerk101.ch/"
						>
							<img src={tanzwerkSrcB} alt="Tanzwerk 101" />
						</a>
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="https://swissdance.ch/"
						>
							<img src={swissdanceSrc} alt="Swissdance" />
						</a>
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="https://sbb.ch/"
						>
							<img src={sbbSrcB} alt="SBB" />
						</a>
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="https://radio1.ch/"
						>
							<img src={radio1SrcB} alt="Radio1" />
						</a>
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="https://shopville.ch/"
						>
							<img src={shopvilleSrcB} alt="Shopville" />
						</a>
						<a
							className="partner"
							target="_blank"
							rel="noopener noreferrer"
							href="https://alzheimer.ch/"
						>
							<img src={alzheimberSrcB} alt="Alzheimer Zürich" />
						</a>
					</div>
					{/*{props.wp === 8 && <ExtraBalls wp={props.wp} />}*/}
				</article>
			)}
			<article
				data-wp="9"
				ref={(el) => (articleRef.current[8] = el)}
				className={`${props.wp === 9 ? "active" : "inactive"} intro`}
			>
				<div className="centerWrap">
					<a
						href="https://migros-engagement.ch/engagement"
						target="_blank"
						rel="noopener noreferrer"
						className="migros-link"
					>
						<img
							src={props.inverted ? logoSrcB : logoSrcW}
							className="migros-logo"
							alt="Migros Kulturprozent"
						/>
					</a>
				</div>
			</article>
			<span
				className={`scroll-indicator ${
					props.mobileNavOpen ? "mobile-nav-open blend" : ""
				} 
				${props.wp < 3 || !props.isMobile ? "blend" : ""} 
				${props.wp < 3 && props.isMobile ? "is-scroll" : "is-menu"} 
				${showScrollIndicator ? "show" : "hide"} wp${props.wp} ${
					props.inverted ? "inverted" : ""
				}`}
				onWheel={props.onExtraWheel}
				onClick={() => {
					if (!props.isMobile || (props.isMobile && props.wp < 3))
						scrollToNextWP()
					if (props.isMobile && props.wp > 2)
						props.setMobileNavOpen(!props.mobileNavOpen)
				}}
			>
				<CircularProgressbarWithChildren
					maxValue={1}
					strokeWidth={6}
					value={
						props.isMobile && props.wp > 2
							? 1 - scrolledPercent
							: scrolledPercent
					}
					counterClockwise={props.isMobile && props.wp > 2}
					styles={buildStyles({
						strokeLinecap: "butt",
						pathColor: "#fff",
						trailColor: "transparent",
						pathTransition: "none",
					})}
				>
					<img
						src={scrollDownSrc}
						className="scroll-indicator-content scroll blend"
						alt=""
					/>
					<img
						src={menuSrc}
						className="scroll-indicator-content menu blend"
						alt=""
					/>
					<img
						src={closeSrc}
						className="scroll-indicator-content close blend"
						alt=""
					/>
				</CircularProgressbarWithChildren>
			</span>
		</main>
	)
}

export default Main
