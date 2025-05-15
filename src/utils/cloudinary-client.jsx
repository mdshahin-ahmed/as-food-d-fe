import { FiTrash2 } from "react-icons/fi";
import AsToast from "../components/common/AsToast";

const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
const cloudName = import.meta.env.VITE_CLOUD_NAME;

async function cloudinaryClient(data) {
  const config = {
    method: "POST",
    body: data,
  };

  return window
    .fetch(`${cloudinaryURL}/${cloudName}/image/upload`, config)
    .then(async (response) => {
      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      }
      return AsToast.error(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;<span>{responseData?.error?.message}</span>
        </div>
      );
    });
}

export { cloudinaryClient };
