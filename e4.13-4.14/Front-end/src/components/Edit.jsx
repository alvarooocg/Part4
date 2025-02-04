import CloseIcon from '../assets/close_icon.svg'

const Edit = ({ newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, newLikes, handleLikesChange, editBlog, showEditDisplay, toShowEditDisplay }) => {
    if (toShowEditDisplay === true) {
        return (
            <div className="edit__container">
                    <div className="edit__display">
                    <div className="edit__header">
                        <h2 className="edit__title">Edit blog</h2>
                        <button className="edit__btnClose" onClick={() => showEditDisplay()}><img className="edit__close" src={CloseIcon} /></button>
                    </div>

                    <form className="edit__form">
                        <div className="form__div">
                            <p className="form__paragraph">Title</p>
                            <input type="text" className="form__input" required
                                    placeholder='Insert the title...'
                                    value={newTitle}
                                    onChange={handleTitleChange} />
                        </div>
                        <div className="form__div">
                            <p className="form__paragraph">Author</p>
                            <input type="text" className="form__input" 
                                    placeholder='Insert the author...'
                                    value={newAuthor}
                                    onChange={handleAuthorChange} />
                        </div>
                        <div className="form__div">
                            <p className="form__paragraph">URL</p>
                            <input type="url" className="form__input"
                                    placeholder='Insert the url...'
                                    value={newUrl}
                                    onChange={handleUrlChange} />
                        </div>
                        <div className="form__div">
                            <p className="form__paragraph">Likes</p>
                            <input  type="number" className="form__input" min="0"
                                    placeholder='Insert the number of likes...'
                                    value={newLikes}
                                    onChange={handleLikesChange} />
                        </div>

                        <div className="form__buttons">
                            <button className="buttons__submit" type="submit" onClick={() => editBlog()}>Edit this Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else if(toShowEditDisplay === true) {
        return null
    }
}

export default Edit