import service from "./config.services";

const allRecetasService = () => {
  return service.get("/receta");
};
const detailRecetaService = (id) => {
  return service.get(`/receta/${id}`);
};

const recetasUser = () => {
  return service.get("/receta/recetaUser");
};

const recetasFavUserService = () =>{
  return service.get("/receta/favoritos")
}

const editRecService = (idReceta, updatedRec)=>{
  return service.patch(`/receta/${idReceta}/update`, updatedRec)
}

const deleteRecetaService = (idReceta) => {
  return service.delete(`/receta/${idReceta}/delete`);
};

const addDelFavService = (id, updateFav) => {
  return service.patch(`/receta/${id}/favorito`, updateFav);
};

const newRecService = (newRec) => {
  return service.post("/receta/crear-receta", newRec);
};

export {
  allRecetasService,
  detailRecetaService,
  deleteRecetaService,
  addDelFavService,
  newRecService,
  recetasUser,
  recetasFavUserService,
  editRecService
};
