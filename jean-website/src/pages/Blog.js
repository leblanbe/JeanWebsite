import React, { useState } from 'react'; 
import Navbar from '../components/Navbar';
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
    link: 'https://example.com/shakespeare-article'
  },
  {
    id: 2,
    type: 'Book',
    author: 'William Smith',
    date: '2021-07-15',
    title: 'Hamlet: A Critical Analysis',
    summary: 'A detailed study of Hamlet’s themes, character development, and influence on modern literature.',
    link: 'https://example.com/hamlet-book'
  }
];

function Blog({ loggedInUser }) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    type: '',
    title: '',
    summary: '',
    link: '',
    author: '',
    date: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  };

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
      link: newArticle.link
    };
    setArticles([articleToAdd, ...articles]);
    setShowCreateForm(false);
    setNewArticle({ type: '', title: '', summary: '', link: '', author: '', date: '' });
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  return (
    <>
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
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)}>
            <option value="">All Authors</option>
            {uniqueAuthors.map(author => <option key={author} value={author}>{author}</option>)}
          </select>
          <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <option value="">All Dates</option>
            {uniqueDates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
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
            <p className="article-summary">{article.summary}</p>
            {article.link && (
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-blog">
                Read More
              </a>
            )}
            {/* Delete Review Button */}
            {loggedInUser && (
              <button 
                className="btn-blog delete-btn" 
                onClick={() => handleDeleteArticle(article.id)}
                style={{ marginTop: '10px', backgroundColor: '#70ab7d' }}
              >
                Delete Review
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Blog;
