import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  return (
    <header>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      <div className="container">
      <div className="navLogoInRow">
        <Link to="/">
          <img className="LogoImgNav"src="https://i.pinimg.com/736x/98/89/c2/9889c2185d19262372d2fd32f8559795.jpg" alt="logo" />
        </Link>
        <h3 className="jensEnCoNaam">Jens & Co</h3>
        </div>
        <div className="HeaderLinkToUpload">
          <Link to='/Upload' style={{ textDecoration: 'none' }}>
          <div className="UploadHomeButton">
            <p  className="uploadButtonTextNav" >Add An Image</p>
          </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
