import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDelFavService } from "../services/recetas.services";
import notFavHeart from "../assets/images/heart-outline.png";
import favHeart from "../assets/images/heart-red.png";

function IsRecFavourite(props) {
  const { idReceta, userFavs } = props;
  const redirect = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [fav] = useState(idReceta);
  const [notFav] = useState(idReceta);

  useEffect(() => {
    userFavs.map((each) => {
      if (each === idReceta) {
        setIsFavorite(true);
      }
    });
  }, []);

  const addFav = async () => {
    const idToRec = { fav };
    try {
      await addDelFavService(idReceta, idToRec);
    } catch (error) {
      redirect("/error");
    }
  };

  const deleteFav = async () => {
    const idToRecDel = { notFav };
    try {
      await addDelFavService(idReceta, idToRecDel);
      setIsFavorite(!isFavorite);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      {isFavorite ? (
        <button onClick={deleteFav}>
          <img src={favHeart} alt="" width={20} />
        </button>
      ) : (
        <button onClick={addFav}>
          <img src={notFavHeart} alt="" width={20} />
        </button>
      )}
    </>
  );
}

export default IsRecFavourite;
