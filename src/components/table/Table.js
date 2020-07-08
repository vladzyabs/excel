import {ExcelComponent} from '@core/ExcelComponent';
import {creatTable} from '@/components/table/table.templat';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
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
            this.slection.select($target)
        }
    }
}
