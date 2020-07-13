import {storage} from '@core/utils';
import {defaultsStyles} from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    stylesState: {},
    currentText: '',
    dataState: {},
    currentStyles: defaultsStyles,
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultsStyles,
    currentText: '',
})

export const initialState =
    storage('excel-state')
        ? normalize(storage('excel-state'))
        : defaultState
