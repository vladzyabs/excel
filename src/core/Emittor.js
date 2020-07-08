class Emittor {
    constructor() {
        this.listeners = {}
    }

    // dispatch or trigger
    // Уведомляем слушателей, если они есть
    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false
        }
        this.listeners[eventName].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомление
    // Добавляем новго слушателя
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || []
        this.listeners[eventName].push(fn)
        return () => {
            this.listeners[eventName] =
                this.listeners[eventName].filter(listener => listener !== fn)
        }
    }
}
