import React from "react"
import "../styles/navi.scss"

const Navi = (props) => {
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
  return (
    <nav id="navi" onWheel={props.onExtraWheel} 
    	className={`${!props.isIntro && !props.isMobile || props.mobileNavOpen ? 'show' : 'hide'}`}>
    	{newsData && <span><a href="#home" onClick={event => {event.preventDefault(); props.jumpTo(3, 0)}} 
    		className={`link ${props.wp === 3 ? 'active' : ''}`}>Aktuell</a></span>}
    	{infoData && <span><a href="#info" onClick={event => {event.preventDefault(); props.jumpTo(4, 0)}} 
    		className={`link ${props.wp === 4 ? 'active' : ''}`}>Info</a></span>}
    	{lineupData && <span><a href="#lineup" onClick={event => {event.preventDefault(); props.jumpTo(5, 0)}} 
    		className={`link ${props.wp === 5 ? 'active' : ''}`}>Lineup</a></span>}
    	{galleryData && <span><a href="#gallery" onClick={event => {event.preventDefault(); props.jumpTo(6, 0)}} 
    		className={`link ${props.wp === 6 ? 'active' : ''}`}>Gallery</a></span>}
    	{newsletterData && <span><a href="#newsletter" onClick={event => {event.preventDefault(); props.jumpTo(7, 0)}} 
    		className={`link ${props.wp === 7 ? 'active' : ''}`}>Newsletter</a></span>}
    	{contactData && <span><a href="#kontakt" onClick={event => {event.preventDefault(); props.jumpTo(8, 0)}} 
    		className={`link ${props.wp === 8 ? 'active' : ''}`}>Kontakt</a></span>}
    </nav>
  )
}

export default Navi
