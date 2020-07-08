import {ExcelComponent} from '@core/ExcelComponent';
import {creatTable} from '@/components/table/table.templat';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelect, shouldResize} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown'],
        });
    }

    toHTML() {
        return creatTable()
    }

    prepare() {
        this.slection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.slection.select($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.slection.carrent)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.slection.selectGroup($cells)
            } else {
                this.slection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'ArrowLeft',
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.slection.carrent.id(true)
            const $next = this.$root.find(nextSelect(key, id))
            this.slection.select($next)
            console.log(key)
        }
    }
}
