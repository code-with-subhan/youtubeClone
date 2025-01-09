import React from 'react'
import { createContext } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import home from '../Data/home'
import trending from '../Data/trending'
import shortSequence from '../Data/shortSequence';

// c37b4acad5mshe7164913084a05bp113677jsnd85f530bb48d
// 11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e
// 95d2d46c37msh03f7840754338ddp1b695fjsn11e63497e4c9
// 34d8446820mshd6edfc7dafc6d94p16719fjsn7d865e7a25d5
// 40cdcfcc38mshf9a557af5320615p129eabjsn0b580a40e78c
// 6dc0b07882msh7333ddb09f376a3p1a3821jsna746fc5b647f
// 0adf4f3a32mshba50192161c13b9p15fff1jsn231e4260c6ce

const Theme = createContext()

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '0adf4f3a32mshba50192161c13b9p15fff1jsn231e4260c6ce',
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
};

function ThemeContext(props) {
    // States
    const [actualurl, seturl] = useState(home)
    const [loading, setloading] = useState(true)
    const [inputvalue, setinput] = useState('')
    const [video, setvideo] = useState('')
    const [videoDetail, setvideoDetail] = useState([])
    const [otherDetail, setotherDetail] = useState('')
    const [loadingProgress, setProgress] = useState(10)
    const [relatedVideos, setRelated] = useState([])
    const [history, sethistory] = useState(JSON.parse(localStorage.getItem("history")) || [])
    const [historyItems, sethistoryItems] = useState([])
    const [comments, setcomments] = useState('')
    const [subcriber, setSubcriber] = useState(JSON.parse(localStorage.getItem("subscriber")) || [])
    const [subscriberItem, setSubcriberItem] = useState([])
    const [likes, setlikes] = useState(JSON.parse(localStorage.getItem("likes")) || [])
    const [likesitem, setlikesitem] = useState([])
    const [watch, setwatch] = useState(JSON.parse(localStorage.getItem("watch")) || [])
    const [watchitem, setwatchitem] = useState([])
    const [playlistvideos, setplaylistvideos] = useState("")
    const [Channelsetting, setchannelsetting] = useState({})
    const [shorts, setShorts] = useState(shortSequence);
    // console.log(shorts)
    // Ref
    const sideref = useRef(null)
    const historyref = useRef(null)
    const likeref = useRef(null)
    const watchref = useRef(null)
    const subscriberref = useRef(null)
    // sidebar
    function showsidebar() {
        if (sideref.current.style.transform === 'translateX(0px)') {
            sideref.current.style.transform = 'translateX(-260px)';
        } else {
            sideref.current.style.transform = 'translateX(0px)';
        }
    }

    // callhistory
    function customhistory(otherDetail) {
        const history = JSON.parse(localStorage.getItem('history')) || []
        history.push(otherDetail?.videoId)
        let set = new Set(history.map(e => e === "undefined" ? "" : e))
        let returnset = Array.from(set)
        if (otherDetail?.videoId) {
            localStorage.setItem("history", JSON.stringify(returnset))
            sethistory(returnset)
        }

    }


    // start specific video on click
    async function videoStart(data, otherdata) {
        sideref.current.style.transform = 'translateX(-260px)';
        setplaylistvideos([])
        setProgress(10)
        // setvideo(`https://www.youtube.com/watch?v=${data?.videoId}`)
        const url = `https://yt-api.p.rapidapi.com/video/info?id=${data?.videoId ? data?.videoId : data?.id}`;
        const url2 = `https://yt-api.p.rapidapi.com/related?id=${data?.videoId ? data.videoId : data?.id}`;
        const url3 = `https://yt-api.p.rapidapi.com/comments?id=${data?.videoId ? data.videoId : data?.id}`;
        try {
            otherdata.forEach((element) => {
                searchinput(`https://yt-api.p.rapidapi.com/video/info?id=${element?.id ? element?.id : element?.videoId}`, "playlist")
            })
        } catch { }
        setProgress(30)
        const response = await fetch(url, options);
        setProgress(40)
        const result = await response.json();
        setProgress(60)
        const response2 = await fetch(url2, options);
        setProgress(80)
        const result2 = await response2.json();
        const response3 = await fetch(url3, options);
        setProgress(80)
        const result3 = await response3.json();
        setProgress(100)
        setvideoDetail(result)
        setotherDetail(data)
        setRelated(result2.data)
        setcomments(result3)
        setvideo(data?.channelThumbnail && data?.channelThumbnail.length > 0 && data?.channelThumbnail[0] && data?.channelThumbnail[0]?.url)
    }




    function callsubscriber() {
        setSubcriberItem([])
        subcriber.forEach((element) => {
            console.log(element)
            searchinput(`https://yt-api.p.rapidapi.com/channel/about?id=${element}`, "subscriber")
        });
        try { subscriberref.current.innerHTML = '' } catch { }
    }
    function callhistory() {
        sethistoryItems([])
        history.forEach((element) => {
            searchinput(`https://yt-api.p.rapidapi.com/video/info?id=${element}`, "history")
        });
        try { historyref.current.innerHTML = '' } catch { }
    }
    function calllike() {
        setlikesitem([])
        likes.forEach((element) => {
            searchinput(`https://yt-api.p.rapidapi.com/video/info?id=${element}`, "likes")
        });
        try { likeref.current.innerHTML = '' } catch { }
    }
    function callwatch() {
        setwatchitem([])
        watch.forEach((element) => {
            searchinput(`https://yt-api.p.rapidapi.com/video/info?id=${element}`, "watch")
        });
        try { watchref.current.innerHTML = '' } catch { }
    }

    // searchinput 
    async function searchinput(Url, name) {
        console.log(Url)
        console.log(name)
        setloading(false)
        const url = `${Url}`
        const response = await fetch(url, options);
        const result = await response.json();
        setloading(true)
        if (name == "search") {
            seturl(result)
        }
        else if (name == "history") {
            sethistoryItems(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
        else if (name == "subscriber") {
            setSubcriberItem(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
        else if (name == "likes") {
            setlikesitem(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
        else if (name == "watch") {
            setwatchitem(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
        else if (name == "playlist") {
            setplaylistvideos(prev => {
                let arr = [...prev, result]
                return arr
            })
        }
    }

    function setDifferentSection(name) {
        if (name === "home") {
            seturl(home)
        }
        else if (name === "trending") {
            seturl(trending)
        }
    }



    function SubscriberAdd(data, e) {
        const subcriber = JSON.parse(localStorage.getItem('subscriber')) || []
        subcriber.push(data.channelId)
        console.log(data)
        let set = new Set(subcriber.map(e => e === "undefined" ? "" : e))
        let returnset = Array.from(set)
        if (data.channelId) {
            localStorage.setItem("subscriber", JSON.stringify(returnset))
            setSubcriber(returnset)
        }
    }

    function likesAdd(data, e) {
        e.preventDefault()
        const likes = JSON.parse(localStorage.getItem('likes')) || []
        likes.push(data.videoId)
        let set = new Set(likes.map(e => e === "undefined" ? "" : e))
        let returnset = Array.from(set)
        if (data.videoId) {
            localStorage.setItem("likes", JSON.stringify(returnset))
            setlikes(returnset)
        }
    }
    function watchAdd(data, e) {
        e.preventDefault()
        const watch = JSON.parse(localStorage.getItem('watch')) || []
        watch.push(data.videoId)
        let set = new Set(watch.map(e => e === "undefined" ? "" : e))
        let returnset = Array.from(set)
        if (data.videoId) {
            localStorage.setItem("watch", JSON.stringify(returnset))
            setwatch(returnset)
        }
    }


    async function addChannel(id) {
        const url = `https://yt-api.p.rapidapi.com/channel/home?id=${id}`;
        const response = await fetch(url, options);
        const result = await response.json();
        setchannelsetting(prev => {
            return { ...prev, channels: result, channelitems: [], channelcontent: result, channelShorts: [], channelplaylist: [] }
        })
    }


    async function selectchannelButton(e, id) {
        if (e.target.textContent === "Videos") {
            const url = `https://yt-api.p.rapidapi.com/channel/videos?id=${id}`;
            const response = await fetch(url, options);
            const result = await response.json();
            setchannelsetting(prev => {
                return { ...prev, channelitems: result, channels: [], channelShorts: [], channelplaylist: [] }
            })
        }
        else if (e.target.textContent === "Home") {
            addChannel(id)
        }
        else if (e.target.textContent === "Playlists") {
            const url = `https://yt-api.p.rapidapi.com/channel/playlists?id=${id}`;
            const response = await fetch(url, options);
            const result = await response.json();
            result.data.forEach(async (a) => {
                const url1 = `https://yt-api.p.rapidapi.com/playlist?id=${a?.playlistId}`;
                const response1 = await fetch(url1, options);
                const result1 = await response1.json();
                setchannelsetting(prev => {
                    return { ...prev, channelitems: [], channels: [], channelShorts: [], channelplaylist: [...prev?.channelplaylist, result1] }
                })
            })

        }
        else if (e.target.textContent === "Shorts") {
            console.log(e.target.textContent)
            console.log(id)
            const url = `https://yt-api.p.rapidapi.com/channel/shorts?id=${id}`;
            const response = await fetch(url, options);
            const result2 = await response.json();
            setchannelsetting(prev => {
                return { ...prev, channelitems: [], channels: [], channelplaylist: [], channelShorts: result2 }
            })

        }
    }

    function removeHistory(id, name, arr, ref, setstate, setItem, url) {
        setItem([])
        const a = arr.filter((e) => {
            if (e !== id) {
                return e
            }
        })
        localStorage.setItem(name, JSON.stringify(a))
        setstate(a)
        ref.current.innerHTML = ''
        a.forEach((element) => {
            searchinput(`${url}${element}`, name)
        });
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
            customhistory,
            callhistory,
            history,
            historyref,
            historyItems,
            sethistory,
            sethistoryItems,
            setDifferentSection,
            comments,
            SubscriberAdd,
            subscriberref,
            setSubcriber,
            setSubcriberItem,
            callsubscriber,
            subcriber,
            subscriberItem,
            likesAdd,
            likesitem,
            setlikesitem,
            likeref,
            setlikes,
            likes,
            calllike,
            watch,
            watchAdd,
            setwatch,
            watchitem,
            setwatchitem,
            watchref,
            callwatch,
            playlistvideos,
            addChannel,
            selectchannelButton,
            Channelsetting,
            removeHistory,
            shorts,
            setShorts
        }}>
            {props.children}
        </Theme.Provider>
    )
}

export { ThemeContext, Theme }
