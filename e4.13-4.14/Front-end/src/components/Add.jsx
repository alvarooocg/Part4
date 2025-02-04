import CloseIcon from '../assets/close_icon.svg'

const Add = ({ newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, addBlog, showAddDisplay, toShowAddDisplay }) => {
    if (toShowAddDisplay === true) {
        return (
            <div className="add__container">
                    <div className="add__display">
                    <div className="add__header">
                        <h2 className="add__title">Add new blog</h2>
                        <button className="add__btnClose" onClick={() => showAddDisplay()}><img className="add__close" src={CloseIcon} /></button>
                    </div>

                    <form className="add__form">
                        <div className="form__div">
                            <p className="form__paragraph">Title</p>
                            <input type="text" className="form__input" required
                                    placeholder='Insert the title...'
                                    value={newTitle}
                                    onChange={handleTitleChange} />
                        </div>
                        <div className="form__div">
                            <p className="form__paragraph">Author</p>
                            <input type="text" className="form__input" required
                                    placeholder='Insert the author...'
                                    value={newAuthor}
                                    onChange={handleAuthorChange} />
                        </div>
                        <div className="form__div">
                            <p className="form__paragraph">URL</p>
                            <input type="url" className="form__input" required
                                    placeholder='Insert the url...'
                                    value={newUrl}
                                    onChange={handleUrlChange} />
                        </div>

                        <div className="form__buttons">
                            <button className="buttons__submit" type="submit" onClick={() => addBlog()}>Save Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else if(toShowAddDisplay === true) {
        return null
    }
}

export default Add