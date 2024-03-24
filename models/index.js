const Blog = require('./Blog');
const Comment = require('./Comm');
const User = require('./User');

User.hasMany(Blog, {
    foreignKey:'user_id',
});

Blog.belongsTo(User,{
    foreignKey:'user_id',
});

User.hasMany(Comment,{
    foreignKey:'user_id',
});

Blog.hasMany(Comment, {
    foreignKey:'comId',
});

Comment.belongsTo(User, {
    foreignKey:'user_id',
});

Comment.belongsTo(Blog, {
    foreignKey:'blog_id',
});



module.exports = { User, Blog, Comment };