const User = require('../models/user')

const initialUsers = [
{
    username: 'root',
    name: 'Superuser',
    password: 'sekret'
},
{
    username: 'testuser',
    name: 'Test User',
    password: 'test123'
}
]

const nonExistingId = async () => {
const user = new User({
    username: 'willremove',
    name: 'Will Remove',
    password: 'temp123'
})
await user.save()
await user.deleteOne()
return user._id.toString()
}

const usersInDb = async () => {
const users = await User.find({})
return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    nonExistingId,
    usersInDb
}

