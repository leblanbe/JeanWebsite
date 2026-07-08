import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Blog.css';
import '../App.css';

function BlogPost() {
  const { id } = useParams();
  const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
  const article = storedArticles.find((item) => String(item.id) === String(id));

  if (!article) {
    return (
      <section className="blog-post-page">
        <h1 className="h1-medium">Post not found</h1>
        <p className="text-small">The requested blog post could not be found.</p>
        <Link to="/blog" className="btn-blog">Back to blog</Link>
      </section>
    );
  }

  return (
    <section className="blog-post-page">
      <div className="blog-post-card">
        <p className="article-meta">
          {article.type} | {article.author} | {article.date}
        </p>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-summary blog-post-content">{article.summary}</p>
        {article.link && (
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-blog">
            Open original link
          </a>
        )}
        {article.attachments && article.attachments.length > 0 && (
          <div className="blog-attachments">
            <h3 className="article-title">Attachments</h3>
            {article.attachments.map((attachment, index) => (
              <a key={`${attachment}-${index}`} href={attachment} target="_blank" rel="noopener noreferrer" className="btn-blog">
                Video {index + 1}
              </a>
            ))}
          </div>
        )}
        <Link to="/blog" className="btn-blog">
          Back to blog
        </Link>
      </div>
    </section>
  );
}

export default BlogPost;
