import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Theme } from './ThemeContext'
import CustomHooks from './CustomHooks'


function SpecificVideo(props) {
    const { videoStart } = useContext(Theme)
    const [view] = CustomHooks(props.data.viewCount)
    // for views

    return (
        <Link to={`/${props.data.videoId}`} style={{ color: "black" }}>
            <div className="video-card" onClick={() => videoStart(props.data)}>
                <img src={props.data.thumbnail[0].url ? props.data.thumbnail[0].url : ""} alt="Video Thumbnail" className="thumbnail" />
                <div className="video-info">
                    <img src={props.data.channelThumbnail[0].url} alt="Channel Logo" className="channel-logo" />
                    <div className="details">
                        <h3 className="title">{props.data.title.slice(0, 40)}...</h3>
                        <p className="channel-name">{props.data.channelTitle}</p>
                        <p className="views-time">{view} • {props.data.publishedTimeText ? props.data.publishedTimeText : "2 days ago"}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SpecificVideo
