import {ExcelComponent} from '@core/ExcelComponent';
import {creatTable} from '@/components/table/table.templat';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelect, shouldResize} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
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
        this.selectCell($cell)
        this.$on('formula:input', text => {
            this.slection.carrent.text(text)
        })
        this.$on('formula:done', () => {
            this.slection.carrent.focus()
        })
        // this.$subscribe(state => console.log('table state', state))
    }

    selectCell($cell) {
        this.slection.select($cell)
        this.$emit('table:select', $cell)
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.slection.carrent)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.slection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}
