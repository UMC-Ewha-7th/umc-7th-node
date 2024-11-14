
import { getUserOngoingMissions } from '../services/mission.service.js';
import { completeMission } from '../services/mission.service.js';

export const getUserOngoingMissionsController = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const missions = await getUserOngoingMissions(userId);
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ongoing missions.' });
  }
};

export const completeMissionController = async (req, res) => {
  const { userId, missionId } = req.params;
  try {
    const result = await completeMission(parseInt(userId), parseInt(missionId));
    if (result.count > 0) {
      res.json({ message: 'Mission completed successfully.' });
    } else {
      res.status(404).json({ error: 'No ongoing mission found to complete.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete mission.' });
  }
};
