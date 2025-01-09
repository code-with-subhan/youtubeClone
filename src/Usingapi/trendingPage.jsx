import React, { useContext } from 'react'
import { Theme } from './ThemeContext'
import customHooks from './CustomHooks'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function trendingPage() {
    const { historyItems } = useContext(Theme)

    let mapping = historyItems.map(element => {
        return (
            <section key={element.videoId}>
                <Historycard element={element} />
            </section>
        )
    })

    return (
        <div className='trendingcontainer'>
            <main className="">
                <h2 className="trending-header">
                    <i className="ri-fire-line"></i> History
                </h2>
                <div className="cardhistorycontainer">
                    {mapping}
                </div>
            </main>
        </div>
    )
}

function Historycard(props) {
    const { videoStart } = useContext(Theme)
    const [view] = customHooks(props.element.viewCount)
    return (
        <Link to={`/history/${props.element.videoId}`} style={{ textDecoration: "none", color: "black" }} key={props.element.videoId}>
            <div className="cardhistory" onClick={() => videoStart(props.element)} style={{ width: "40rem", height: "10rem" }}>
                <img src={props.element.thumbnail[1].url} alt="" style={{ width: "250px", height: "140px" }} />
                <div className="card-body" style={{ marginLeft: "10px" }}>
                    <h5 className="card-title" style={{ width: "250px", fontSize: "1.1rem", fontWeight: "500", lineHeight: "1.5" }}>{props.element.title.slice(0, 45)}</h5>
                    <p className="card-text" style={{ margin: "10px 0", width: "250px", fontSize: ".8rem", color: "#767676" }}>{props.element.channelTitle} • {view} views</p>
                    <p style={{ fontSize: ".8rem", color: "#767676", margin: "10px 0" }}>{props.element.description.slice(0, 80)}</p>
                </div>
                <div>
                    <i className="ri-close-large-line cancelhistory" style={{ fontSize: "20px" }} ></i>
                </div>
            </div>
        </Link>
    )
}

export default trendingPage
