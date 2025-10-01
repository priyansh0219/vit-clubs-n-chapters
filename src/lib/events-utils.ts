import { GravitasEvent, EventsByClub } from "@/types/events";
import matchedEventsData from "@/../matched_events.json";

/**
 * Get events for a specific club by club name
 * @param clubName - The name of the club
 * @returns Array of events for the club
 */
export function getEventsForClub(clubName: string): GravitasEvent[] {
  const eventsData = matchedEventsData as EventsByClub;
  return eventsData[clubName] || [];
}

/**
 * Check if a club has any events
 * @param clubName - The name of the club
 * @returns Boolean indicating if the club has events
 */
export function clubHasEvents(clubName: string): boolean {
  return getEventsForClub(clubName).length > 0;
}

/**
 * Get all clubs with events
 * @returns Array of club names that have events
 */
export function getClubsWithEvents(): string[] {
  const eventsData = matchedEventsData as EventsByClub;
  return Object.keys(eventsData);
}

/**
 * Get total number of events across all clubs
 * @returns Total number of events
 */
export function getTotalEventsCount(): number {
  const eventsData = matchedEventsData as EventsByClub;
  return Object.values(eventsData).reduce(
    (total, events) => total + events.length,
    0
  );
}

/**
 * Get events by type across all clubs
 * @param eventType - The type of event to filter by
 * @returns Array of events of the specified type
 */
export function getEventsByType(eventType: string): GravitasEvent[] {
  const eventsData = matchedEventsData as EventsByClub;
  const allEvents: GravitasEvent[] = [];

  Object.values(eventsData).forEach((clubEvents) => {
    allEvents.push(...clubEvents.filter((event) => event.type === eventType));
  });

  return allEvents;
}
