import "./Loader.css";
import instagramLoaderIcon from "../../image/instagram-loader.png";
import githubIcon from "../../image/github.png";

function Loader() {
  return (
    <div className="loading-screen">
      <img src={instagramLoaderIcon} alt="loading icon" />
      <footer>
        <span>Copyright &copy; 2022 Christianah</span>
        <a
          target="_blank"
          href="https://github.com/Chris1-web/instagram"
          rel="noreferrer"
        >
          <img className="github-icon" alt="github icon" src={githubIcon} />
        </a>
      </footer>
    </div>
  );
}

export default Loader;
