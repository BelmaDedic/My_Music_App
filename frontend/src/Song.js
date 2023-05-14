import { useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';

const url = "http://localhost:3000";

const Song = () => {
    const [songs, setSongs] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(url + "/Songs")
        .then(res => {
            if(!res.ok){
                console.log('Could not fetch the data for that resourse');
            } else {
                return res.json();
            }
        })
        .then(data => {
            setSongs(data);
        })
        .catch((err) => {
                console.log(err.message);
        })
    }, []);

    const deleteSong = (id) => {
        fetch(url + "/Songs/delete/" + id, {
            method: "DELETE"})
        .then(() => {
            console.log("Deleted!")
            navigate('/');
        })
    }

    const updateSong = (id) => {
        navigate(`/Songs/edit/${id}`);
    }

    const favorite = async (id) => {
        const data = await fetch(url + "/Songs/favorite/" + id)
        .then(res => res.json());
    
        setSongs( songs => songs.map(song => {
            if(song._id === data._id){
              song.favorite = data.favorite;
            }
            return song;
        }));
        navigate('/');
      }
    

    return ( 
        <div className="songs">
            {songs && songs.map((song) => (
                <div className="song" key = {song.id}>
                    <div className="image">
                        <p></p>
                    </div>
                    <div className="music">
                        <p>{ song.artistName } - { song.songName }</p>
                    </div>
                    <div className="rating">
                        { song.songRating }<p>&#9734;</p>
                    </div>
                    <div className="details">
                        <div className="linkUrl">
                            <a href={ song.songUrl } > &#9835;</a>  
                        </div>
                        <div className={ song.favorite ? "favorite" : "notFavorite"} >
                            <p onClick={() => favorite(song._id)}>&#9825;</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="data">
                        <div className="delete">
                        <p onClick={() => deleteSong(song._id)}>&#128465;</p>
                        </div>
                        <div className="update">
                        <p onClick={() => updateSong(song._id)}>&#9998;</p>
                        </div>
                    </div>
                </div>   
            ))}
        </div>
     );
}
 
export default Song;