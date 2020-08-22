import {genCategoryId, genTaskId, timeFormat} from './constants';

var moment = require('moment');

export const addCategory = (name, colorCode) => {
    return {
        type: 'ADD_CATEGORY',
        payload: {
            categoryId: genCategoryId(),
            name,
            colorCode,
            tasks :[]
        },
    };
};

export const deleteCategory = (categoryId) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: {
            categoryId,
        },
    };
};


export const addTask = (categoryId, name, createdDate = Date.now()) => {
    return {
        type: 'ADD_TASK',
        payload: {
            id: genTaskId(),
            categoryId,
            name,
            createdDate,
            createdTime: moment(createdDate).format(timeFormat), // use the value selected by the user
            completed: false,
        },
    };
};


export const deleteTask = (categoryId, id) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            categoryId,
            id,
        },
    };
};

export const updateTask = (categoryId, id, name, createdDate, completed) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            categoryId,
            name,
            createdDate,
            completed,
            id,
        },
    };
};


