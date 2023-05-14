const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

//connecting to database
mongoose.connect('mongodb+srv://belma:svadba1712@cluster0.ltbpe.mongodb.net/MusicApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to DB");
})
.catch(console.error);

//importing data from models
const Songs     = require('./models/Songs');
const Category  = require('./models/Category');
const User      = require('./models/User');


// Login

app.get('/user', async (req,res) => {
    const user =  await User.find();
    
    res.json(user);
})

app.post('/user', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            const user = new User ({
                username: req.body.username,
                password: hashedPassword
            })
            console.log("dasoikfdaofk");
            user.save();
            res.json(user);

    } catch {
        res.status(500).send();
    }
})

// about songs

app.get('/Songs', async(req,res) => {
    const songs = await Songs.find();
    res.json(songs);
});

app.get('/Category', async (req,res) => {
    const category = await Category.find();
    res.json(category);
})

app.post("/Songs/new", async (req,res) => {

        const catName = req.body.categoryName;
        const CatID = await Category.find({categoryName : catName});
        console.log(CatID);
        const date = new Date()

    const Song = new Songs({
        songName: req.body.SongName,
        artistName: req.body.ArtistName,
        songUrl:  req.body.SongUrl,
        songRating: req.body.SongRating,
        favorite: req.body.Favorite,
        dateOfEntering: date.toISOString().split('T')[0],
        CategoryID: CatID[0]._id
    })

    Song.save();

    res.json(Song);
});

app.delete('/Songs/delete/:id', async (req,res) => {
    const result = await Songs.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/Songs/favorite/:id', async (req,res) => {
    const song = await Songs.findById(req.params.id);

    song.favorite = !song.favorite;

    song.save();

    res.json(song);
});

app.get('/Songs/Category/:id', async (req,res) => {
    const categ = await Category.findById(req.params.id);

    categ.save();
    res.json(categ);
})

app.get('/Songs/edit/:id', async (req, res) => {
    const editSong = await Songs.findById(req.params.id);

    editSong.save();
    res.json(editSong);
})

app.post('/Songs/edit/:id', async (req,res) => {
    const date = new Date();
    const catName = req.body.categoryName._id;

    const update = await Songs.findOneAndUpdate({"_id" : req.params.id}, 
    {"$set" : {
        "songName" : req.body.SongName,
        "artistName" : req.body.ArtistName,
        "songUrl" : req.body.SongUrl,
        "songRating" : req.body.SongRating,
        "favorite" : req.body.Favorite,
        "dateOfEditing" : date.toISOString().split('T')[0],
        "CategoryID": catName
}});

    update.save();
    res.json(update);

})

app.listen(3000, () => {
    console.log("Server started!");
})

