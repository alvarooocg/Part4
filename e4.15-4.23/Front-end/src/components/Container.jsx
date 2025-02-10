import Card from "./Card"

const Container = ({ Blogs, onLike, onDelete }) => 
    <div className="container">
        {Blogs ? Blogs.map(blog => 
            <Card Blog={blog} onLike={onLike} onDelete={onDelete} />
        ) : null}
    </div>

export default Container