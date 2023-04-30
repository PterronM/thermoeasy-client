
import service from "./config.services";

const updateUserProfileService = (id, updatedProfile) => {
    return service.patch(`/user/${id}/update`, updatedProfile);
  };


  export { updateUserProfileService };