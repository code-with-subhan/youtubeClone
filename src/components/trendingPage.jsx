import React, { useContext } from 'react'
import { Theme } from './ThemeContext'
import customHooks from './CustomHooks'
import { Link } from 'react-router-dom'
import { h1 } from 'framer-motion/client'

function trendingPage() {
    const { historyItems, historyref } = useContext(Theme)
    console.log(historyItems)
    let mapping = historyItems?.map(element => {
        return (
            <main key={element.id}>
                <Historycard element={element} />
            </main>
        )
    })

    return (
        <div className='trendingcontainer' style={{ marginLeft: "260px" }}>
            {historyItems.length !== 0 ?
                <main className="">
                    <h2 className="trending-header">
                        <i className="ri-fire-line"></i> History
                    </h2>
                    <div className="cardhistorycontainer" ref={historyref}>
                        {mapping}
                    </div>
                </main> :
                <h2 style={{ textAlign: "center", margin: "300px 160px", fontSize: "1rem", fontWeight: "bold", color: "red", width: "50vw" }}>Video is not available</h2>
            }
        </div>
    )
}

function Historycard(props) {
    const { videoStart, removeHistory, history, historyref, sethistory, sethistoryItems } = useContext(Theme)
    const [view] = customHooks(props?.element?.viewCount)
    return (
        <div key={props?.element?.id} className="cardhistory" onClick={() => videoStart(props?.element)} style={{ width: "40rem", height: "10rem" }}>
            <Link to={`/history/${props?.element?.id}`} style={{ display: "flex", textDecoration: "none", color: "black" }}>
                <img src={props?.element?.thumbnail[0]?.url} alt="" style={{ width: "250px", height: "140px" }} />
                <div className="card-body" style={{ marginLeft: "10px" }}>
                    <h5 className="card-title" style={{ width: "250px", fontSize: "1.1rem", fontWeight: "500", lineHeight: "1.5" }}>{props?.element?.title?.slice(0, 45)}</h5>
                    <p className="card-text" style={{ margin: "10px 0", width: "250px", fontSize: ".8rem", color: "#767676" }}>{props?.element?.channelTitle} • {view} views</p>
                    <p style={{ fontSize: ".8rem", color: "#767676", margin: "10px 0" }}>{props?.element?.description?.slice(0, 80)}</p>
                </div>
            </Link>
            <div>
                <i className="ri-close-large-line cancelhistory" onClick={() => removeHistory(props?.element?.id, "history", history, historyref, sethistory, sethistoryItems, "https://yt-api.p.rapidapi.com/video/info?id=")} style={{ fontSize: "20px" }}></i>
            </div>
        </div>
    )
}

export default trendingPage
