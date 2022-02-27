import React, { useEffect, useState, useContext } from "react";
import HeaderNetflix from "../../components/header/HeaderNetflix";
import Slider from "react-slick";
import { UserContext } from "../../context/Context";
import Link from "next/link";

function List() {
  const [listFavorites, setListFavorites] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const useCtx = useContext(UserContext);

  const handleDeletefavorite = (filmId) => {
    if (!useCtx.userId) {
      return;
    }

    fetch(`${process.env.API_URL}api/v1/users/delete-favorite-film`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // authorization: `${token}`,
      },
      body: JSON.stringify({
        id: useCtx.userId,
        idFilm: filmId,
      }),
    })
      .then(() => {
        handlefetchfavorite();
      })
      .catch((e) => console.log(e.message));
  };

  const handlefetchfavorite = () => {
    fetch(`${process.env.API_URL}api/v1/users/get-favorite-film`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // authorization: `${token}`,
      },
      body: JSON.stringify({ id: useCtx.userId }),
    })
      .then(async (res) => {
        const recep = await res.json();
        console.log(recep.favorites, "hola");
        setListFavorites(recep.favorites);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    handlefetchfavorite();
  }, []);

  if (listFavorites === undefined) {
    return (
      <div className="main-home">
        {" "}
        <HeaderNetflix />
        <main className="main--homepage-net list">
          problème <Link href="/">retour au menu</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="main-home">
      <HeaderNetflix />
      <main className="main--homepage-net list">
        <div className="slick-contains">
          <h2>Mes favoris</h2>
          <Slider {...settings}>
            {listFavorites.map((el) => {
              return (
                <div key={el._id} className="slick-els">
                  <h3>{el.name}</h3>
                  <img src={el.image} className="movie-pic" />
                  <div className="like-watch--contains">
                    <div
                      className="back-cta-netflix"
                      onClick={() => handleDeletefavorite(el._id)}
                    >
                      <img
                        src="https://www.svgrepo.com/show/106039/delete.svg"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </main>
    </div>
  );
}

export default List;
