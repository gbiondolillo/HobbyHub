import React, { useState } from 'react';
import mockApi from '../../api/mockApi';
import './PostForm.css';

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation to ensure title and content are not empty
        if (!title.trim() || !content.trim()) {
            alert('Both title and content are required.');
            return;
        }

        console.log('Creating post:', title, content);

        try {
            const newPost = await mockApi.createPost({ title, content, imageUrl: '' }); // No image URL provided
            console.log('New post created:', newPost);
            // Reset form fields after successful post creation
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create post');
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="post-form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                    id="content"
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Enter post content"
                    className="post-form-input"
                />
            </div>
            <button type="submit" className="post-form-button">Submit</button>
        </form>
    );
}

export default PostForm;