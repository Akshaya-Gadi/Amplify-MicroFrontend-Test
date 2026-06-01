import { useEffect } from 'react';
import { eventBus, type EventName, type EventPayloadMap } from '@mfe/event-bus';

/**
 * Subscribe a React component to an event-bus event for its lifetime.
 * Automatically unsubscribes on unmount.
 */
export function useEventListener<E extends EventName>(
  event: E,
  handler: (payload: EventPayloadMap[E]) => void,
): void {
  useEffect(() => {
    const off = eventBus.on(event, handler);
    return off;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
}
