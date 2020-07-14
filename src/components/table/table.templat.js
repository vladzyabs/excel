import {toInlineStyles} from '@core/utils';
import {defaultsStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultsStyles,
            ...state.stylesState[id],
        })
        return `
            <div 
            class="cell" 
            style="${styles}; width: ${width};"
            contenteditable 
            data-type="cell" 
            data-col="${col}" 
            data-value="${data || ''}"
            data-id="${id}">${parse(data) || ''}</div>
        `
    }
}

function toColumn({col, index, width}) {
    return `
        <div class="column" style="width: ${width}" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, state) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ``
    const height = getHeight(state, index)
    return `
        <div class="row" style="height: ${height}" data-type="resizable" data-row="${index}">
            <div class="row-info" class="column">
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index),
        }
    }
}

export function creatTable(rowsCount = 30, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    // first row
    rows.push(createRow(null, cols, {}))

    // other rows
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(rowsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}
