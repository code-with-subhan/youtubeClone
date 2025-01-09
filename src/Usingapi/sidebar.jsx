import React from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import { Link } from 'react-router-dom'

const sidebar = () => {
    const { sideref , searchinput , callhistory } = useContext(Theme)
    return (
        <>
            <aside className="sidebar" id="sidebar" ref={sideref}>
                    <ul>
                        <li onClick={()=> searchinput('https://yt-api.p.rapidapi.com/home')}><Link to="/"><span className="icon"><i className="fa-solid fa-house"></i></span> Home</Link></li>
                        <li><a href="#"><span className="icon">    <i className="fa-solid fa-circle-play"></i> 
                        </span>Shorts </a></li>
                        <li><a href="#"><span className="icon">    <i className="fa-solid fa-bell"></i>
                        </span> Subscriptions</a></li>
                        <hr />
                        <li><a href="#" style={{ fontSize :"1.1rem"}}>&ensp;&nbsp;You<span className="icon"><i className="ri-arrow-right-s-line"></i></span></a></li>
                        <li onClick={callhistory}><Link to='/history'><span className="icon"><i className="fa-solid fa-clock-rotate-left"></i></span> History</Link></li>
                        <li><a href="#"><span className="icon"><i className="ri-thumb-up-line"></i></span>Liked Videos</a></li>
                        <hr />
                        <li><a href="#" style={{ fontSize :"1.1rem"}}>&ensp;&nbsp;Explore<span className="icon"><i className="ri-arrow-right-s-line"></i></span></a></li>
                        <li onClick={() => searchinput('https://yt-api.p.rapidapi.com/trending?geo=US')}><Link to="/trending"><span className="icon"><i className="ri-thumb-up-line"></i></span>Trending</Link></li>
                    </ul>
            </aside>
        </>
    )
}

export default sidebar
