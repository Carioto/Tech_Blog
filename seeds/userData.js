const { User } = require('../models')

const userData = [
{
    id: '1',
    username: 'PieInTheFace',
    email:'pieintheface@outlook.com',
    password:'chickensoup'
},
{
    id: '2',
    username: 'berryInATree',
    email:'berryinatree@outlook.com',
    password:'waterbottle'
},
{
    id: '3',
    username: 'PencilNotSharp',
    email:'pencilnotsharp@utlook.com',
    password:'angrycrackers'
},
]
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;