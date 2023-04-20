import service from "./config.services";

const allRecetasService = () => {
  return service.get("/receta");
};
const detailRecetaService = (id) => {
  return service.get(`/receta/${id}`);
};

const deleteRecetaService = (id) => {
  return service.delete(`/receta/${id}/delete`);
};

const addDelFavService = (id,updateFav) =>{
  return service.patch(`/receta/${id}/favorito`, updateFav)
};

const newRecService = (newRec) =>{
  return service.post("/receta/crear-receta" , newRec)
}

export { 
  allRecetasService, 
  detailRecetaService, 
  deleteRecetaService, 
  addDelFavService,
  newRecService
 };
