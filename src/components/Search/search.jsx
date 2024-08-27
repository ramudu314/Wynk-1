// Search.jsx
import React from 'react';
import { UserProvider,useUser } from '../UserProvider';
import axios from 'axios';

function Search() {
    const { searchSong, audioValue } = useUser(); // Use useUser hook to access user context

    const setSong = (item) => {
        audioValue({ item }); // Function to update current song
    };

    const handleClick = async (id) => {
        await axios.get(`https://academics.newtonschool.co/api/v1/music/song/${id}`).then((Response) => {
            console.log(Response)
            let currSong = Response.data.data
            setSong(currSong)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='search_container'>
            {searchSong.length > 0 ? (
                // Render search results if available
                <>
                    {searchSong.map((song, index) => (
                        <div className="song_container" key={index} onClick={() => handleClick(song._id)}>
                            <div className="song_img">
                                <img src={song.thumbnail} alt={song.title} />
                            </div>
                            <div className="song_tilte">
                                <p>{song.title}</p>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                // Display message when no search results
                <h1 style={{ color: 'white' }}>Search Result will be here</h1>
            )}
        </div>
    );
}

export default Search;
