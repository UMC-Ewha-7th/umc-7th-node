
import prisma from '../db.config.js'; // Prisma client를 import

export const getUserActiveMissions = async (userId) => {
  return await prisma.myMission.findMany({
    where: {
      userId: userId,
      status: 'active', // 진행 중인 상태
    },
    include: {
      mission: true, // 연관된 mission 데이터 포함
      restaurant: true, // 연관된 restaurant 데이터 포함
    },
  });
};

export const completeMission = async (userId, missionId) => {
    return await prisma.myMission.updateMany({
      where: {
        userId: userId,
        missionId: missionId,
        status: 'active', // 현재 상태가 진행 중인지 확인
      },
      data: {
        status: 'completed', // 완료 상태로 변경
      },
    });
  };