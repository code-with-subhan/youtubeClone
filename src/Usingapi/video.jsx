import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { Theme } from './ThemeContext';
import { useRef } from 'react';
import CustomHook from './CustomHooks';
import { useParams } from 'react-router-dom';
function video() {
    const param = useParams()
    console.log(param)
    const { video, videoDetail: data, otherDetail , customhistory} = useContext(Theme)
    const [view] = CustomHook(otherDetail.viewCount)
    const ref = useRef(null)
    customhistory(otherDetail)

    function setheight(e) {
        if (e.target.textContent === "show more") {
            ref.current.style.height = 'unset'
            e.target.textContent = "show less"
        } else {
            ref.current.style.height = '40px'
            e.target.textContent = "show more"
        }
    }

    // Context
    return (
        <main className='related_videos'>
            <div style={{ textAlign: 'center', width: "900px", borderRadius : "15px" , overflow: "hidden" }} className='videoContainer'>
                <div className="videoPlayer">
                    <ReactPlayer
                        url={`https://yt-api.p.rapidapi.com/video/info?id=${otherDetail.videoId}`}
                        width="840px"
                        height="480px"
                        controls={true} // Adds play/pause, volume, etc.
                        playing={true} // Autoplay disabled

                    />
                </div>
                <h3 style={{ textAlign: "start", lineHeight: "1.4", fontSize: "1.2rem", fontWeight: "bold" }}>{data.title}</h3>
                <div className='videoContent'>
                    <img src="..." alt="helo" style={{ borderRadius: "50%" }} />
                    <div className="videoChannelName">
                        <h4>{data.channelTilte}</h4>
                        <p>1M subcribers</p>
                    </div>
                    {/* buttons */}
                    <button type="button" className="btn btn-dark btn-random" style={{ background: "black", marginRight: "auto" }}>Subcribers</button>
                    <button style={{ background: '#f2f2f2' }} className='btn btn-light btn-random '><i className="ri-thumb-up-line" style={{ paddingRight: "5px" }}> </i> <span style={{ fontWeight: "500" }}>{view}</span> | <i className="ri-thumb-down-line"></i></button>
                    <button type="button" className="btn btn-light btn-random" style={{ background: '#f2f2f2' }}>Download</button>
                </div>
                <div className="des-vid-con">
                    <div className="description-information">
                        <span style={{ fontWeight: "bold", marginRight: "10px" }}>{view}</span>
                        <span style={{ fontWeight: "bold" }}>{otherDetail.publishedTimeText ? otherDetail.publishedTimeText : "2 days ago"}</span>
                    </div>

                    {data.description && <p className='videodes' ref={ref}>
                        {data.description}
                    </p>}
                    {data.description && <span className='show more' onClick={setheight}>Show more</span>}
                </div>
            </div>
            <div className='related_videos_container' style={{ height: "unset" }}>
                <h5 style={{ fontWeight: "bold", textAlign: "center" }}>Related Videos</h5>
                <Relatedvideos />
            </div>
        </main>
    )
}


function Relatedvideos() {
    const { relatedVideos, videoStart } = useContext(Theme)
    const helo = relatedVideos.map((e) => {
        if (e.type === "video") {
            const [view] = CustomHook(e.viewCount)
            return (
                <div key={e.videoId} className="card mb-3" style={{ maxWidth: "540px", cursor: "pointer", border: "none" }} onClick={() => videoStart(e)}>
                    <div className="row specficCard ">
                        <div className="col-md-4">
                            <img src={e.thumbnail[0].url ? e.thumbnail[0].url : ""} alt="..." />
                        </div>
                        <div className="col-md-8 related_content" >
                            <h5 className=" fw-bold related_title" >{e.title.slice(0, 60)}</h5>
                            <p className="card-text">{e.channelTitle}</p>
                            <p className="card-text"><span>{view}</span> <span>• {e.publishedTimeText ? e.publishedTimeText : "2 days ago"}</span></p>
                        </div>
                    </div>
                </div>
            )
        }
    })
    return (
        <>
            {helo}
        </>
    )
}

export default video
