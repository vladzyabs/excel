import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name
        this.emitter = options.emitter
        this.prepare()
        this.unsubscribers = []
    }

    // Настратвает компоненту до init
    prepare() {}

    // return template component
    toHTML() {
        return ''
    }

    // Уведомляет слушателя про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписывает на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // Инициализирует компонент
    // Добавляет Dom слушателей
    init() {
        this.initDomListener()
    }

    // Удаляет компонент
    // Чистит слушателей
    destroy() {
        this.removeDomListener()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
