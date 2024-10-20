import cors from "cors";
import dotenv from "dotenv";
import express from 'express'; // -> ES Module
import {handleUserSignUp} from "./controllers/user.controller.js";
import { handleUserReview } from "./controllers/review.controller.js";
import { handleShopMission } from "./controllers/mission.controller.js";
import { handleStartMission } from "./controllers/usermission.controller.js";

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/users",handleUserSignUp);
app.post("/shop/:shopId/review",handleUserReview);
app.post("/shop/:shopId/mission",handleShopMission);
app.post("/users/mission",handleStartMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})