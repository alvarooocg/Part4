import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import Container from './components/Container'
import Add from './components/Add'
import Edit from './components/Edit'
import Footer from './components/Footer'

import blogServices from './services/blogs'

function App() {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [toShowAddDisplay, setToShowAddDisplay] = useState(false)
  const [toShowEditDisplay, setToShowEditDisplay] = useState(false)

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
    if (toShowAddDisplay === true) {
      setToShowAddDisplay(false)
    } else {
      setToShowAddDisplay(true)
    }
  }

  const addBlog = () => {
    if (newTitle === '' || newAuthor === '' || newUrl === '') {
      alert('Please fill all the fields for the new blog...')
    } else {
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

      showAddDisplay()
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
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

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
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
      .then(() => {
        setBlogs(blogs.filter(b => b.id != blogId))
      })
      .catch(err => next(err))
  }

  const showEditDisplay = () => {
    if (toShowEditDisplay === true) {
      setToShowEditDisplay(false)
    } else {
      setToShowEditDisplay(true)
    }
  }

  const editBlog = () => {
    const blogEdited = blogs.find(b => b.title === newTitle)
    if(newTitle === ''){
      alert('Please fill the title info of the blog')
    }else if(newAuthor === '' && newUrl === '' && newLikes === ''){
      alert('Please fill at least one field for the new info of the blog')
    }else if(!blogEdited){
      alert('Please enter an existing blog')
    }else{
      const blogObject = {...blogEdited, author: newAuthor ? newAuthor : blogEdited.author, url: newUrl ? newUrl : blogEdited.url, likes: newLikes ? newLikes : blogEdited.likes}

      blogServices
        .update(blogObject.id, blogObject)
        .then(updatedBlog => {
          setBlogs(blogs.map(b => b.id !== blogObject.id ? b : updatedBlog))
        })
        .catch(err => 
          console.log("ERROR => " + err)
        )

      showEditDisplay()
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNewLikes('')
    }
  }

  return (
    <div className='html'>
      <Header showAddDisplay={showAddDisplay} showEditDisplay={showEditDisplay} />
      <Add newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange} addBlog={addBlog} showAddDisplay={showAddDisplay} toShowAddDisplay={toShowAddDisplay} />
      <Edit newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange} newLikes={newLikes} handleLikesChange={handleLikesChange} editBlog={editBlog} showEditDisplay={showEditDisplay} toShowEditDisplay={toShowEditDisplay} />
      <Container Blogs={blogs} onLike={handleLike} onDelete={handleDelete} />
      <Footer />
    </div>
  )
}

export default App