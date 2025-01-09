import React from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import { Link } from 'react-router-dom'

const sidebar = () => {
    const { sideref, setDifferentSection, callhistory, calllike, callwatch, callsubscriber } = useContext(Theme)
    return (
        <>
            <aside className="sidebar" id="sidebar" ref={sideref}>
                <ul>
                    <li onClick={() => setDifferentSection('home')}><Link to="/"><span className="icon"><i className="fa-solid fa-house"></i></span> Home</Link></li>
                    <li> <Link to='/Shorts' style={{paddingLeft : "35px"}}><span><i className="fa-solid fa-circle-play"></i></span>Shorts </Link></li>
                    <li onClick={callsubscriber}><Link to="/subscriber"><span className="icon">    <i className="fa-solid fa-bell"></i></span> Subscriptions</Link></li>
                    <hr />
                    <li>&ensp;&nbsp;You<span className="icon"><i className="ri-arrow-right-s-line"></i></span></li>
                    <li onClick={callhistory}><Link to='/history' ><span className="icon"><i className="fa-solid fa-clock-rotate-left"></i></span> History</Link></li>
                    <li onClick={() => {
                        calllike()
                        callwatch()
                    }}><Link to='/playlist'><span className="icon"><i class="ri-play-list-2-fill"></i></span> Playlist</Link></li>
                    <li onClick={calllike}><Link to="/likes"><span className="icon"><i className="ri-thumb-up-line"></i></span>Liked Videos</Link></li>
                    <li onClick={callwatch}><Link to="/watch"><span className="icon"><i class="ri-time-line"></i></span>Watch Later</Link></li>
                    <hr />
                    <li>&ensp;&nbsp;Explore<span className="icon"><i className="ri-arrow-right-s-line"></i></span></li>
                    <li onClick={() => setDifferentSection('trending')}><Link to="/trending"><span className="icon"><i class="ri-fire-line"></i></span>Trending</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default sidebar
