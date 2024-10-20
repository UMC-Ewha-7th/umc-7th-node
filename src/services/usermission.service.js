import { responseFromUserMission } from "../dtos/usermission.dto.js";
import { bodyToUserMission } from "../dtos/usermission.dto.js";
import { addUserMission } from "../repositories/usermission.repository.js";

export const startMission = async (missionId) => {
    // USER_MISSION에 미션 추가
    const userMissionData = bodyToUserMission(missionId);
    const userMissionId = await addUserMission(userMissionData);

    // 응답 반환
    return responseFromUserMission({ missionId, status: userMissionData.status });
};
