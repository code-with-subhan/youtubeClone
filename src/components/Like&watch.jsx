import React, { useRef } from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import { useState } from 'react'
import CustomHooks, { customHover } from './CustomHooks'
import { Link } from 'react-router-dom'

function Likewatch() {
    const { likesitem, videoStart, removeHistory, likeref, likes, setlikes, setlikesitem } = useContext(Theme)
    // const [hover, sethover] = useState(false)
    // const ref = useRef(null)
    const [hover , sethover , ref] = customHover()
    return (
        <div className='likeContainer' >
            {likesitem?.length !== 0 ?
                <main ref={likeref}>
                    <div className="likedpreview" style={{ backgroundImage: `url(${likesitem[1]?.thumbnail[1]?.url})` }}>
                        <div className="likepreviewimg" >
                            <img src={likesitem[0]?.thumbnail[1]?.url} alt="" />
                        </div>
                        <h1>Liked Videos</h1>
                        <h6>Climbing Phase</h6>
                        <p>12 videos No views updated today</p>
                        <a><i className="ri-download-fill"></i></a>
                        <div className="likedplaybtns">
                            <button onClick={() => videoStart(likesitem[0], likesitem)}>
                                <Link to={`/${likesitem[0]?.id}`} style={{ textDecoration: "none", background: "none", color: "black" }}>
                                    ▶ Play All
                                </Link>
                            </button>
                            <button className='shuffle'><i className="ri-shuffle-line"></i> Shuffle</button>
                        </div>
                    </div>

                    <div className="likedvideocontainer">
                        <div className="likeCategories">
                            <button type="button" className="btn btn-dark">All</button>
                            <button type="button" className="btn btn-light">Videos</button>
                            <button type="button" className="btn btn-light">Shorts</button>
                        </div>
                        {likesitem.map((e, index) => {
                            const [view] = CustomHooks(e?.viewCount)
                            return (
                                <div className="likedVideosBox" onClick={() => videoStart(e)}>
                                    <div className="likevideoitem" style={{ display: "flex" }}>
                                        <Link to={`/${e?.id}`} style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center", gap: "20px" }}>
                                            <span>{index + 1}</span>
                                            <img src={e?.thumbnail[0]?.url} alt="" />
                                            <div className="likeContent">
                                                <h2>{e?.title}</h2>
                                                <p>{e?.channelTitle} • {view} views • 1 year ago</p>
                                            </div>
                                        </Link>
                                        <div className="Likemenu">
                                            <i className="ri-more-2-line" id={index} onClick={(a) => {

                                                    ref.current[index].style.display = ref.current[index].style.display == "none" ? "block" : "none"
                                                    console.log(a.target.id, index)
                                            }} ></i>
                                            <div className="showbox" ref={(el ) => ref.current[index] = el} style={{display : "none"}}>
                                                <ul>
                                                    <li>Add to Queue</li>
                                                    <li>Share</li>
                                                    <li onClick={() => { removeHistory(e?.id, "likes", likes, likeref, setlikes, setlikesitem, "https://yt-api.p.rapidapi.com/video/info?id=") }}>Remove from Liked Videos</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>
                :
                <h2 style={{ textAlign: "center", margin: "300px 160px", fontSize: "1rem", fontWeight: "bold", color: "red", width: "50vw" }}>Video is not available</h2>
            }
        </div>
    )
}

export default Likewatch
