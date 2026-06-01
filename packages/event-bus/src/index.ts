/**
 * Cross-microfrontend event bus.
 *
 * IMPORTANT: Each microfrontend bundles its own copy of this code. To guarantee
 * that Billing and Claims talk to the SAME bus at runtime, the instance is stored
 * on `globalThis`. The class may be duplicated, the instance is not.
 */

export type EventPayloadMap = {
  'invoice-updated': { invoiceId: string; amount: number; updatedAt: string };
  'claim-opened': { claimId: string; status: string };
  notification: { id: string; severity: 'info' | 'success' | 'warning' | 'error'; message: string };
};

export type EventName = keyof EventPayloadMap;
type Handler<E extends EventName> = (payload: EventPayloadMap[E]) => void;

class EventBus {
  private listeners = new Map<EventName, Set<Handler<EventName>>>();

  on<E extends EventName>(event: E, handler: Handler<E>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    const set = this.listeners.get(event)!;
    set.add(handler as Handler<EventName>);
    return () => this.off(event, handler);
  }

  off<E extends EventName>(event: E, handler: Handler<E>): void {
    this.listeners.get(event)?.delete(handler as Handler<EventName>);
  }

  emit<E extends EventName>(event: E, payload: EventPayloadMap[E]): void {
    this.listeners.get(event)?.forEach((handler) => {
      try {
        (handler as Handler<E>)(payload);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`[event-bus] handler for "${String(event)}" threw:`, err);
      }
    });
  }
}

const GLOBAL_KEY = '__MFE_EVENT_BUS__';
const globalScope = globalThis as unknown as Record<string, EventBus>;

export const eventBus: EventBus = globalScope[GLOBAL_KEY] ?? (globalScope[GLOBAL_KEY] = new EventBus());

/** Convenience helper to publish a notification that any module can render. */
export function notify(
  severity: EventPayloadMap['notification']['severity'],
  message: string,
): void {
  eventBus.emit('notification', {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    severity,
    message,
  });
}
