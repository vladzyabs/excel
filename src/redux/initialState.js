import {storage} from '@core/utils';
import {defaultsStyles, defaultTitle} from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    stylesState: {},
    currentText: '',
    dataState: {},
    currentStyles: defaultsStyles,
    title: defaultTitle,
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
