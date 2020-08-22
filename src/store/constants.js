var moment = require('moment');

const generateUUID = (length = 7) => {
    return Math.random().toString(36).substring(2, length);
};

export const genCategoryId = () => {
    return `category_${generateUUID()}`;
};

export const genTaskId = () => {
    return `task_${generateUUID()}`;
};

export const dateFormat = 'YYYYMMDD';
export const timeFormat = 'hhmmss';

//categories[value].tasks.length;

//group by due date

export const CUSTOM_CATEGORY_ID = 'category_add_custom';

export const ADD_CUSTOM_CATEGORY = {
    categoryId: CUSTOM_CATEGORY_ID,
    colorCode: 'grey',
    name: 'Add Category',
    tasks: [],
};

export const CUSTOM_COLOR_CODE = 'CUSTOM_COLOR_CODE';
export const COLOR_CODE_MAP = {
    'PEACOCK': ['#6FE5DE', '#6676FD'], //DEFAULT
    'CANDY': ['#faf', '#abe'], //DEFAULT
    'CUSTOM_COLOR_CODE': ['rgba(0,0,0,0.00)', '#5e5e5e'], //DEFAULT
    'GREENERY': ['#B4EC51', '#429321'],
    'ORANGE': ['#FAD961', '#F76B1C'],
    'PURPLE': ['rgba(71,72,162,0.35)', '#1E1C70'],
    'SLATEGREEN': ['#3b8d99', '#6b6b83'],
    'RED': ['#fffbd5', '#b20a2c'],
    'TELEGRAM': ['#f2fcfe', '#1c92d2'],
};

export const CATEGORY_DATA = [
    {
        id: '1',
        colorKey: 'GREENERY',
    },
    {
        id: '2',
        colorKey: 'ORANGE',
    },
    {
        id: '3',
        colorKey: 'PURPLE',
    },

    {
        id: '4',
        colorKey: 'TELEGRAM',
    },
    {
        id: '5',
        colorKey: 'RED',
    },
];

export const intialState = {
    categories: {
        'category_personal': {
            categoryId: 'category_personal',
            colorCode: 'PEACOCK',
            name: 'Personal',
            tasks: [
                {
                    id: 'task_template_buy',
                    name: 'Buy groceries',
                    createdTime: moment().format(timeFormat),
                    createdDate: moment().format(dateFormat),
                    completed: false,
                }, {
                    id: 'task_template_chore',
                    name: 'Plumbing Chore',
                    createdTime: moment().format(timeFormat),
                    createdDate: 20200512,
                    completed: false,
                },
                {
                    id: 'task_template_gardening',
                    name: 'Gardening',
                    createdTime: moment().format(timeFormat),
                    createdDate: moment().format(dateFormat),
                    completed: false,
                },
            ],
        },
        'category_work': {
            categoryId: 'category_work',
            colorCode: 'CANDY',
            name: 'Work',
            tasks: [
                {
                    id: 'task_template_meeting',
                    name: 'Meetings with Offshore Team',
                    createdTime: moment().format(timeFormat),
                    createdDate: moment().format(dateFormat),
                    completed: false,
                },
            ],
        },
    },
};

//use
//UTC string is stored as "Sun, 10 May 2020 19:34:29 GMT"
//iso string is stored as "2020-05-10T19:34:27.877Z"

//convert to local timezone
// moment.locale
//mama.tz('Asia/Kolkata').format('MMMMDoYYYY')
//


/* const groupTasksByDate = () => {
        //For clicked category, how many tasks i have today
        let categoryObj = Object.values(categories);
        //loop over with tasks and append to a big array then group by
        var arr = [];
        _.forEach(categoryObj, (obj) => {
            console.log('xxxx ', obj.tasks);
            arr.push(...obj.tasks);
        });
        console.log('xxx new arra',arr);

        var xx = groupBy(arr, moment().format(dateFormat)); //THIS GROUP BY DOES NOT WORK
        // THE VALUE OF TIMESTAMP IS INSIDE THE ARRAY  fullDueDate
        console.log('xxx arr', xx, new Date().toISOString());


         //find how many tasks i have to perform today
      var data = groupBy(tasks, (task) => {
             return moment(task.createdDate, "YYYYMMDD").isSame(moment().format(dateFormat));
         });
 var data = _.map(tasks, (task) => {
     return moment(task.createdDate).isSame(moment().format(dateFormat));
 });
    };  */



//TODO
/*
* 1. hide add category card if category limit(7) is reached
* 2. In add category screen, filter out the already used colors for category
* 3. Fix useRef , categories data not updated (Add Category, save -> navigate to home screen)
*
* */
