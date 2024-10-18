import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockApi from '../../api/mockApi'; // Adjust this to your API handling functions
import './PostPage.css';

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            try {
                const data = await mockApi.getPost(id);
                setPost(data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch post');
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpvote = async () => {
        try {
            await mockApi.upvotePost(id);
            setPost(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
        } catch (err) {
            setError('Failed to upvote post');
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (!newComment.trim()) return;
        try {
            const comment = { id: Date.now(), text: newComment, user: "Anonymous" };
            await mockApi.addComment(id, comment);
            setPost(prev => ({
                ...prev,
                comments: [...prev.comments, comment]
            }));
            setNewComment('');
        } catch (err) {
            setError('Failed to add comment');
        }
    };

    const handleEdit = () => {
        setEditedPost(post);
        setIsEditing(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await mockApi.updatePost(id, editedPost);
            setPost(editedPost);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update post');
        }
    };

    const handleDelete = async () => {
        try {
            await mockApi.deletePost(id);
            navigate('/'); // Redirect to home after successful deletion
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>No post found!</p>;
    }

    return (
        <div className="post-page">
            <h1>{post.title}</h1>
            <p className="post-meta">Created at: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="post-content">
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <textarea value={editedPost.content} onChange={e => setEditedPost({...editedPost, content: e.target.value})} />
                        <button type="submit">Update Post</button>
                    </form>
                ) : (
                    <>
                        <p>{post.content}</p>
                        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                    </>
                )}
            <div className="post-actions">
                <button className="upvote" onClick={handleUpvote}>Upvote ({post.upvotes})</button>
                <button className="edit" onClick={handleEdit}>Edit Post</button>
                <button className="delete" onClick={handleDelete}>Delete Post</button>
            </div>
            </div>
            <div className="comments-section">
                <h4>Comments:</h4>
                {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p><b>{comment.user}:</b> {comment.text}</p>
                    </div>
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    );
}

export default PostPage;
