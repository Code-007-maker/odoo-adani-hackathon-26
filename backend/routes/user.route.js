import { Router } from "express";
import { registerUser,loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, changeAccountDetails, updateUserAvatar} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route('/register').post(upload.none(),registerUser);

router.route('/login').post(upload.none(),loginUser);

router.route('/logout').post(verifyJWT,upload.none(),logoutUser);

router.route('/refreshaccessToken').post(upload.none(),refreshAccessToken);

router.route('/changecurrentpassword').post(upload.none(),verifyJWT,changeCurrentPassword);
router.route('/changeaccountdetails').post(upload.none(),verifyJWT,changeAccountDetails);
router.route('/updateuseravatar').post(upload.single("avatar"),verifyJWT,updateUserAvatar);
export default router;