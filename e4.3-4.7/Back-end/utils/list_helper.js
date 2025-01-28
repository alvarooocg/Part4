const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, blog) => acc.likes > blog.likes ? acc : blog, blogs[0])
}

const mostBlogs = (blogs) => {
    const author = {
        name: '',
        blogs: 0
    }

    let authors = []

    blogs.forEach(e => {
        if(!authors.find(a => a.author === e.author)) {
            authors.push({author: e.author, blogs: 1})
        }else {
            authors.find(a => a.author === e.author).blogs++
        }
    });

    return authors.reduce((acc, author) => acc.blogs > author.blogs ? acc : author, authors[0])
}

const mostLikes = (blogs) => {
    const author = {
        name: '',
        likes: 0
    }

    let authors = []

    blogs.forEach(e => {
        if(!authors.find(a => a.author === e.author)) {
            authors.push({author: e.author, likes: e.likes})
        }else {
            authors.find(a => a.author === e.author).likes += e.likes
        }
    });

    return authors.reduce((acc, author) => acc.likes > author.likes ? acc : author, authors[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}