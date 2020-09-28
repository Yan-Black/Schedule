import { eventTypes } from "@constants";

export const noType = 'no type';
export const mentorRole = 'Mentor';
export const operationColKey = 'operation';
export const filters = Object.values(eventTypes).map((eventType) => {
  return { text: eventType, value: eventType };
});
