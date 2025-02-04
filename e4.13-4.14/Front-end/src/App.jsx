import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import Container from './components/Container'
import Add from './components/Add'
import Footer from './components/Footer'

import blogServices from './services/blogs'

function App() {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [likes, setNewLikes] = useState(0)
  const [showDisplay, setShowDisplay] = useState(false)

  useEffect(() => {
    blogServices
      .getAll()
      .then(obtainedBlogs => {
        setBlogs(obtainedBlogs)
        console.log("blogs obtained succesfully")
      })
      .catch(error => {
        console.log('an error has ocurred', error)
      })
  }, [])

  const showAddDisplay = () => {
    if (showDisplay === true) {
      setShowDisplay(false)
    } else {
      setShowDisplay(true)
      console.log('click')
    }
  }

  const addBlog = () => {

    const BlogObject = {
      id: "" + (blogs.length + 1),
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogServices
      .create(BlogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
      })
      .catch(error => {
        console.log('an error has ocurred', error)
      })

    if (newTitle === '' || newAuthor === '' || newUrl === '') {
      alert('Please fill all the fields for the new blog...')
    } else {
      showAddDisplay()
    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLike = (blogId) => {
    const blog = blogs.find(blog => blog.id === blogId)

    const updatedLikes = blog.likes + 1
    const changedBlog = {...blog, likes: updatedLikes}

    blogServices
      .update(blogId, changedBlog)
      .then(updatedBlog => 
        setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
      )
      .catch(err => 
        console.log("ERROR => " + err)
      )

    console.log('Like added')
  }

  const handleDelete = (blogId) => {
    blogServices
      .deleteBlog(blogId)
      .then(updatedBlogs => {
        setBlogs(blogs.filter(b => b.id != blogId))
      })
      .catch(err => next(err))
  }

  return (
    <div className='html'>
      <Header showAddDisplay={showAddDisplay} />
      <Add newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange} addBlog={addBlog} showAddDisplay={showAddDisplay} showDisplay={showDisplay} />
      <Container Blogs={blogs} onLike={handleLike} onDelete={handleDelete} />
      <Footer />
    </div>
  )
}

export default App