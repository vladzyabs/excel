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

const emittor = new Emittor()
const unsub = emittor.subscribe('vlad', data => console.log(data))
emittor.emit('123', 23)
setTimeout(() => emittor.emit('vlad', 'set 2 seconds'), 2000)
setTimeout(() => unsub(), 3000)
setTimeout(() => emittor.emit('vlad', 'set 4 seconds'), 4000)
