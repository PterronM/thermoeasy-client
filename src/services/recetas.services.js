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

export { allRecetasService, detailRecetaService, deleteRecetaService };
