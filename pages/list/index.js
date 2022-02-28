import React, { useEffect, useState, useContext } from "react";
import HeaderNetflix from "../../components/header/HeaderNetflix";
import { UserContext } from "../../context/Context";
import Link from "next/link";
import toast from "react-hot-toast";

function List() {
  const [listFavorites, setListFavorites] = useState([]);

  const useCtx = useContext(UserContext);

  const handleDeletefavorite = (filmId) => {
    if (!useCtx.userId) {
      return;
    }

    const token = useCtx.userToken;

    fetch(`${process.env.API_URL}api/v1/users/delete-favorite-film`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        id: useCtx.userId,
        idFilm: filmId,
      }),
    })
      .then(() => {
        toast.success("film retiré de votre liste");
        handlefetchfavorite();
      })
      .catch((e) => console.log(e.message));
  };

  const handlefetchfavorite = () => {
    if (!useCtx.userToken) {
      return;
    }

    const token = useCtx.userToken;

    fetch(`${process.env.API_URL}api/v1/users/get-favorite-film`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `${token}`,
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
  }, [useCtx]);

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
      <h2 className="list-title">Mes favoris</h2>
      <main className="main--homepage-net list">
        <div className="slick-contains list">
          {listFavorites.map((el) => {
            return (
              <div key={el._id} className="slick-els list">
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
        </div>
      </main>
    </div>
  );
}

export default List;
