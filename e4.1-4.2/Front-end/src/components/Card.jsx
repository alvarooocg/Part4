import LikesIcon from '../assets/like_icon.svg'
import LinkIcon from '../assets/link_icon.svg'

const Card = ({ Blog, onLike }) => 
    <div className="container__card">
        <h3 className="card__title">{Blog.title}</h3>
        <p className="card__author">By {Blog.author}</p>
        <div className="card__div"></div>
        <div className="card__bottom">
            <button className="card__likes" onClick={() => {
                onLike(Blog.id)
                console.log("LIKE");
            }}>
                <img className="likes__icon" src={LikesIcon}/>
                <p className="likes__number">{Blog.likes}</p>
            </button>
            <div className="card__link">
                <a className="link__button" href={Blog.url} target='_blank'>Visit <img className="link__icon" src={LinkIcon}/></a>
            </div>
        </div>
    </div>

export default Card