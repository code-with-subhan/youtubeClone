import React, { useState, useEffect , useContext} from 'react';
import ReactPlayer from 'react-player';
import shortSequence from '../Data/shortSequence';
import { useRef } from 'react';
import { Theme } from './ThemeContext';

const YouTubeShorts = () => {
    const {shorts} = useContext(Theme);
    const first = useRef(null)
    console.log(shorts)
    window.scrollTo({ top: 0, behavior: "smooth" })

    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    let a = 0
    let b = 594
    let c
    return (
        <div style={{ display: "flex", gap: "20px", flexDirection: "column", alignItems: "center", width: "98vw", margin: "60px auto 0", position: "relative" }} ref={first}>
            {shorts.data.map((short, index) => (
                <div key={short.videoId} style={{ borderRadius: "40px", }} >
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${short.videoId}`}
                        controls={true}
                        width="330px"
                        height="88vh"
                        style={{ marginTop: "10px", borderRadius: "20px", overflow: "hidden" }}
                    />
                    {/* <div className="shortscontent">
                        <div className="shortsChannelInfo">
                            <img src="" alt="" />
                            <span>
                                
                            </span>
                            <button className='btn btn-light'>Subscribe</button>
                        </div>
                        <p>{shorts?.title}</p>
                    </div> */}
                </div>
            ))}
            <button className='shortPrev btn btn-dark' onClick={() => {
                if (a !== 0) {
                    c = c - 594
                    a--
                    window.scrollTo({ top: c, behavior: "smooth" })
                }
            }}>Prev</button>
            <button className='shortnext btn btn-dark' onClick={() => {
                a++
                c = a * b
                window.scrollTo({ top: c, behavior: "smooth" })
            }}>Next</button>
        </div>
    );
};

export default YouTubeShorts;

