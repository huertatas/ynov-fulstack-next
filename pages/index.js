import HeaderNetflix from "../components/header/HeaderNetflix";
import Slider from "react-slick";
import { useEffect, useState, useRef, useContext } from "react";
import CardNetflixElement from "../components/cardNetflix/CardNetflixElement";
import Image from "next/image";
import { UserContext } from "../context/Context";

export default function Home() {
  const [filmStandardArr, setFilmStandardArr] = useState([]);
  const [filmPreniumArr, setFilmPreniumArr] = useState([]);
  const [modalYoutube, setModalYoutube] = useState(false);
  const [idYoutube, setIdYoutube] = useState("");

  const useCtx = useContext(UserContext);

  const SlideStandard = useRef(null);
  const SlidePrenium = useRef(null);

  let settingsStandart;
  let settingsPrenium;

  if (filmStandardArr.length > 1) {
    settingsStandart = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: false,
      arrows: false,
      adaptiveHeight: true,
    };
  } else {
    settingsStandart = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
      adaptiveHeight: true,
    };
  }

  if (filmPreniumArr.length > 1) {
    settingsPrenium = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: false,
      arrows: false,
      adaptiveHeight: true,
    };
  } else {
    settingsPrenium = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
      adaptiveHeight: true,
    };
  }

  const handleFetchStandardFilm = () => {
    fetch(`${process.env.API_URL}api/v1/film/standard`, {
      method: "GET",
    }).then(async (res) => {
      const recep = await res.json();
      setFilmStandardArr(recep);
    });
  };

  const handleFetchPreniumFilm = () => {
    fetch(`${process.env.API_URL}api/v1/film/prenium`, {
      method: "GET",
    }).then(async (res) => {
      const recep = await res.json();
      setFilmPreniumArr(recep);
    });
  };

  const gotoNextStandart = () => {
    SlideStandard.current.slickNext();
  };

  const gotoPrevStandart = () => {
    SlideStandard.current.slickPrev();
  };

  const gotoNextPrenium = () => {
    SlidePrenium.current.slickNext();
  };

  const gotoPrevPrenium = () => {
    SlidePrenium.current.slickPrev();
  };

  const handleSetVideoYoutube = (id) => {
    setModalYoutube(true);
    setIdYoutube(id);
  };

  const handleCloseVideoYoutube = () => {
    setModalYoutube(false);
  };

  const handleFetchCategoryPrenium = (value) => {
    fetch(`${process.env.API_URL}api/v1/film/category-prenium`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // authorization: `${token}`,
      },
      body: JSON.stringify({ category: value }),
    }).then(async (res) => {
      const recep = await res.json();
      setFilmPreniumArr(recep);
    });
  };

  const handleFetchCategoryStandard = (value) => {
    fetch(`${process.env.API_URL}api/v1/film/category-standard`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // authorization: `${token}`,
      },
      body: JSON.stringify({ category: value }),
    }).then(async (res) => {
      const recep = await res.json();
      setFilmStandardArr(recep);
    });
  };

  const handleAddToFavorite = (idFilm) => {
    fetch(`${process.env.API_URL}api/v1/users/push-favorite-film`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // authorization: `${token}`,
      },
      body: JSON.stringify({
        id: useCtx.userId,
        idFilm: idFilm,
      }),
    }).then(async (res) => {
      const recep = await res.json();
      console.log(recep);
    });
  };

  useEffect(() => {
    handleFetchStandardFilm();
    handleFetchPreniumFilm();
  }, []);

  return (
    <div className="main-home">
      {modalYoutube && (
        <div className="modal-youtube">
          <img
            src="https://www.svgrepo.com/show/40746/close.svg"
            width={100}
            height={100}
            className="close-modal"
            onClick={handleCloseVideoYoutube}
          />
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${idYoutube}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      )}
      <HeaderNetflix />
      <main className="main--homepage-net">
        <img
          className="img-bck-title"
          src="https://occ-0-1723-1722.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABfrFxgUvvSq9ekKsNqDfU4OoWkRGUxnWMXC-dCX-8tyWVdAKfTH0UsR6GjryJi-1SNkCRMwmU6tGufNHKcWdMGRfLwROJfChbj1fnU3EM0XgkJeGbHzPJ1yikMt-pKcAweaJTjGJY6c6zAyUuCcDGmfM6rgROwyhZGozdc3SzigO1Q.png?r=5e8"
        />
        <button
          onClick={() => handleSetVideoYoutube("ZOl7iOrD31Q")}
          className="button-home"
        >
          Regarder
        </button>
      </main>
      <div className="container-slide-films">
        <div className="arrow-left--slide" onClick={() => gotoPrevStandart()}>
          <Image src="/arrow-left-netflix.svg" width={50} height={50} />
        </div>
        <div className="slick-contains">
          <h2>
            {" "}
            Single Item{" "}
            <select
              onChange={(e) => {
                handleFetchCategoryStandard(e.currentTarget.value);
              }}
              id="category-standard"
            >
              <option value="rien">--Catégories--</option>
              <option value="scary">Scary</option>
            </select>
          </h2>
          <Slider {...settingsStandart} ref={SlideStandard}>
            {filmStandardArr.map((el) => {
              return (
                <CardNetflixElement
                  filmInfo={el}
                  handleSetVideoYoutube={handleSetVideoYoutube}
                  handleAddToFavorite={handleAddToFavorite}
                />
              );
            })}
          </Slider>
        </div>
        <div className="arrow-right--slide" onClick={() => gotoNextStandart()}>
          <Image src="/arrow-right-netflix.svg" width={50} height={50} />
        </div>
      </div>
      {/* prenium */}
      <div className="container-slide-films">
        <div className="arrow-left--slide" onClick={() => gotoPrevPrenium()}>
          <Image src="/arrow-left-netflix.svg" width={50} height={50} />
        </div>
        <div className="slick-contains">
          <h2>
            {" "}
            Single Item{" "}
            <select
              onChange={(e) => {
                handleFetchCategoryPrenium(e.currentTarget.value);
              }}
              id="category-prenium"
            >
              <option value="rien">--Catégories--</option>
              <option value="scary">Scary</option>
            </select>
          </h2>
          <Slider {...settingsPrenium} ref={SlidePrenium}>
            {filmPreniumArr.map((el) => {
              return (
                <CardNetflixElement
                  filmInfo={el}
                  handleSetVideoYoutube={handleSetVideoYoutube}
                  handleAddToFavorite={handleAddToFavorite}
                />
              );
            })}
          </Slider>
        </div>
        <div className="arrow-right--slide" onClick={() => gotoNextPrenium()}>
          <Image src="/arrow-right-netflix.svg" width={50} height={50} />
        </div>
      </div>
    </div>
  );
}
