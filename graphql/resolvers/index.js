// const postsResolvers = require('./posts')
// const commentResolvers = require('./comment')

const usersResolvers = require('./user');
const postResolvers = require('./post');
const commentResolvers = require('./comment');


module.exports = [usersResolvers, postResolvers, commentResolvers];
