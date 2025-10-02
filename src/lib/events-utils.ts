import { GravitasEvent, EventsByClub } from "@/types/events";
import matchedEventsData from "@/../data/matched_events.json";

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
 * Get all unique events across all clubs (deduplicated by name)
 * @returns Array of unique events
 */
export function getAllUniqueEvents(): GravitasEvent[] {
  const eventsData = matchedEventsData as EventsByClub;
  const allEvents: GravitasEvent[] = [];
  const seenEventNames = new Set<string>();

  Object.values(eventsData).forEach((clubEvents) => {
    clubEvents.forEach((event) => {
      if (!seenEventNames.has(event.name)) {
        seenEventNames.add(event.name);
        allEvents.push(event);
      }
    });
  });

  return allEvents;
}

/**
 * Get total number of unique events across all clubs
 * @returns Total number of unique events
 */
export function getTotalEventsCount(): number {
  return getAllUniqueEvents().length;
}

/**
 * Get unique events by type across all clubs
 * @param eventType - The type of event to filter by
 * @returns Array of unique events of the specified type
 */
export function getEventsByType(eventType: string): GravitasEvent[] {
  return getAllUniqueEvents().filter((event) => event.type === eventType);
}

/**
 * Get total count of unique events by type
 * @param eventType - The type of event to count
 * @returns Number of unique events of the specified type
 */
export function getEventsCountByType(eventType: string): number {
  return getEventsByType(eventType).length;
}

/**
 * Get all unique event types
 * @returns Array of unique event types
 */
export function getAllEventTypes(): string[] {
  const uniqueEvents = getAllUniqueEvents();
  const types = uniqueEvents.map((event) => event.type);
  return [...new Set(types)];
}

/**
 * Get events statistics by type
 * @returns Object with event types as keys and counts as values
 */
export function getEventsStatsByType(): Record<string, number> {
  const uniqueEvents = getAllUniqueEvents();
  const stats: Record<string, number> = {};

  uniqueEvents.forEach((event) => {
    stats[event.type] = (stats[event.type] || 0) + 1;
  });

  return stats;
}

/**
 * Check if an event is collaborative (organized by multiple clubs)
 * @param eventName - The name of the event
 * @returns Boolean indicating if the event is collaborative
 */
export function isCollaborativeEvent(eventName: string): boolean {
  const eventsData = matchedEventsData as EventsByClub;
  const clubsWithEvent: string[] = [];

  Object.entries(eventsData).forEach(([clubName, events]) => {
    if (events.some((event) => event.name === eventName)) {
      clubsWithEvent.push(clubName);
    }
  });

  return clubsWithEvent.length > 1;
}

/**
 * Get all clubs that organized a specific event
 * @param eventName - The name of the event
 * @returns Array of club names that organized this event
 */
export function getCollaboratingClubs(eventName: string): string[] {
  const eventsData = matchedEventsData as EventsByClub;
  const collaboratingClubs: string[] = [];

  Object.entries(eventsData).forEach(([clubName, events]) => {
    if (events.some((event) => event.name === eventName)) {
      collaboratingClubs.push(clubName);
    }
  });

  return collaboratingClubs;
}

/**
 * Get all collaborative events with their participating clubs
 * @returns Array of objects containing event details and collaborating clubs
 */
export function getAllCollaborativeEvents(): Array<{
  event: GravitasEvent;
  collaboratingClubs: string[];
}> {
  const uniqueEvents = getAllUniqueEvents();
  const collaborativeEvents: Array<{
    event: GravitasEvent;
    collaboratingClubs: string[];
  }> = [];

  uniqueEvents.forEach((event) => {
    const clubs = getCollaboratingClubs(event.name);
    if (clubs.length > 1) {
      collaborativeEvents.push({
        event,
        collaboratingClubs: clubs,
      });
    }
  });

  return collaborativeEvents;
}

/**
 * Get count of collaborative events
 * @returns Number of collaborative events
 */
export function getCollaborativeEventsCount(): number {
  return getAllCollaborativeEvents().length;
}
