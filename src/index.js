import cors from "cors";
import dotenv from "dotenv";
import express from 'express'; // -> ES Module
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import {handleUserSignUp} from "./controllers/user.controller.js";
import { handleUserReview, handleListShopReview, handleListUserReview } from "./controllers/review.controller.js";
import { handleListShopMission, handleShopMission } from "./controllers/mission.controller.js";
import { handleCompleteMission, handleStartMission } from "./controllers/usermission.controller.js";

dotenv.config();

const app = express()
const port = process.env.PORT;

/* 공통 응답을 사용할 수 있는 헬퍼 함수 등록 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});


app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
  "/docs",
  swaggerUiExpress.serve, 
  swaggerUiExpress.setup({},{
    swaggerOptions: { 
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async(req, res, next) => {
  //#swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false
  };
  const outputFile = "/dev/null"; //파일 출력 사용 X
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };
  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/users",handleUserSignUp);
app.post("/shop/:shopId/review",handleUserReview);
app.get("/users/reviews",handleListUserReview);
app.get("/shop/:shopId/reviews",handleListShopReview);
app.post("/shop/:shopId/mission",handleShopMission);
app.get("/shop/:shopId/missions",handleListShopMission);
app.post("/users/mission",handleStartMission);
app.patch("/users/mission/complete", handleCompleteMission);

/* 전역 오류를 처리하기 위한 미들웨어 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})