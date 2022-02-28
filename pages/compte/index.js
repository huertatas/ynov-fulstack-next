import React, { useContext, useState } from "react";
import HeaderNetflix from "../../components/header/HeaderNetflix";
import { UserContext } from "../../context/Context";
import router from "next/router";
import toast from "react-hot-toast";

function Compte() {
  const useCtx = useContext(UserContext);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const handleCreateMovie = () => {
    if (name && image && video && category && type) {
      const token = useCtx.userToken;
      fetch(`${process.env.API_URL}api/v1/film/create-movie`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          name: name,
          image: image,
          video: video,
          category: category,
          type: type,
        }),
      })
        .then(async (res) => {
          const recep = await res.json();
          toast.success("film ajouté");
        })
        .catch((e) => {
          console.log(e.message);
          toast.error("echec");
        });
    } else {
      toast.error("champs manquants");
    }
  };

  if (!useCtx.userToken) {
    return <div></div>;
  }

  const handleUnsubscription = () => {
    fetch(`${process.env.API_URL}api/v1/checkout/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `${useCtx.userToken}`,
      },
      body: JSON.stringify({ userId: useCtx.userId }),
    })
      .then(async (res) => {
        useCtx.deleteToken();
        toast.success(`vous n'êst désormais plus abonné`);
        router.push("/netflix");
      })
      .catch((e) => e.message);
  };

  return (
    <div className="main-home">
      <HeaderNetflix />
      <main className="main--homepage-net compte">
        <div className="contains-button">
          <button className="button-home compte" onClick={handleUnsubscription}>
            Annuler l&apos;abonnement
          </button>
          <button
            className="button-home compte"
            onClick={() => {
              useCtx.deleteToken();
              router.push("/netflix");
            }}
          >
            Se deconnecter
          </button>
        </div>
        <div className="admin">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateMovie();
            }}
          >
            <h1>Espace Admin: ajout de film</h1>
            <input
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="nom du film"
            ></input>
            <input
              onChange={(e) => setImage(e.currentTarget.value)}
              placeholder="url de l'image"
            ></input>
            <input
              onChange={(e) => setVideo(e.currentTarget.value)}
              placeholder="idYoutube (v=id) paramètre query de youtube"
            ></input>
            <select
              onChange={(e) => setCategory(e.currentTarget.value)}
              id="category"
              className="options"
            >
              <option value="rien">Catégories</option>
              <option value="scary">Effrayant</option>
              <option value="suspense">Suspense</option>
              <option value="thriller">Thriller</option>
              <option value="romance">Romance</option>
              <option value="action">Action</option>
              <option value="comedy">Comédie</option>
            </select>
            <select
              onChange={(e) => setType(e.currentTarget.value)}
              id="type"
              className="options"
            >
              <option value="rien">Type</option>
              <option value="standard">Standard</option>
              <option value="prenium">Prenium</option>
            </select>
            <button>ajouter film</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Compte;
