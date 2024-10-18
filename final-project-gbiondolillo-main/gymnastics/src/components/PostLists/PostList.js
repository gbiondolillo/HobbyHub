import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList({ posts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('createdAt'); // default sorting by created time

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortKey(event.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedPosts = useMemo(() => {
        return filteredPosts.sort((a, b) => {
            if (sortKey === 'upvotes') {
                return b.upvotes - a.upvotes; // descending order for upvotes
            }
            return new Date(b.createdAt) - new Date(a.createdAt); // default to sorting by createdAt in descending order
        });
    }, [filteredPosts, sortKey]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select onChange={handleSortChange} value={sortKey}>
                <option value="createdAt">Sort by Date</option>
                <option value="upvotes">Sort by Upvotes</option>
            </select>
            <div className="post-list">
                {sortedPosts.length > 0 ? (
                    sortedPosts.map((post, index) => (
                        <div key={index} className="post-item">
                            <Link to={`/post/${post.id}`} className="post-link">
                                <h3>{post.title}</h3>
                            </Link>
                            <p>{post.content}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                            <p className="post-meta">Upvotes: {post.upvotes}</p>
                            {post.comments && post.comments.length > 0 && (
                                <div>
                                    <h4>Comments:</h4>
                                    {post.comments.map((comment, index) => (
                                        <p key={index}><b>{comment.user}:</b> {comment.text}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <h3>No posts found</h3>
                )}
            </div>
        </div>
    );
}

export default PostList;