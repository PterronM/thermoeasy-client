import service from "./config.services";

const allRecetasService = () => {
    return service.get("/receta");
  };


export { allRecetasService };