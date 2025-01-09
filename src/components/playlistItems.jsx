import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Theme } from './ThemeContext'
import CustomHooks from './CustomHooks'


function playlist(props) {
    const { like, watchitem } = props
    const { videoStart } = useContext(Theme)
    const arr = [like, watchitem]
    const mapping = arr.map((e, index) => {
        if (arr.length !== 0 && arr[index].length !== 0) {
            return (
                <Link to={`/${e[index]?.id}`} key={index}>
                    <div className="playlistItems" key={index} onClick={() => videoStart(e[0], e)}>
                        <div className="playlistimage">
                            <img src={e[0]?.thumbnail[2]?.url} alt="..." />
                            <img src={e[1] ? e[1]?.thumbnail[0]?.url : e[0]?.thumbnail[0]?.url} alt="..." className='secondplaylist' />
                            <img src={e[2] ? e[2]?.thumbnail[0]?.url : e[1]?.thumbnail[0].url ? e[1]?.thumbnail[0]?.url : e[0]?.thumbnail[0]?.url} alt="..." className='thirdplaylist' />
                            <div className="videoslength"><i className="ri-menu-add-fill"></i> 12 Videos</div>
                        </div>
                        <div className="playlistcontent">
                            <h6>{index == 1 ? "Watch Later" : "Liked Videos"}</h6>
                            <p>Private . Playlist</p>
                            <p>Updated Today</p>
                            <p>view full playlist</p>
                        </div>
                    </div>
                </Link>
            )
        }
    })
    return (
        <>
            <div className="playlistContainer">
                {like.length !== 0 || watchitem.length !== 0 ?
                    <>
                        <h1>Playlists</h1>
                        <button className='playlistbtn'>Recently Uploaded</button>
                        <div className="playlistBox">
                            {mapping}
                        </div>
                    </>
                    :
                    <h2 style={{ textAlign: "center", margin: "300px 160px", fontSize: "1rem", fontWeight: "bold", color: "red", width: "50vw" }}>Video is not available</h2>
                }
            </div>
        </>
    )
}

export default playlist
