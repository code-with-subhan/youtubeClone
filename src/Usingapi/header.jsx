import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Theme } from './ThemeContext'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const header = (props) => {
    const { showsidebar, inputvalue, setinput, searchinput, } = useContext(Theme)
    return (
        <>
            <LoadingBar
                color='red'
                progress={100}
            />
            <header className="navbar">
                <div className="navbar-left">
                    <button className="menu-toggle" id="menuToggle" onClick={showsidebar}>&#9776;</button>
                    <Link to='/' onClick={() => {
                        useEffect(() => {
                            searchinput('https://yt-api.p.rapidapi.com/home')
                        }, [])
                    }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="logo" />
                        <sub style={{ color: "black", margin: "0 0 12px 4px", fontSize: "9px" }}>PK</sub>
                    </Link>
                </div>
                <div className="navbar-center">
                    <input type="text" placeholder="Search" className="search-bar" value={inputvalue} onChange={(e) => setinput(e.target.value)} />
                    <Link to='searchContainer'>
                        <button className="search-button"><i className="ri-search-line" onClick={() => searchinput(`https://yt-api.p.rapidapi.com/search?query=${inputvalue}`)}></i></button>
                    </Link>
                </div>
                <div className="navbar-right">
                    <button className="icon"><i className="ri-notification-3-line icons_nav"></i></button>
                    <button className="icon"><i className="ri-user-3-fill icons_nav "></i></button>
                </div>
            </header>
        </>
    )
}

export default header
