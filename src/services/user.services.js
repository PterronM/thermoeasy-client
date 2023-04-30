import service from "./config.services";

const infoUser = (idUser) => {
    return service.get(`/user/${idUser}`);
  };

const editPerfilUserService = (idUser) =>{
    return service.patch(`/user/${idUser}/update`)
}

export { infoUser, editPerfilUserService};