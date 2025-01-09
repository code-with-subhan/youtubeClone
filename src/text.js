https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&type=video&maxResults=1&key=AIzaSyDFArgonAdCzrFfukHysRoi0ZdrcVVOO3s

// let apiurl = await fetch(URL)
// let response = await apiurl.json()
// setloading(true)
// seturl(response.items)



// const videoIds = response.items.map((item) => item.id.videoId).join(",");
// const channelIds = response.items.map((item) => item.snippet.channelId).join(",");

// const videosResponse = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apikey}`
// );
// const videosData = await videosResponse.json();
// setviews(videosData.items)



const apikey = 'AIzaSyDFArgonAdCzrFfukHysRoi0ZdrcVVOO3s'
const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&type=video&maxResults=10&key=${apikey}`


// Date logic used before getting rapid api 
let date = 0
const today = new Date()
const data = new Date(props.data.publishedAt)
console.log(data.getDay(), today.getUTCDay())
if (data.getFullYear() == today.getUTCFullYear()) {
  if (today.getUTCMonth() - data.getMonth() !== 0) {
    date = `${today.getUTCMonth() - data.getMonth()} Month ago`
  } else {
    if (today.getUTCDay() - data.getDay() !== 0) {
      date = `${today.getUTCDay() - data.getDay()} days ago`
    } else {
      date = `${today.getUTCMinutes() - data.getMinutes()} minutes ago`
    }
  }
}
else {
  date = `${today.getFullYear() - data.getUTCFullYear()} Month ago`
}






















availableCountries
: 
(249) ['PS', 'AR', 'DM', 'NA', 'IQ', 'BL', 'FR', 'EC', 'GY', 'BS', 'IO', 'QA', 'BT', 'MY', 'SO', 'BB', 'MV', 'BN', 'JO', 'CG', 'YE', 'SK', 'CF', 'GF', 'HU', 'NO', 'AO', 'TW', 'PK', 'AI', 'HR', 'BV', 'DK', 'EH', 'IM', 'AT', 'AW', 'LV', 'LK', 'VU', 'NI', 'CN', 'TD', 'TK', 'FI', 'MX', 'KY', 'FK', 'KZ', 'HK', 'LB', 'JE', 'ML', 'NF', 'KN', 'LY', 'TC', 'TZ', 'GM', 'MS', 'PF', 'KM', 'BA', 'UA', 'SI', 'GA', 'KE', 'DZ', 'SY', 'KP', 'LA', 'IL', 'PM', 'KR', 'PH', 'MO', 'SM', 'AE', 'BR', 'SN', 'GR', 'HM', 'UM', 'EE', 'CD', 'GB', 'ZM', 'MG', 'BI', 'NG', 'GQ', 'OM', 'MR', 'BO', 'NL', 'BG', 'GH', 'NZ', 'WS', 'BJ', …]
avatar
: 
(3) [{…}, {…}, {…}]
banner
: 
(6) [{…}, {…}, {…}, {…}, {…}, {…}]
channelHandle
: 
"@cnnnews18"
channelId
: 
"UCef1-8eOpJgud7szVPlZQAQ"
country
: 
"India"
description
: 
""
hasEmail
: 
true
isFamilySafe
: 
true
isUnlisted
: 
false
joinedDate
: 
"2006-09-15"
joinedDateText
: 
"Joined Sep 15, 2006"
keywords
: 
(29) ['cnn news live', 'cnn news18 live', 'cnn news18', 'cnn ibn live', 'news18 live', 'live news', 'news18 live', 'english news', 'live news english', 'india news live', 'latest english news', 'breaking english news', 'english news today', 'news english', 'news18 english', 'news in english', 'world news', 'international news', 'cnn', 'global news', 'cnn live', 'news live', 'english news live', 'india news', 'elections', 'election result', 'lok sabha election result live', 'election india result', 'general elections result']
links
: 
(4) [{…}, {…}, {…}, {…}]
metaD
: 
"PHR"
msg
: 
""
subscriberCount
: 
8790000
subscriberCountText
: 
"8.79M"
tabs
: 
(8) ['Home', 'Videos', 'Shorts', 'Live', 'Podcasts', 'Playlists', 'Community', 'Search']
title
: 
"CNN-News18"
videosCount
: 
"201137"
videosCountText
: 
"201,137 videos"
viewCount
: 
"4477647328"
viewCountText
: 
"4,477,647,328 views"


 // Initial Call
    // useEffect(() => {
    //     async function callapi() {
    //         const url = 'https://yt-api.p.rapidapi.com/home';
    //         setProgress(10)
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'x-rapidapi-key': '11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e',
    //                 'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    //             }
    //         };

    //         setProgress(40)
    //         const response = await fetch(url, options);
    //         setProgress(80)
    //         const result = await response.json();
    //         setProgress(90)
    //         setloading(true)
    //         seturl(result)
    //         setProgress(100)
    //     }
    //     callapi()
    // }, [])