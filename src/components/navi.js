import React from "react"
import "../styles/navi.scss"

const Navi = (props) => {
  return (
    <nav id="navi" onWheel={props.onExtraWheel} 
    	className={`${!props.isIntro && !props.isMobile || props.mobileNavOpen ? 'show' : 'hide'}`}>
    	<span><a href="#home" onClick={event => {event.preventDefault(); props.jumpTo(3, 0)}} 
    		className={`link ${props.wp === 3 ? 'active' : ''}`}>Aktuell</a></span>
    	<span><a href="#info" onClick={event => {event.preventDefault(); props.jumpTo(4, 0)}} 
    		className={`link ${props.wp === 4 ? 'active' : ''}`}>Info</a></span>
    	<span><a href="#lineup" onClick={event => {event.preventDefault(); props.jumpTo(5, 0)}} 
    		className={`link ${props.wp === 5 ? 'active' : ''}`}>Lineup</a></span>
    	<span><a href="#gallery" onClick={event => {event.preventDefault(); props.jumpTo(6, 0)}} 
    		className={`link ${props.wp === 6 ? 'active' : ''}`}>Gallery</a></span>
    	<span><a href="#newsletter" onClick={event => {event.preventDefault(); props.jumpTo(7, 0)}} 
    		className={`link ${props.wp === 7 ? 'active' : ''}`}>Newsletter</a></span>
    	<span><a href="#kontakt" onClick={event => {event.preventDefault(); props.jumpTo(8, 0)}} 
    		className={`link ${props.wp === 8 ? 'active' : ''}`}>Kontakt</a></span>
    </nav>
  )
}

export default Navi
