import React, { useRef } from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import { color } from 'framer-motion'
import { Link } from 'react-router-dom'

function Subscriber() {
    const { subscriberItem, subscriberref,addChannel, removeHistory, subcriber, setSubcriber ,setSubcriberItem } = useContext(Theme)
    console.log(subscriberItem)
    return (
        <div className='Subscribers' >
            {subscriberItem.length !== 0 ?
                <main ref={subscriberref}>

                    <h1 style={{ fontWeight: "bold", margin: "10px 0 30px 20px" }}>All Subscriber</h1>
                    <div className="card mb-3 subcriberBox" style={{ border: "none" }} >
                        {subscriberItem?.map(ele => (
                            <div className="subscriberItem" key={ele.channelId} >
                                <Link to={`/Channel/${ele.channelHandle}`} style={{ color: "black", textDecoration: "none" }}>
                                    <div className="subImg"  onClick={() => addChannel(ele.channelId)}>
                                        <img style={{ borderRadius: "50%" }} src={ele.avatar[1].url} className="img-fluid subImg" alt="..." />
                                    </div>
                                </Link>
                                <Link to={`/Channel/${ele.channelHandle}`}  style={{ color: "black", textDecoration: "none" }}>
                                <div className="" onClick={() => addChannel(ele.channelId)}>
                                    <div className="card-body subscriberbody">
                                        <h5 className="card-title">{ele.title}</h5>
                                        <p className="card-text"><small className="text-body-secondary">{ele.channelHandle} {ele.subscriberCountText} subscribers</small></p>
                                        <p className="card-text">{ele.description?.slice(0, 170)}</p>
                                    </div>
                                </div>
                                </Link>
                                <div className="subcriberBtn" >
                                    <button type="button" className="btn btn-light subcriberBtn" onClick={(e) => {
                                        removeHistory(ele.channelId, "subscriber", subcriber, subscriberref, setSubcriber, setSubcriberItem, "https://yt-api.p.rapidapi.com/channel/about?id=")

                                    }}><i className="ri-arrow-down-s-line" ></i> Subscribe <i className="ri-notification-4-fill"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main> :
                <h2 style={{ textAlign: "center", margin: "300px 160px", fontSize: "1rem", fontWeight: "bold", color: "red", width: "50vw" }}>Channel is not available</h2>
            }
        </div>
    )
}

export default Subscriber
