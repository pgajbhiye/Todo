var _ = require('lodash');

export const categoryReducer = (state, action) => {
    const payload = action.payload || {};
    console.log('ass action ', action, action.payload);

    switch (action.type) {

        case 'ADD_CATEGORY': {
            return {...state, [payload.categoryId]: {...payload}};
        }

        case 'DELETE_CATEGORY': {
            return {};
        }

        case 'ADD_TASK': {
            const categoryId = payload.categoryId;
            delete payload.categoryId;

            const categoryObj = state[categoryId];
            const orgTasks = categoryObj.tasks;
            orgTasks.push(payload);


            return {
                ...state,
                [categoryId]: {
                    ...categoryObj,
                    tasks: orgTasks,
                },
            };
        }

        case 'DELETE_TASK': {
            const taskId = action.payload.id;
            const categoryId = payload.categoryId;
            const categoryObj = state[categoryId];
            const orgTasks = categoryObj.tasks;

            const rTasks = _.remove(orgTasks, (task) => {
                return task.id !== taskId;

            });

            return {
                ...state,
                [categoryId]: {
                    ...categoryObj,
                    tasks: rTasks,
                },
            };
        }
        case 'UPDATE_TASK': {
            const taskId = action.payload.id;
            const name = action.payload.name;
            const date = action.payload.createdDate;
            const completed = action.payload.completed;

            const categoryId = payload.categoryId;
            const categoryObj = state[categoryId];
            const orgTasks = categoryObj.tasks;


            const nTasks = _.forEach(orgTasks, function (task) {
                if (task.id === taskId) {
                    task.name = name;
                    task.createdDate = date;
                    task.completed = completed;
                }
                return task;
            });

            console.log('ass ', nTasks);
            return {
                ...state,
                [categoryId]: {
                    ...categoryObj,
                    tasks: nTasks,
                },
            };
        }
        default : {
            return state || {};
        }
    }
};
