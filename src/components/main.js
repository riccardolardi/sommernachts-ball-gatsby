import React from "react"
import { useScroll, useDebounce } from "react-use"
import Vimeo from "@u-wave/react-vimeo"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import Classnames from "classnames"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "../styles/main.scss"

const tanzwerkSrcB = require('../assets/tanzwerk_b.svg');
const tanzwerkSrcW = require('../assets/tanzwerk_w.svg');
const sbbSrcB = require('../assets/sbb_b.svg');
const sbbSrcW = require('../assets/sbb_w.svg');
const shopvilleSrcB = require('../assets/shopville_b.svg');
const shopvilleSrcW = require('../assets/shopville_w.svg');
const zurichSrcB = require('../assets/zurich_b.svg');
const zurichSrcW = require('../assets/zurich_w.svg');
const radio1SrcB = require('../assets/radio1_b.svg');
const radio1SrcW = require('../assets/radio1_w.svg');
const sayflowersSrcB = require('../assets/sayflowers_b.svg');
const sayflowersSrcW = require('../assets/sayflowers_w.svg');
const logoSrcB = require('../assets/migros_b.svg');
const logoSrcW = require('../assets/migros_w.svg');
const scrollDownSrc = require('../assets/scroll-down.svg');
const menuSrc = require('../assets/menu.svg');
const closeSrc = require('../assets/close.svg');

const Layout = (props) => {

	const winWidth = window.innerWidth;
	const winHeight = window.innerHeight;

	const articleRef = React.useRef([]);
	const scrollRef = React.useRef(null);

	const scrollPosition = useScroll(scrollRef);

	const [scrolledPercent, setScrolledPercent] = React.useState(0);
	const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
	const [allowScroll, setAllowScroll] = React.useState(true);
	const [delta, setDelta] = React.useState(null);
	const [newsletterEmail, setNewsletterEmail] = React.useState('');
	const [newsletterEmailIsValid, setNewsletterEmailIsValid] = React.useState(false);
	const [newsletterError, setNewsletterError] = React.useState(false);
	const [newsletterSignupSuccess, setNewsletterSignupSuccess] = React.useState(false);
	const [registeringNewsletter, setRegisteringNewsletter] = React.useState(false);

	useDebounce(() => setAllowScroll(true), 250, [delta]);

	React.useEffect(() => {
		setShowScrollIndicator(props.wp !== 9 && (props.wp < 3 || scrolledPercent > 0.5 || props.isMobile));
	}, [scrolledPercent]);

	React.useEffect(() => {
		setNewsletterEmailIsValid(validateEmail(newsletterEmail));
	}, [newsletterEmail]);

	React.useEffect(() => {
		if (props.wp > props.prevWp && props.isTouch && 
			props.wp > 2 && props.wp !== 9 && 
			(props.isTouch || !props.isTouch && delta > 20)) {
			setAllowScroll(false);
			props.jumpTo(props.wp, 250);
			setTimeout(() => setAllowScroll(true), 250);
		}
	}, [props.wp]);

	React.useLayoutEffect(() => {
		const scrollTop = scrollPosition.y;
		for (let i = 0; i < articleRef.current.length; i++) {
			const article = articleRef.current[i];
			const articleTop = article.offsetTop;
			const articleHeight = article.offsetHeight;
			const articleWp = parseInt(articleRef.current[i].dataset.wp);
			if (scrollTop >= articleTop && scrollTop < articleTop + articleHeight) {
				props.setPrevWp(props.wp);
				props.setWp(articleWp);
				const pctVisible = 1 - article.getBoundingClientRect().bottom / 
					winHeight * (winHeight / articleHeight);
				if (articleWp === 1) setScrolledPercent(pctVisible * 0.5);
				if (articleWp === 2) setScrolledPercent(0.5 + pctVisible * 0.5);
				if (articleWp > 2) setScrolledPercent(pctVisible);
			}
		}
	}, [scrollPosition]);

	const logo1style = props.wp === 1 ? {
		transform: `scale(${2.42 + (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winHeight / 20}) 
		translateX(${(-(Math.cos(Math.PI * scrolledPercent) - 1) / 2) * winWidth / 20}px)`
	} : {};

	const logo2style = props.wp === 2 ? {
		transform: `scale(${2.42 + (1 - (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2)) * winHeight / 20}) 
		translateX(${(1 - (-(Math.cos(Math.PI * scrolledPercent) - 1) / 2)) * winWidth / -25}px)
		translateY(${Math.pow(10, 10 * scrolledPercent - 10) * winHeight/-20}px)`
	} : {};

	function onWheel(event) {
		setDelta(event.deltaY);
	}

	function scrollToNextWP() {
		const duration = props.wp < 3 ? 3000 / props.wp : 250;
		props.jumpTo(props.wp < 3 ? 3 : props.wp + 1, duration);
	}

	function toggleArtistDetails(index) {
		const el = document.querySelectorAll('.artist-info .details')[index];
		el.classList.toggle('open');
	}

	function validateEmail(input) {
		return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(input);
	}

	function registerNewsletter() {
		setRegisteringNewsletter(true);
		fetch(document.location.href + 'newsletter.php?email=' + newsletterEmail)
			.then(response => response.json())
				.then(data => {
					setRegisteringNewsletter(false);
					if (data.StatusCode === 400) {
						console.error(data);
						setNewsletterError(true);
						setNewsletterSignupSuccess(false);
					} else {
						setNewsletterError(false);
						setNewsletterSignupSuccess(true);
					}
				});
	}

	const classes = Classnames({
		'show': !props.mobileNavOpen,
		'hide': props.mobileNavOpen,
		'scroll-lock': !allowScroll
	});

  return (
  	<main id="main" className={classes} ref={scrollRef} onWheel={onWheel}>
  		
  	</main>
  )
}

export default Layout
