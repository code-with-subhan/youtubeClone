import React from 'react'

function CustomHooks(data) {
    let view = ''
    const viewCount = data + ""
    if (viewCount >= 1000 && viewCount <= 10000) {
        view = `${viewCount.slice(0, 1)}k`
    } else if (viewCount > 10000 && viewCount <= 1000000) {
        view = `${viewCount.slice(0, 2)}k`
    } else if (viewCount >= 1000000 && viewCount <= 10000000) {
        view = `${viewCount.slice(0, 3)}k`
    } else if (viewCount >= 10000000) {
        view = `${viewCount.slice(0, 1)}M`
    } else if (viewCount < 1000) {
        view = viewCount
    }else if(viewCount == ""){
        view = '1M'
    }
    return [view]
}


export default CustomHooks
