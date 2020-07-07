import React from "react"
import "../styles/extraballs.scss"

const ExtraBalls = React.memo(function ExtraBalls(props) {

  const [isMounted, setIsMounted] = React.useState(false)

  const translations = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null)
  ]

  React.useEffect(() => {
    setIsMounted(true)
    translations.forEach(el => el.current = Math.random() * -2)
  }, [])

  return (
    <React.Fragment>
      <span className={`extra-ball blend leading 
        wp${props.wp} ${isMounted ? 'show' : 'hide'}`} 
          style={{transform: `translateZ(${translations[0].current}px)`}} /> 
      <span className={`extra-ball blend leading 
        wp${props.wp} ${isMounted ? 'show' : 'hide'}`} 
          style={{transform: `translateZ(${translations[1].current}px)`}} /> 
      <span className={`extra-ball blend trailing 
        wp${props.wp} ${isMounted ? 'show' : 'hide'}`} 
          style={{transform: `translateZ(${translations[2].current}px)`}} /> 
      <span className={`extra-ball blend trailing 
        wp${props.wp} ${isMounted ? 'show' : 'hide'}`} 
          style={{transform: `translateZ(${translations[3].current}px)`}} /> 
      <span className={`extra-ball blend trailing 
        wp${props.wp} ${isMounted ? 'show' : 'hide'}`} 
          style={{transform: `translateZ(${translations[4].current}px)`}} /> 
    </React.Fragment>
  )
})

export default ExtraBalls
