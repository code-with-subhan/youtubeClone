import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { Theme } from './ThemeContext';
import { useRef } from 'react';
import CustomHook from './CustomHooks';
import { Link } from 'react-router-dom';

function video() {
    const {
        video,
        videoDetail: data,
        otherDetail,
        customhistory,
        comments,
        SubscriberAdd,
        likesAdd,
        watchAdd,
        addChannel,
        playlistvideos,
    } = useContext(Theme)

    const [view] = CustomHook(otherDetail.viewCount)
    const ref = useRef(null)
    const sliderref = useRef(null)
    useEffect(() => {
        setInterval(() => {
            try{
                if (sliderref.current.scrollLeft !== sliderref.current.scrollWidth - 880) {
                    sliderref.current.scrollLeft += 840
                }
                if (sliderref.current.scrollLeft === sliderref.current.scrollWidth - 880) {
                    sliderref.current.scrollLeft = 0
                }
            }catch{}
        }, 5000);
    }, [])


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
            <div style={{ textAlign: 'center', width: "900px", borderRadius: "15px", overflow: "hidden" }} className='videoContainer'>
                <div className="videoPlayer">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${otherDetail?.videoId ? otherDetail?.videoId : otherDetail?.id}`}
                        width="840px"
                        height="480px"
                        controls={true} // Adds play/pause, volume, etc.
                        playing={true} // Autoplay disabled

                    />
                </div>
                <h3 style={{ textAlign: "start", lineHeight: "1.4", fontSize: "1.2rem", fontWeight: "bold" }}>{data.title}</h3>
                <div className='videoContent'>
                    <img src={video} alt="l" style={{ borderRadius: "50%" }} onClick={() => addChannel(data.channelId)}/>
                    <div className="videoChannelName">
                        <h4>{data.channelTilte}</h4>
                        <p>1M subcribers</p>
                    </div>
                    {/* buttons */}
                    <button type="button" className="btn btn-dark btn-random" style={{ background: "black", marginRight: "auto" }} onClick={() => SubscriberAdd(otherDetail)}>Subcribers</button>
                    <button style={{ background: '#f2f2f2' }} className='btn btn-light btn-random ' onClick={(e) => likesAdd(otherDetail, e)}><i className="ri-thumb-up-line" style={{ paddingRight: "5px" }}> </i> <span style={{ fontWeight: "500" }}>{view}</span> | <i className="ri-thumb-down-line"></i></button>
                    <button onClick={(e) => watchAdd(otherDetail, e)} type="button" className="btn btn-light btn-random" style={{ background: '#f2f2f2' }}>Watch later</button>
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
                {/* comments */}
                {comments.data &&
                    <div style={{ position: "relative" }}>
                        <div className="commentSubcontainer" ref={sliderref}>
                            {comments.data.map((e, index) => (
                                <div className="commentsItem" key={e.commentId} style={{ left: index * "200" }}>
                                    <div className="commentsBox" style={{ color: "white" }}>
                                        <img src={e?.authorThumbnail[0].url} alt="..." />
                                        <div className="commentsdetail" style={{ color: "white" }}>
                                            <p style={{ color: "white" }}><b>{e.authorText}</b> &ensp;<span>{e.publishedTimeText}</span></p>
                                            <p style={{ color: "white", width: "810px" }}>{e.textDisplay}</p>
                                            <p style={{ color: "white" }}>Translate to English</p>
                                            <p style={{ color: "white" }}><i className="ri-thumb-up-line"></i> <span style={{ fontSize: ".9rem" }}>{e.likesCount}</span> <i className="ri-thumb-down-line"></i> <img src={video} alt="" /> <span>Reply</span></p>
                                            {e.replyCount != 0 && <button className='btn btn-light btn-random commentbtn'><i className="ri-arrow-down-wide-line"></i> &ensp; {e.replyCount} Reply</button>}
                                        </div>
                                        <div className="commentsmenu">
                                            <i className="ri-more-2-line"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="btn1" ><i className="ri-arrow-left-s-line" onClick={(e) => {
                            sliderref.current.scrollLeft -= sliderref.current.clientWidth
                        }}></i></div>
                        <div className="btn2" onClick={(e) => {
                            try{

                                if (sliderref.current.scrollLeft !== sliderref.current.scrollWidth - 880) {
                                    sliderref.current.scrollLeft += sliderref.current.clientWidth
                                }
                                if (sliderref.current.scrollLeft === sliderref.current.scrollWidth - 880) {
                                    sliderref.current.scrollLeft = 0
                                }
                            }catch{}

                        }}><i className="ri-arrow-right-s-line"></i></div>
                    </div>
                }
                {comments.data &&
                    <div className="commentscontainer">
                        <div className="commentssetting">
                            <p>{comments.commentsCount} Comments</p>
                            <p><i className="ri-menu-2-fill"></i> <b>Sort by</b></p>
                        </div>
                        <div className="commentsBox">
                            <CommentsBox channelThumbnail={video} />
                        </div>
                    </div>
                }
                {/* comments End */}
            </div>
            <div className='related_videos_container' style={{ height: "unset" }}>
                {playlistvideos.length !== 0 &&
                    <div className="playlistcontainerVideo">
                        <h2>Liked Videos</h2>
                        <PlaylistVideo id={otherDetail?.videoId ? otherDetail?.videoId : otherDetail?.id} />
                    </div>
                }
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

function CommentsBox(props) {
    const { comments } = useContext(Theme)
    let mapping = comments.data.map((e) => (
        <div className="commentsItem" key={e.commentId}>
            <img src={e.authorThumbnail[0].url} alt="..." />
            <div className="commentsdetail">
                <p><b>{e.authorText}</b> &ensp;<span>{e.publishedTimeText}</span></p>
                <p>{e.textDisplay}</p>
                <p>Translate to English</p>
                <p><i className="ri-thumb-up-line"></i> <span style={{ fontSize: ".9rem" }}>{e.likesCount}</span> <i className="ri-thumb-down-line"></i> <img src={props.channelThumbnail} alt="" /> <span>Reply</span></p>
                {e.replyCount != 0 && <button className='btn btn-light btn-random commentbtn'><i className="ri-arrow-down-wide-line"></i> &ensp; {e.replyCount} Reply</button>}
            </div>
            <div className="commentsmenu">
                <i className="ri-more-2-line"></i>
            </div>
        </div>

    ))
    return (
        <>
            {mapping}
        </>
    )
}

function PlaylistVideo(props) {
    let { playlistvideos, videoStart } = useContext(Theme)
    let duplicate = playlistvideos
    let mapping = playlistvideos.map((e, index) => (
        <Link to={`/${e.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div className="playlistitemvideo" key={e.id} style={{ background: props.id == e.id ? "rgb(250, 247, 247)" : "white" }} onClick={() => videoStart(e, duplicate)}>
                <span>{props.id == e.id ? "▶" : index}</span>
                <img src={e.thumbnail[0].url} alt="..." />
                <div className="playlistContentvideo">
                    <h4>{e.title.slice(0, 50)}</h4>
                    <p>{e.channelTitle}</p>
                </div>
            </div>
        </Link>
    ))
    return (
        <>
            {mapping}
        </>
    )
}

export default video
