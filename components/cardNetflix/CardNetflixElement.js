import { useState } from "react";
import Image from "next/image";

function CardNetflixElement({
  filmInfo,
  handleSetVideoYoutube,
  handleAddToFavorite,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={!hover ? "slick-els" : "slick-els hovering-vid"}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{filmInfo.name}</h3>
      <img src={filmInfo.image} className="movie-pic" />
      {hover && (
        <div className="like-watch--contains">
          <div
            className="back-cta-netflix"
            onClick={() => handleSetVideoYoutube(filmInfo.video)}
          >
            <Image src="/play-svg-netflix.svg" width={25} height={25} />
          </div>
          <div
            className="back-cta-netflix"
            onClick={() => handleAddToFavorite(filmInfo._id)}
          >
            <Image src="/like-svg-netflix.svg" width={25} height={25} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNetflixElement;
