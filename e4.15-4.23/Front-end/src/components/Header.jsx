import addIcon from '../assets/add_icon.svg'
import editIcon from '../assets/edit_icon.svg'

const Header = ({ showAddDisplay, showEditDisplay }) => 
    <header className="header">
        <h1 className="header__title">BlogShare</h1>
        <div className="header__wrapper">
            <button className="header__addBtn" onClick={() => showAddDisplay()}><img className="addBtn__icon" src={addIcon} />Add blog</button>
            <button className="header__editBtn" onClick={() => showEditDisplay()}><img className="editBtn__icon" src={editIcon} />Edit blog</button>
        </div>
    </header>

export default Header