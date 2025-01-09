import React, { useContext, useEffect } from 'react'
import { Theme } from './ThemeContext'
import SpecificVideo from './SpecificVideo'
import LoadingBar from 'react-top-loading-bar'
import { useRef } from 'react'
import home from '../Data/home'
import { Link } from 'react-router-dom'
import { div } from 'framer-motion/client'


function mainContent() {
  let arr = []
  const { loading, actualurl, searchinput, seturl, setShorts, mainref , mainref2,mainref3} = useContext(Theme)
  const homeref = useRef(null)
  const rightref = useRef(null)
  const leftref = useRef(null)
  const shortleftref = useRef(null)
  const shortrightref = useRef(null)
  const shortsref = useRef(null)

  let mapping = !loading ? "loading.." : Array.isArray(actualurl?.data) && actualurl?.data.length > 0 && actualurl?.data?.map((data, index) => {
    if (data.type === "video") {
      return (

        <main key={data.videoId}>
          {index < 9 && <SpecificVideo data={data} />}
        </main>
      )
    }
  })

  let mapping3 = !loading ? "" : Array.isArray(actualurl?.data) && actualurl?.data.length > 0 && actualurl?.data?.map((data, index) => {
    if (data.type === "shorts_listing") {
      return data.data.map((e) => {
        function a() {
          arr.push(e)
        }
        a()

        return (
          <main key={e.videoId}>
            <Link to="/Shorts" style={{ textDecoration: "none" }}>
              <div className="homeshorts" onClick={() => {
                data = arr?.filter((a) => {
                  return e.videoId !== a.videoId
                })
                data.unshift(e)
                let obj = { data }
                setShorts(obj)
              }}>
                <img src={e?.thumbnail[0]?.url} alt="" />
                <h5>{e?.title?.slice(0, 30)}</h5>
                <p>{e?.viewCountText}</p>
              </div>
            </Link>
          </main>
        )
      })
    }
  })

  let mapping2 = !loading ? '' : Array.isArray(actualurl?.data) && actualurl?.data.length > 0 && actualurl?.data?.map((data, index) => {
    if (data.type === "video") {
      return (
        <main key={data.videoId}>
          {index >= 9 && <SpecificVideo data={data} />}
        </main>
      )
    }
  })

  return (
    <main className="content" >
      {actualurl.filters &&

        <div ref={mainref} style={{ position: "relative", background: "", padding: " 5px 0 15px 240px", width: "90vw" }} >
          <button className='homebtn homeright' ref={leftref} disabled={homeref?.current?.scrollLeft == 0} onClick={(e) => {
            homeref.current.scrollLeft += homeref.current.clientWidth / 4

            rightref.current.style.display = "block"
            console.log(homeref.current.scrollLeft, homeref.current.scrollWidth)
          }} ><i className="ri-arrow-left-wide-line"></i></button>

          <div ref={mainref} className="homebuttons" style={{ display: "flex", gap: "10px", flexShrink: 0, overflow: "hidden", position: "relative" }} >
            {actualurl?.filters && actualurl?.filters?.map((e) => {
              return (
                <Link to='/' style={{ display: "flex", gap: "10px", flexShrink: 0, overflow: "hidden", position: "relative", textDecoration: "none" }} key={e.videoId}>
                  <button onClick={(e) => {
                    if (e.target.textContent == 'All') {
                      seturl(home)
                    } else {
                      searchinput(`https://yt-api.p.rapidapi.com/search?query=${e.target.textContent}`, "search")
                    }
                  }} className='btn btn-light' style={{ fontSize: ".8rem", fontWeight: "bold", flexShrink: 0, background: e.filter == "All" ? "black" : "", color: e.filter == "All" ? "white" : "" }}>{e.filter}</button>
                </Link>
              )
            })}
          </div>

          <button className='homebtn homeleft' ref={rightref} onClick={(e) => {
            try {
              homeref.current.scrollLeft -= homeref.current.clientWidth / 4
              rightref.current.style.display = homeref?.current?.scrollLeft * 2 == 0 ? "none" : "block"

            } catch { }

          }}><i className="ri-arrow-right-wide-line"></i></button>
        </div>
      }
      <div className=" video-flex" ref={mainref}>
        {mapping}
      </div>

      <div style={{ position: "relative", marginLeft: "240px" }} ref={mainref3}>
        <button className='shortsleft shortshomebtn' ref={shortleftref} onClick={(e) => {
          shortsref.current.scrollLeft -= shortsref.current.clientWidth
          shortleftref.current.style.display = shortsref?.current?.scrollLeft * 2 <= 0 ? "none" : "block"
        }}><i className="ri-arrow-left-wide-line"></i></button>

        <button className='shortsright shortshomebtn' ref={shortrightref} onClick={(e) => {
          try {
            shortsref.current.scrollLeft += shortsref.current.clientWidth
            shortleftref.current.style.display = "block"
          } catch { }

        }} ><i className="ri-arrow-right-wide-line"></i></button>
        <div className="homeshortscontainer" ref={shortsref}>
          {mapping3}
        </div>
      </div>

      <div className="video1-flex" ref={mainref2}>
        {mapping2}
      </div>
    </main>
  )
}

export default mainContent
