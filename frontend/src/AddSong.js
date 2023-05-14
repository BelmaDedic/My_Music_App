import { useState } from "react";
import {  useNavigate } from 'react-router-dom';

const AddSong = () => {
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songRating, setSongRating] = useState('3');
    const [favorite, setFavorite] = useState(false);
    const [category, setCategory] = useState('Other');

    const navigate = useNavigate();

    const addSong = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/Songs/new', {
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
    }

    return ( 
        <div className="addSong">
            <h2>Add a new song!</h2>
            <form onSubmit={addSong}>
                <label>Song name: </label>
                <input type="text" required value={ songName } onChange={(e) => setSongName(e.target.value)}></input>
                <br/>
                <label>Artist name: </label>
                <input type="text" required value={ artistName } onChange={(e) => setArtistName(e.target.value)}></input>
                <br/>
                <label className="url">Song url: </label>
                <input type="text" required value={ songUrl } onChange={(e) => setSongUrl(e.target.value)}></input>
                <br/>
                <div className="ratee">
                <label className="lrate">Song rating (1 - 5): </label>
                <input type="range" min="1" max="5" className="rate" required value={songRating} onChange={(e) => setSongRating(e.target.value)}/>
                <label className="number"> { songRating } </label></div>
                <br/>
                <button className="submit">Add Song</button>

            </form>
        </div>
     );
}
 
export default AddSong;
