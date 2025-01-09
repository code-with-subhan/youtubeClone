import React, { useContext } from 'react'
import { Theme } from './ThemeContext'
import SpecificVideo from './SpecificVideo'
import LoadingBar from 'react-top-loading-bar'


function mainContent() {
  const { loading, actualurl } = useContext(Theme)  

  let mapping = !loading ? "loading.." : Array.isArray(actualurl.data) && actualurl.data.length > 0 && actualurl.data.map((data) => {
    if (data.type === "video") {

      return (

        <main key={data.videoId}>
          <SpecificVideo data={data} />
        </main>
      )

    }
  })
  return (
    <main className="content" >
      <div className="video-grid" >
        {mapping}
      </div>
    </main>
  )
}

export default mainContent
