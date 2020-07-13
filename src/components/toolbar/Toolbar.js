import {ExcelStatComponent} from '@core/ExcelStatComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {defaultsStyles} from '@/constants';

export class Toolbar extends ExcelStatComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options,
        });
    }

    prepare() {
        this.initState(defaultsStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('tollbar:applyStyle', value)
            const key = Object.keys(value)[0]
            this.setState({[key]: value[key]})
        }
    }
}
