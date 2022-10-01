const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.get('/tags', async (req, res) => {
    const tags = await getAllTags(); 

    res.send({
        tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    
    try{
        const allPosts = await getPostsByTagName(req.params.tagName)

        const posts = allPosts.filter(post => {
            return post.active || (req.user && post.author.id === req.user.id);
        });

        res.send({posts})
    }catch ({name, message}){
        next({name, message})
    }
});

module.exports = tagsRouter;