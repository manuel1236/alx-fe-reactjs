import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();

  return (
    <div>
      <h1>Blog Post {postId}</h1>
      <p>Content for post {postId}...</p>
    </div>
  );
};

export default BlogPost;