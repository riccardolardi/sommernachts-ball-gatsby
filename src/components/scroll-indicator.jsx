import React from "react"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import scrollDownSrc from "../assets/scroll-down.svg"
import menuSrc from "../assets/menu.svg"
import closeSrc from "../assets/close.svg"

const ScrollIndicator = React.memo(function ScrollIndicator(props) {
  return (
    <span
      className={`scroll-indicator ${
        props.mobileNavOpen ? "mobile-nav-open blend" : ""
      } 
				${props.wp < 3 || !props.isMobile ? "blend" : ""} 
				${props.wp < 3 && props.isMobile ? "is-scroll" : "is-menu"} 
				${props.showScrollIndicator ? "show" : "hide"} wp${props.wp} ${
        props.inverted ? "inverted" : ""
      }`}
      onWheel={props.onExtraWheel}
      onClick={() => {
        if (!props.isMobile || (props.isMobile && props.wp < 3))
          props.scrollToNextWP()
        if (props.isMobile && props.wp > 2)
          props.setMobileNavOpen(!props.mobileNavOpen)
      }}
    >
      <CircularProgressbarWithChildren
        maxValue={1}
        strokeWidth={6}
        value={
          props.isMobile && props.wp > 2
            ? 1 - props.scrolledPercent
            : props.scrolledPercent
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
  )
})

export default ScrollIndicator
