import Card from "./Card"

const Container = ({ Blogs, onLike }) => 
    <div className="container">
        {Blogs ? Blogs.map(blog => 
            <Card Blog={blog} onLike={onLike} />
        ) : null}
    </div>

export default Container