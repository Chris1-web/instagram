import "./Loader.css";
import instagramLoaderIcon from "../../Image/instagram-loader.png";

function Loader() {
  return (
    <div className="loading-screen">
      <img src={instagramLoaderIcon} alt="loading icon" />
      <footer>
        <span>from </span>
        <a
          target="_blank"
          href="https://github.com/Chris1-web/instagram"
          rel="noreferrer"
        >
          Christianah
        </a>
      </footer>
    </div>
  );
}

export default Loader;
