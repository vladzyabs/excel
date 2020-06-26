import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root) {
        super($root, {
            name: 'Header',
            listeners: ['click'],
        });
    }

    toHTML() {
        return `
            <input class="header__input" type="text" value="Новая таблица">
            <div>
                <div class="header__button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="header__button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>
        `
    }

    onClick(event) {
        console.log(event.target)
    }
}
