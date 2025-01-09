import React from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import CustomHooks , {customHover} from './CustomHooks'
import { Link } from 'react-router-dom'
function Watch() {
    const { watchitem, videoStart, removeHistory, watch, watchref, setwatch, setwatchitem } = useContext(Theme)
    console.log(watchref?.current?.innerHTML, watchitem)
    const [hover, sethover, ref] = customHover()

    return (
        <div className='likeContainer' >
            {watchitem?.length !== 0 ?
                <main ref={watchref}>
                    <div className="likedpreview" style={{ backgroundImage: `url(${watchitem[0]?.thumbnail[1]?.url})` }}>
                        <div className="likepreviewimg" >
                            <img src={watchitem[0]?.thumbnail[1]?.url} alt="" />
                        </div>
                        <h1>watch Videos</h1>
                        <h6>Climbing Phase</h6>
                        <p>12 videos No views updated today</p>
                        <a><i className="ri-download-fill"></i></a>
                        <div className="likedplaybtns">
                            <button onClick={() => videoStart(watchitem[0], watchitem)}>
                                <Link to={`/${watchitem[0]?.id}`} style={{ textDecoration: "none", color: "black", background: "none" }}>
                                    ▶ Play All
                                </Link>
                            </button>
                            <button className='shuffle'><i className="ri-shuffle-line"></i> Shuffle</button>
                        </div>
                    </div>
                    {/* ============ */}
                    <div className="likedvideocontainer" >
                        <div className="likeCategories">
                            <button type="button" className="btn btn-dark">All</button>
                            <button type="button" className="btn btn-light">Videos</button>
                            <button type="button" className="btn btn-light">Shorts</button>
                        </div>
                        {watchitem.map((e, index) => {
                            const [view] = CustomHooks(e?.viewCount)
                            return (
                                <div key={e?.id} className="likedVideosBox" onClick={() => videoStart(e)}>
                                    <div className="likevideoitem" style={{ display: "flex" }}>

                                        <Link to={`/${e?.id}`} style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center", gap: "20px" }}>
                                            <span>{index + 1}</span>
                                            <img src={e?.thumbnail[0].url} alt="" />
                                            <div className="likeContent">
                                                <h2>{e?.title}</h2>
                                                <p>{e?.channelTitle} • {view} views • 1 year ago</p>
                                            </div>
                                        </Link>
                                        <div className="Likemenu">
                                            <i className="ri-more-2-line" onClick={(a) => {
                                                ref.current[index].style.display = ref.current[index].style.display == "none" ? "block" : "none"
                                            }} ></i>
                                            <div className="showbox" ref={(el) => ref.current[index] = el} style={{display: "none"}}>
                                                <ul>
                                                    <li>Add to Queue</li>
                                                    <li>Share</li>
                                                    <li onClick={() => { removeHistory(e?.id, "watch", watch, watchref, setwatch, setwatchitem, "https://yt-api.p.rapidapi.com/video/info?id=") }}>Remove from Watched Videos</li>
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

export default Watch
