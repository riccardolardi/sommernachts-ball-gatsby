import React from "react"
import "../styles/stream.scss"

const Stream = React.memo(function Stream(props) {

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="stream">
      <div
        className="video"
        style={{
          padding: '56.25% 0 0 0',
          position: 'relative'
        }}
      >
        <iframe
          src={props.streamLive ? 'https://vimeo.com/event/1176343/embed' : props.archiveVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}>
        </iframe>
      </div>
      {props.streamLive && <div className="chat">
        <iframe
          src="https://vimeo.com/event/1176343/chat/"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>}
    </div>
  )
})

export default Stream
