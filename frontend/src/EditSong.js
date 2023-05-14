import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';

const EditSong = () => {
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songRating, setSongRating] = useState('');
    const [favorite, setFavorite] = useState();
    const [category, setCategory] = useState('');

    const {id} = useParams();    
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/Songs/edit/" + id)
        .then(res => {
            if(!res.ok){
                console.log('Could not fetch the data for that resourse');
            } else {
                return res.json();
            }
        })
        .then(data => {
            setSongName(data.songName);
            setArtistName(data.artistName);
            setSongUrl(data.songUrl);
            setSongRating(data.songRating);
        })
        .catch((err) => {
                console.log(err.message);
        })
    }, []);

    const editSong = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/Songs/edit/' + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                SongName: songName,
                ArtistName: artistName,
                SongUrl: songUrl,
                SongRating: songRating,
                Favorite: favorite,
                categoryName: category
            })
        }).then(() => {
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return ( 
        <div className="addSong">
        <h2>Edit song!</h2>
        <form onSubmit={editSong}>
            <label>Song name: </label>
            <input type="text" required value={ songName || "" } onChange={(e) => setSongName(e.target.value)}></input>
            <br/>
            <label>Artist name: </label>
            <input type="text" required value={ artistName || "" } onChange={(e) => setArtistName(e.target.value)}></input>
            <br/>
            <label className="url">Song url: </label>
            <input type="text" required value={ songUrl || "" } onChange={(e) => setSongUrl(e.target.value)}></input>
            <br/>
            <div className="ratee">
            <label className="lrate">Song rating (1 - 5): </label>
            <input type="range" min="1" max="5" className="rate" required value={ songRating || "" } onChange={(e) => setSongRating(e.target.value)}/>
            <label className="number"> { songRating } </label></div>
            <br/>
            <button className="submit">Save</button>
        </form>
    </div>
     );
}
 
export default EditSong;