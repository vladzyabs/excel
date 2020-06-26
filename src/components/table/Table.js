import {ExcelComponent} from '@core/ExcelComponent';
import {creatTable} from '@/components/table/table.templat';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    toHTML() {
        return creatTable()
    }
}
