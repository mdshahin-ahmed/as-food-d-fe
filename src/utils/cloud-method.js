// import {useClient} from '@/hooks/pure/useClient'
import { cloudinaryClient } from "./cloudinary-client";

function imageUpload(data) {
  return cloudinaryClient(data);
}

export { imageUpload };
