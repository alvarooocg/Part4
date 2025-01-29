import addIcon from '../assets/add_icon.svg'

const Header = ({ showAddDisplay }) => 
    <header className="header">
        <h1 className="header__title">BlogShare</h1>
        <button className="header__addBtn" onClick={() => showAddDisplay()}><img className="addBtn__icon" src={addIcon} />Add blog</button>
    </header>

export default Header