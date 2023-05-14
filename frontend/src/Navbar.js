import {  Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="navbar">
           <Link to="/" className='logo'>
               <h2>Music App</h2>
            </Link>
            
            <div className="links">
                <Link to="/" className='link'>Home</Link>
                <Link to="/Songs/new" className='link'>Add song</Link>
            </div>
          </div>
     );
}
 
export default Navbar;
