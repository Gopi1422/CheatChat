const express = require("express");
const { allUsers } = require("../controllers/userControllers");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(authenticateUser, allUsers);
// router.route("/").post(registerUser);
// router.post('/login',authUser)

module.exports = router;

// /api/user/ for registration - post -->done
// /api/user/login for login - post -->done...also searching the user is done

// /api/chat - post(accesschats) and get(fetchchats) both -->done
// /api/chat/group - post(creategroupchat) -->done
// /api/chat/group/rename - put(renamegroup)  -->done
// /api/chat/group/user - delete(removefromgroup) -->done
// /api/chat/group/user - post(addtogroup) -->done

// /api/message/:chatid - get(allmessages)
// /api/message/ - post(sendmessage) a part of socket

///which APIs are publicly available, and which are not, or which are authorised and which are not based on type of role of user(guest or simply user) and guest can't create group
