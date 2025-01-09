import React from 'react'
import { createContext } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Theme = createContext()

function ThemeContext(props) {
    // States
    const [actualurl, seturl] = useState([])
    const [loading, setloading] = useState(false)
    const [inputvalue, setinput] = useState('')
    const [video, setvideo] = useState('')
    const [videoDetail, setvideoDetail] = useState([])
    const [otherDetail, setotherDetail] = useState('')
    const [loadingProgress, setProgress] = useState(10)
    const [relatedVideos, setRelated] = useState([])
    const [history, sethistory] = useState(JSON.parse(localStorage.getItem("history")) || [])
    const [historyItems, sethistoryItems] = useState([])
    // Ref
    const sideref = useRef(null)

    // sidebar
    function showsidebar() {
        if (sideref.current.style.transform === 'translateX(0px)') {
            sideref.current.style.transform = 'translateX(-230px)';
        } else {
            sideref.current.style.transform = 'translateX(0px)';
        }
    }

    // callhistory
    function customhistory(otherDetail) {
        const history = JSON.parse(localStorage.getItem('history')) || []
        history.push(otherDetail.videoId)
        let set = new Set(history.map(e => e === "undefined" ? "" : e))
        let returnset = Array.from(set)
        if (otherDetail.videoId) {
            localStorage.setItem("history", JSON.stringify(returnset))
            sethistory(returnset)
        }
    }

    function callhistory() {
        history.forEach((element) => {
            searchinput(`https://yt-api.p.rapidapi.com/video/info?id=${element}`)
        });

    }

    // start specific video on click
    async function videoStart(data) {
        console.log(data)
        setProgress(10)
        setvideo(`https://www.youtube.com/watch?v=${data.videoId}`)
        const url = `https://yt-api.p.rapidapi.com/video/info?id=${data.videoId}`;
        const url2 = `https://yt-api.p.rapidapi.com/related?id=${data.videoId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        setProgress(30)
        const response = await fetch(url, options);
        setProgress(40)
        const result = await response.json();
        setProgress(60)
        const response2 = await fetch(url2, options);
        setProgress(80)
        const result2 = await response2.json();
        setProgress(100)
        setvideoDetail(result)
        setotherDetail(data)
        setRelated(result2.data)
    }

    // Initial Call
    useEffect(() => {
        async function callapi() {
            const url = 'https://yt-api.p.rapidapi.com/home';
            setProgress(10)
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e',
                    'x-rapidapi-host': 'yt-api.p.rapidapi.com'
                }
            };

            setProgress(40)
            const response = await fetch(url, options);
            setProgress(80)
            const result = await response.json();
            setProgress(90)
            setloading(true)
            seturl(result)
            setProgress(100)
        }

        callapi()
    }, [])

    // searchinput 
    async function searchinput(Url) {
        setloading(false)
        const url = `${Url}`
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        setloading(true)
        if (Array.isArray(result.data)) {
            seturl(result)
        } else {
            sethistoryItems(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
    }


    return (
        <Theme.Provider value={{
            sideref,
            showsidebar,
            actualurl,
            loading,
            videoStart,
            video,
            videoDetail,
            setinput,
            inputvalue,
            searchinput,
            setProgress,
            loadingProgress,
            otherDetail,
            relatedVideos,
            callhistory,
            customhistory,
            historyItems
        }}>
            {props.children}
        </Theme.Provider>
    )
}

export { ThemeContext, Theme }
