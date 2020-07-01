const CODES = {
    A: 65,
    Z: 90,
}

function toCell(_, col) {
    return `
        <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toColumn(content, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ``
    return `
        <div class="row">
            <div class="row-info" class="column" data-type="resizable">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>        
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function creatTable(rowsCount = 26) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    // first row
    rows.push(createRow(null, cols))

    // other rows
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(rowsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}
