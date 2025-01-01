import multer from "multer";
import path from "node:path";
import { HttpError } from "./error-handler";

const destinationPath = path.join(__dirname, "../../data");
const imagePattern = /\.(jpeg|JPEG|jpg|JPG|png|PNG|svg|SVG)$/;
const docPattern = /\.(pdf|PDF|doc|DOC|docx|DOCX)$/;

function upload(variant: "image" | "docs" | "both") {
  return multer({
    storage: multer.diskStorage({
      destination(_req, _file, cb) {
        cb(null, destinationPath);
      },
      filename(_req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (variant === "image") {
        if (!file.originalname.match(imagePattern)) {
          // Return an error and reject the file upload
          return cb(
            new HttpError("Invalid file type, only images are allowed", 400),
          );
        }
      } else if (variant === "docs") {
        if (!file.originalname.match(docPattern)) {
          // Return an error and reject the file upload
          return cb(
            new HttpError("Invalid file type, only documents are allowed", 400),
          );
        }
      } else if (variant === "both") {
        if (
          !file.originalname.match(imagePattern) &&
          !file.originalname.match(docPattern)
        ) {
          // Return an error and reject the file upload
          return cb(
            new HttpError(
              "Invalid file type, only images and documents are allowed",
              400,
            ),
          );
        }
      } else {
        return cb(new HttpError("Invalid upload variant", 400));
      }
      // Continue with the file upload process
      cb(null, true);
    },
  });
}

const multer_img = upload("image");
const multer_doc = upload("docs");
const multer_img_doc = upload("both");
export { multer_doc, multer_img_doc, multer_img };
