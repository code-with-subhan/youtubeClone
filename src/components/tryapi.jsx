import React, { useState } from "react";

const YouTubeSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        const url = 'https://yt-api.p.rapidapi.com/updated_metadata?id=Ii8O3K-54pA&maxResults=10&type=v';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '11d7d8e2b1msh3a078eb2303a1c8p198021jsn6a7cff9aa24e',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
       
    };

    return (
        <>
            <div style={{ padding: "20px" }}>
                <h1>YouTube Video Search</h1>
                <input
                    type="text"
                    placeholder="Enter search query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: "10px", width: "300px", marginRight: "10px" }}
                />
                <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
                    Search
                </button>
            </div>
        </>

    )
};

export default YouTubeSearch; 
