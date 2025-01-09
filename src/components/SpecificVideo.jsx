import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Theme } from './ThemeContext'
import CustomHooks from './CustomHooks'


function SpecificVideo(props) {
    const { videoStart, addChannel, customhistory, } = useContext(Theme)
    const [view] = CustomHooks(props.data.viewCount)

    return (
        <Link to={`/${props.data.videoId}`} style={{ color: "black", textDecoration: "none", lineHeight: "1.1" }}>
            <div className="video-card" onClick={() => {
                videoStart(props.data)
                customhistory(props.data)
            }}>
                <img src={props.data.thumbnail[0].url ? props.data.thumbnail[0].url : ""} alt="Video Thumbnail" className="thumbnail" />
                <div className="video-info">
                    <Link to={`/Channel/${props.data.channelHandle}`}>
                        <img src={props.data.channelThumbnail[0].url}  onClick={() => addChannel(props.data.channelId)} alt=".." className="channel-logo" />
                    </Link>
                    <div className="details" style={{position : "relative"}}>
                        <h3 className="title">{props.data.title.slice(0, 40)}...</h3>
                        <p className="channel-name">{props.data.channelTitle}</p>
                        <p className="views-time">{view} • {props.data.publishedTimeText ? props.data.publishedTimeText : "2 days ago"}</p>
                        {props.data.isLive && <button type="button" className="btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 16 16" width="16" focusable="false" aria-hidden="true" style={{ pointerEvents: "none", width: "20px", height: "100%", padding: "0" }}><path d="M9 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm1.11 2.13.71.71C11.55 10.11 12 9.11 12 8c0-1.11-.45-2.11-1.18-2.84l-.71.71c.55.55.89 1.3.89 2.13 0 .83-.34 1.58-.89 2.13Zm-4.93.71.71-.71C5.34 9.58 5 8.83 5 8c0-.83.34-1.58.89-2.13l-.71-.71C4.45 5.89 4 6.89 4 8c0 1.11.45 2.11 1.18 2.84Zm7.05 1.41.71.71C14.21 11.69 15 9.94 15 8s-.79-3.69-2.06-4.96l-.71.71C13.32 4.84 14 6.34 14 8c0 1.66-.68 3.16-1.77 4.25Zm-9.17.71.71-.71C2.68 11.16 2 9.66 2 8c0-1.66.68-3.16 1.77-4.25l-.71-.71C1.79 4.31 1 6.06 1 8s.79 3.69 2.06 4.96Z"></path></svg>LIve
                        </button>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SpecificVideo
