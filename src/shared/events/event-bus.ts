/**
 * In-process event bus for decoupled communication between modules.
 * Modules publish domain events instead of importing each other's internals.
 */
type Handler<T = unknown> = (payload: T) => void | Promise<void>

class EventBus {
  private handlers = new Map<string, Handler[]>()

  on<T>(event: string, handler: Handler<T>) {
    const list = this.handlers.get(event) ?? []
    list.push(handler as Handler)
    this.handlers.set(event, list)
  }

  async emit<T>(event: string, payload: T) {
    const list = this.handlers.get(event) ?? []
    await Promise.all(list.map((h) => h(payload)))
  }
}

export const eventBus = new EventBus()
