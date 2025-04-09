import { captureFlagEventData } from './captureFlag';
import { birthdayGambitEventData } from './birthdayGambit';

export {
  captureFlagEventData,
  birthdayGambitEventData
};

// Helper functions for events
export const getActiveEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData].filter(
    event => event.status === "LIVE"
  );
};

export const getUpcomingEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData].filter(
    event => event.status === "UPCOMING"
  );
};

export const getAllEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData];
};