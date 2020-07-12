import {storage} from '@core/utils';

const defaultState = {
    colState: {},
    rowState: {},
    currentText: '',
    dataState: {},
}

export const initialState =
    storage('excel-state')
        ? storage('excel-state')
        : defaultState
