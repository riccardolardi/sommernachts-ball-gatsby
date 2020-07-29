import React from "react"
import { LazyLoadImage, LazyLoadComponent } from "react-lazy-load-image-component"
import CancelIcon from "@material-ui/icons/Cancel"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import '../styles/archivegallery.scss'

const logoSrcW = require('../assets/migros_w.svg')

const ArchiveGallery = (props) => {
	const data = props.data.wpgraphql.archiveGalleries.nodes
	const [activeGalleryIndex, setActiveGalleryIndex] = React.useState(null)
	const [activeLightboxEl, setActiveLightboxEl] = React.useState(null)

	if (typeof window !== 'undefined') {
		document.querySelector('html').classList.add('archive-gallery')
		document.querySelector('body').classList.add('archive-gallery')
	}

	function onGalleryLinkClick(index) {
		setActiveGalleryIndex(index)
	}

	function onImageClick(index) {
		setActiveLightboxEl(index)
		console.log(index)
	}

	const LightBox = (props) => {

		return (
			<div id="lightbox">
				{props.el.mediaType === 'image' && <LazyLoadImage 
					src={props.el.largeSource} 
					effect='opacity' 
					className="lightbox-photo" 
					threshold={0} 
					alt={props.el.mediaDetails.meta.caption || props.el.altText} />}
				{props.el.mimeType === 'video/mp4' && <LazyLoadComponent 
					className="lightbox-video" 
					threshold={0}>
					<span className="video">
						<video controls>
							<source src={props.el.mediaItemUrl} type="video/mp4" />
						</video>
					</span>
				</LazyLoadComponent>}
				<div className="info">
					{props.el.mediaDetails.meta?.title && 
						<label className="meta-title">Titel: {props.el.mediaDetails.meta.title}</label>}
					{props.el.mediaDetails.meta?.caption && 
						<label className="meta-caption">Beschreibung: {props.el.mediaDetails.meta.caption}</label>}
					{props.el.mediaDetails.meta?.copyright && 
						<label className="meta-copyright">Copyright: {props.el.mediaDetails.meta.copyright}</label>}
				</div>
				{activeLightboxEl > 0 && <ArrowBackIcon className="icon back" fontSize="large" onClick={() => setActiveLightboxEl(activeLightboxEl - 1)} />}
				{activeLightboxEl + 1 < data[activeGalleryIndex].acfArchiveGallery.media.length && <ArrowForwardIcon className="icon forward" fontSize="large" onClick={() => setActiveLightboxEl(activeLightboxEl + 1)} />}
				<CancelIcon className="icon close" fontSize="large" onClick={() => setActiveLightboxEl(null)} />
			</div>
		)
	}

  return (
  	<div id="archive-gallery">
	    <header className="text-logo">
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
	    <img src={logoSrcW} className="migros-logo" alt="Migros Kulturprozent" />
	    <main id="content">
	    	<div className="gallery-sticky-top">
		    	<h1 className="gallery-title">Medien-Archiv</h1>
		    	{data.map((el, index) => {
		    		return <span key={index} className={`gallery-link link ${activeGalleryIndex === index ? 'active' : ''}`} 
		    			onClick={() => onGalleryLinkClick(index)}>{el.title}</span>
		    	})}
		    </div>
	    	{activeGalleryIndex !== null && <article>
					{data[activeGalleryIndex].acfArchiveGallery.media.map((el, index) => {
						if (el.mediaType === 'image') return <LazyLoadImage 
							src={el.mediumSource} 
							effect='opacity' 
							width={el.mediaDetails.width} 
							height={el.mediaDetails.height} 
							className="gallery-photo" 
							threshold={0} 
							onClick={() => onImageClick(index)} 
							alt={el.mediaDetails.meta.caption || el.altText} />
						if (el.mimeType === 'video/mp4') return <LazyLoadComponent 
							className="gallery-video" 
							threshold={0}>
							<span className="video">
								<video controls>
									<source src={el.mediaItemUrl} type="video/mp4" />
								</video>
							</span>
						</LazyLoadComponent>
					})}
	    	</article>}
	    </main>
	    {activeLightboxEl !== null && <LightBox 
	    	el={data[activeGalleryIndex].acfArchiveGallery.media[activeLightboxEl]} />}
  	</div>
  )
}

export default ArchiveGallery