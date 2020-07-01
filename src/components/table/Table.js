import {ExcelComponent} from '@core/ExcelComponent';
import {creatTable} from '@/components/table/table.templat';
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

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const value = coords.width + delta
                $parent.$el.style.width = value + 'px'
                document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(item => item.style.width = value + 'px')
            }
            document.onmouseup = e => {
                document.onmousemove = null
            }
        }
    }
}
