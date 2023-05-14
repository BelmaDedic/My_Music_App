import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Song from './Song';
import Navbar from './Navbar'
import AddSong from './AddSong';
import NotFound from './NotFound';
import EditSong from './EditSong';

function App() {
    return (
      <Router>
      <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Song />} />
            <Route path="Songs/new" element={ <AddSong />}/>
            <Route path="Songs/edit/:id" element={ < EditSong /> } />
            <Route path="*" element={ <NotFound />} />
          </Routes>
          
        </div>
      </Router>
    );
}

export default App;
