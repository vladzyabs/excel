import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
        const type = $resizer.data.resize
        let value
        $resizer.css({opacity: '1'})
        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({
                    right: -delta + 'px',
                    bottom: '-100px',
                })
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({
                    bottom: -delta + 'px',
                    right: '-100px',
                })
            }
        }
        document.onmouseup = e => {
            document.onmousemove = null
            document.onmouseup = null
            $resizer.css({
                opacity: '0',
                right: '0',
                bottom: '0',
            })
            if (type === 'col') {
                $parent.css({
                    width: value + 'px',
                })
                cells.forEach(item => item.style.width = value + 'px')
            } else {
                $parent.css({
                    height: value + 'px',
                })
            }

            resolve({
                value,
                id: type === 'col' ? $parent.data.col : null,
            })
        }
    })
}
