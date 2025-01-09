import React from 'react'
import { Theme } from './ThemeContext'
import { useContext } from 'react'
import CustomHooks from './CustomHooks'
import { Link } from 'react-router-dom'
import { div } from 'framer-motion/client'


function Channel() {
    const { selectchannelButton, videoStart, Channelsetting , setShorts } = useContext(Theme)
    const { channels, channelitems, channelcontent, channelplaylist, channelShorts } = Channelsetting
    console.log(channelShorts)

    return (
        <div className='ChannelContainer'>
            <div className="channelBanner">
                <img src={channelcontent?.meta?.banner[0]?.url} alt="..." />
            </div>
            <div className="channelavatarbox">
                <div className="channelavatarImage">
                    <img src={channelcontent?.meta?.avatar[0]?.url} alt="..." />
                </div>
                <div className="channelcontent">
                    <h1>{channelcontent?.meta?.title}</h1>
                    <p><span>{channelcontent?.meta?.channelHandle}</span> • {channelcontent?.meta?.subscriberCountText} subscribers • {channelcontent?.meta?.videosCountText}</p>
                    <p>{channelcontent?.meta?.description.slice(0, 90)} </p>
                    <button className='btn btn-dark'>Subcribe</button>
                </div>
            </div>
            <div className="channelCategory">
                {
                    channels?.meta?.tabs?.map((e) => {
                        return (
                            <button className={e === "Home" ? "channelactive" : ""} onClick={(e) => selectchannelButton(e, channelcontent?.meta?.channelId)}>{e}</button>
                        )
                    }) ||
                    channelitems?.meta?.tabs?.map((e) => {
                        return (
                            <button className={e === "Videos" ? "channelactive" : ""} onClick={(e) => selectchannelButton(e, channelcontent?.meta?.channelId)}>{e}</button>
                        )
                    }) ||
                    channelplaylist?.meta?.tabs?.map((e) => {
                        return (
                            <button className={e === "Playlists" ? "channelactive" : ""} onClick={(e) => selectchannelButton(e, channelcontent?.meta?.channelId)}>{e}</button>
                        )
                    }) ||
                    channelShorts?.meta?.tabs?.map((e) => {
                        return (
                                <button className={e === "Shorts" ? "channelactive" : ""} onClick={(e) => selectchannelButton(e, channelcontent?.meta?.channelId)}>{e}</button>
                        )
                    })
                }
                <span><i className="ri-search-line"></i></span>
            </div>
            <div className="channelhomevideos">
                <h4>For you</h4>
                <div className="channelVideosBox">
                    {channels && channels?.data?.map(e => {
                        return e?.data?.map((ele) => {
                            if (ele.type === "video") {
                                const [view] = CustomHooks(ele.viewCount)
                                return (
                                    <div className="ChannelsItem" key={ele.videoId} onClick={() => videoStart(ele)}>
                                        <Link to={`/${ele.videoId}`} style={{ color: "black", textDecoration: "none" }}>
                                            <img src={ele?.thumbnail[0]?.url} alt="" />
                                            <h6>{ele.title}</h6>
                                            <p>{view} views {ele?.publishedTimeText ? ele?.publishedTimeText : "2 days ago"}</p>
                                            <i className="ri-more-2-fill"></i>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    })}
                    {channelitems && channelitems?.data?.map((ele) => {
                        const [view] = CustomHooks(ele.viewCount)
                        return (
                            <div className="ChannelsItem" key={ele.videoId} onClick={() => videoStart(ele)}>
                                <Link to={`/${ele.videoId}`} style={{ color: "black", textDecoration: "none" }}>
                                    <img src={ele?.thumbnail[0]?.url} alt="" />
                                    <h6>{ele.title}</h6>
                                    <p>{view} views {ele?.publishedTimeText ? ele?.publishedTimeText : "2 days ago"}</p>
                                    <i className="ri-more-2-fill"></i>
                                </Link>
                            </div>
                        )
                    })
                    }
                    {channelplaylist && channelplaylist?.data?.map((e, index) => {
                        return (
                            <Link to={`/${channelplaylist[0]?.data[0]?.videoId}`} style={{ color: "black", textDecoration: "none" }}>
                                <div className="playlistItems channelplaylist" key={index} onClick={() => videoStart(channelplaylist[0]?.meta, e?.data)}>
                                    <div className="playlistimage">
                                        <img src={e?.data[0]?.thumbnail[2]?.url} alt="..." />
                                        <img src={e?.data ? e?.data[1]?.thumbnail[0]?.url : e?.data[0]?.thumbnail[0]?.url} alt="..." className='secondplaylist' />
                                        <img src={e?.data ? e?.data[2]?.thumbnail[0]?.url : e?.data[1]?.thumbnail[0]?.url} alt="..." className='thirdplaylist' />
                                        <div className="videoslength"><i className="ri-menu-add-fill"></i> 12 Videos</div>
                                    </div>
                                    <div className="playlistcontent">
                                        <h6>{e?.meta?.title}</h6>
                                        <p>view full course</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }


                    <div className="channelshorts">
                        {channelShorts && channelShorts?.data?.map((e, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    let data = channelShorts?.data?.filter((a) => {
                                        console.log(e.videoId , a.videoId)
                                    return  e.videoId !== a.videoId
                                    } )
                                    data.unshift(e)
                                    console.log(data)
                                    let obj = {data}
                                    setShorts(obj)
                                }}>
                                    <Link to='/Shorts'>
                                    <div className="">
                                        <img src={e?.thumbnail[0]?.url} alt="..." />
                                    </div>
                                    <div className="">
                                        <h6>{e?.title}</h6>
                                        <p>{e?.viewCountText}</p>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Channel
