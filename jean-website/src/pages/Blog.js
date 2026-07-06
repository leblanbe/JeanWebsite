import React, { useState, useEffect } from 'react'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Blog.css';
import '../App.css';

// Initial articles
const initialArticles = [
  {
    id: 1,
    type: 'Article',
    author: 'Jean Feerick',
    date: '2023-10-01',
    title: 'Shakespeare in Modern Theatre',
    summary: 'An exploration of how Shakespeare’s plays are interpreted in contemporary performances.',
    link: 'https://example.com/shakespeare-article',
    attachments: []
  },
  {
    id: 2,
    type: 'Book',
    author: 'William Smith',
    date: '2021-07-15',
    title: 'Hamlet: A Critical Analysis',
    summary: 'A detailed study of Hamlet’s themes, character development, and influence on modern literature.',
    link: 'https://example.com/hamlet-book',
    attachments: []
  }
];

function Blog({ loggedInUser }) {
  // Load from localStorage if available
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editArticle, setEditArticle] = useState({
    type: '',
    title: '',
    summary: '',
    link: '',
    author: '',
    date: '',
    attachments: []
  });
  const [newArticle, setNewArticle] = useState({
    type: '',
    title: '',
    summary: '',
    link: '',
    author: '',
    date: '',
    attachments: []
  });
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);

  // Save to localStorage whenever articles change
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  // Filtered articles
  const filteredArticles = articles.filter(article => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === '' || article.type === filterType) &&
      (filterAuthor === '' || article.author === filterAuthor) &&
      (filterDate === '' || article.date === filterDate)
    );
  });

  const uniqueAuthors = [...new Set(articles.map(a => a.author).filter(Boolean))];
  const uniqueTypes = [...new Set(articles.map(a => a.type))];
  const uniqueDates = [...new Set(articles.map(a => a.date))];

  // Handle input change in create form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  };

  // Create a new article
  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.summary || !newArticle.type || !newArticle.author || !newArticle.date) {
      alert("Please fill in all fields: title, summary, type, author, and date.");
      return;
    }
    const articleToAdd = {
      id: articles.length + 1,
      type: newArticle.type,
      author: newArticle.author,
      date: newArticle.date,
      title: newArticle.title,
      summary: newArticle.summary,
      link: newArticle.link,
      attachments: newArticle.attachments || []
    };
    setArticles([articleToAdd, ...articles]);
    setShowCreateForm(false);
    setNewArticle({ type: '', title: '', summary: '', link: '', author: '', date: '', attachments: [] });
  };

  // Delete article
  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article.id);
    setEditArticle({
      type: article.type,
      title: article.title,
      summary: article.summary,
      link: article.link || '',
      author: article.author,
      date: article.date,
      attachments: article.attachments || []
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveArticle = (e, articleId) => {
    e.preventDefault();
    if (!editArticle.title || !editArticle.summary || !editArticle.type || !editArticle.author || !editArticle.date) {
      alert("Please fill in all fields: title, summary, type, author, and date.");
      return;
    }

    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? { ...article, ...editArticle }
          : article
      )
    );
    setEditingArticleId(null);
    setEditArticle({ type: '', title: '', summary: '', link: '', author: '', date: '', attachments: [] });
  };

  const handleAttachmentChange = (e, articleStateSetter) => {
    const value = e.target.value;
    articleStateSetter((prev) => ({ ...prev, attachments: value.split('\n').map((item) => item.trim()).filter(Boolean) }));
  };

  const handleVideoUpload = (file, articleStateSetter) => {
    if (!file || !file.type.startsWith('video/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      articleStateSetter((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), reader.result]
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleVideoDrop = (event, articleStateSetter) => {
    event.preventDefault();
    setIsDraggingVideo(false);

    const droppedFile = event.dataTransfer?.files?.[0];
    if (!droppedFile || !droppedFile.type.startsWith('video/')) return;

    handleVideoUpload(droppedFile, articleStateSetter);
  };

  const handleVideoInputChange = (event, articleStateSetter) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith('video/')) return;

    handleVideoUpload(selectedFile, articleStateSetter);
    event.target.value = '';
  };

  return (
    <>
    <section className="section-contact">
        <h1 className="contact-title">Join the Conversation</h1>
        <p className="home-body white"> Whether you're a theater professional, literary scholar, student, or simply an admirer of Shakespeare's work, I'd love to hear from you. Reach out to discuss collaborations, inquiries, or share your own insights.</p>
        <div className="home-buttons">
          <Link to="/contact" className="btn-contact">
              Contact Jean Feerick
          </Link>
        </div>
    </section>

    <section className="center-text">
        <h1 className="h1-medium">Articles & Insights</h1>
        <p className="text-small"> Explore a curated collection of scholarly articles and theatrical insights delving into the works of William Shakespeare. From character analysis to performance interpretation, discover new perspectives on the Bard's timeless legacy.</p>
    </section>
      <section className="blog-controls-fullwidth">
        {/* Create Review Button */}
        {loggedInUser === "jean.feerick@gmail.com" && (
          <button className="btn-blog" onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "Create Review"}
          </button>
        )}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar-fullwidth"
        />

        {/* Filters */}
    <div className="filters-fullwidth">
          <button onClick={() => setFilterType('')}>All</button>
          <button onClick={() => setFilterType('Article')}>Article</button>
          <button onClick={() => setFilterType('Book')}>Book</button>
          <button onClick={() => setFilterType('Film')}>Film</button>
          <button onClick={() => setFilterType('Play')}>Play</button>
          <button onClick={() => setFilterType('Video')}>Video</button>
        </div>
      </section>

      {/* Create Review Form */}
      {showCreateForm && (
        <form className="create-review-form" onSubmit={handleCreateArticle}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newArticle.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type (Article, Book, Film, Play)"
            value={newArticle.type}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newArticle.author}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newArticle.date}
            onChange={handleInputChange}
          />
          <textarea
            name="summary"
            placeholder="Summary / Review"
            value={newArticle.summary}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link (optional)"
            value={newArticle.link}
            onChange={handleInputChange}
          />
          <label
            className={`video-drop-zone ${isDraggingVideo ? 'dragging' : ''}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDraggingVideo(true);
            }}
            onDragLeave={() => setIsDraggingVideo(false)}
            onDrop={(event) => handleVideoDrop(event, setNewArticle)}
          >
            <span>Drag and drop a video here</span>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => handleVideoInputChange(event, setNewArticle)}
            />
          </label>
          {(newArticle.attachments || []).length > 0 && (
            <div className="attachment-preview-list">
              {newArticle.attachments.map((attachment, index) => (
                <span key={`${attachment}-${index}`} className="attachment-chip">Video {index + 1}</span>
              ))}
            </div>
          )}
          <button type="submit" className="btn-blog">Add Review</button>
        </form>
      )}

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-meta">
              {article.type} | {article.author} | {article.date}
            </div>
            <h2 className="article-title">{article.title}</h2>
            <Link to={`/blog/${article.id}`} className="btn-blog">
              Read More
            </Link>
            {loggedInUser === "jean.feerick@gmail.com" && (
              <>
                {editingArticleId === article.id ? (
                  <form className="create-review-form" onSubmit={(e) => handleSaveArticle(e, article.id)}>
                    <input name="title" value={editArticle.title} onChange={handleEditInputChange} placeholder="Title" />
                    <input name="type" value={editArticle.type} onChange={handleEditInputChange} placeholder="Type" />
                    <input name="author" value={editArticle.author} onChange={handleEditInputChange} placeholder="Author" />
                    <input name="date" type="date" value={editArticle.date} onChange={handleEditInputChange} />
                    <textarea name="summary" value={editArticle.summary} onChange={handleEditInputChange} placeholder="Summary / Review" />
                    <input name="link" value={editArticle.link} onChange={handleEditInputChange} placeholder="Link (optional)" />
                    <label
                      className={`video-drop-zone ${isDraggingVideo ? 'dragging' : ''}`}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setIsDraggingVideo(true);
                      }}
                      onDragLeave={() => setIsDraggingVideo(false)}
                      onDrop={(event) => handleVideoDrop(event, setEditArticle)}
                    >
                      <span>Drag and drop a video here</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(event) => handleVideoInputChange(event, setEditArticle)}
                      />
                    </label>
                    {(editArticle.attachments || []).length > 0 && (
                      <div className="attachment-preview-list">
                        {editArticle.attachments.map((attachment, index) => (
                          <span key={`${attachment}-${index}`} className="attachment-chip">Video {index + 1}</span>
                        ))}
                      </div>
                    )}
                    <div className="blog-action-row">
                      <button type="submit" className="btn-blog">Save</button>
                      <button type="button" className="btn-blog" onClick={() => setEditingArticleId(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    className="btn-blog"
                    onClick={() => handleEditClick(article)}
                    style={{ marginTop: '10px', backgroundColor: '#84ab70' }}
                  >
                    Edit Review
                  </button>
                )}
              </>
            )}
            {/* Delete Review Button */}
            {loggedInUser && (
              <button 
                className="btn-blog delete-btn" 
                onClick={() => handleDeleteArticle(article.id)}
                style={{ marginTop: '10px', backgroundColor: '#84ab70' }}
              >
                Delete Review
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Blog;
