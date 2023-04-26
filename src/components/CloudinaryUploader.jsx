import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { uploadImageService } from "../services/upload.services";


function CloudinaryUploader(props) {
  console.log(props)
  const redirect = useNavigate();
  const [imageUrl1, setImageUrl1] = useState(null);
  const [isUploading1, setIsUploading1] = useState(false);


  useEffect(() => {
    if (props.img) {
      setImageUrl1(props.img[0]); 
    }
  }, []);

  const handleFileUpload1 = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading1(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl1(response.data.img);
      props.setImage1(response.data.img);
      setIsUploading1(false);
    } catch (error) {
      redirect("/error");
    }
  };

  

  return (
    <div className="cloudinary-view-container">
      <div className="cloudinary-images">
        {imageUrl1 && (
          <div className="eachImg-div">
            <p>1</p>
            <img src={imageUrl1} alt="img" width={50} />
          </div>
        )}
      </div>

      <div className="selectImg-container">
        {isUploading1 && <PropagateLoader />}
        <label htmlFor="image1Edit">Imagen 1</label>
        <input
          type="file"
          name="image"
          className="inputfile"
          id="image1Edit"
          onChange={handleFileUpload1}
          disabled={isUploading1}
        />
        </div>
    </div>
  );
}

export default CloudinaryUploader;