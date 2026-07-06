import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Oxford1 from '../assets/oxford_photo1.jpg';
import Oxford2 from '../assets/oxford_photo3.jpg';
import './Gallery.css';
import '../App.css';

// Example initial categories
const initialCategories = [
  {
    id: 1,
    name: 'Plays',
    images: [
      {
        src: Oxford2,
        description: 'A stage and performance scene from a play production.',
      },
    ],
  },
  {
    id: 2,
    name: 'Oxford',
    images: [
      {
        src: Oxford1,
        description: 'A sweeping view of Oxford architecture and streets.',
      },
    ],
  },
];

const STORAGE_KEY = 'galleryCategories';

const normalizeImage = (image) => {
  if (typeof image === 'string') {
    return {
      src: image,
      description: '',
    };
  }

  return {
    src: image?.src || '',
    description: image?.description || '',
  };
};

const normalizeCategories = (categories) =>
  categories.map((category) => ({
    ...category,
    images: (category.images || []).map(normalizeImage),
  }));

const getStoredCategories = () => {
  if (typeof window === 'undefined') {
    return initialCategories;
  }

  const storedCategories = localStorage.getItem(STORAGE_KEY);
  if (!storedCategories) {
    return initialCategories;
  }

  try {
    const parsedCategories = JSON.parse(storedCategories);
    return Array.isArray(parsedCategories) && parsedCategories.length > 0
      ? normalizeCategories(parsedCategories)
      : initialCategories;
  } catch (error) {
    console.error('Failed to load gallery categories', error);
    return initialCategories;
  }
};

function Gallery({ loggedInUser }) {
  const [categories, setCategories] = useState(getStoredCategories);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingDescription, setEditingDescription] = useState(null);
  const [descriptionDraft, setDescriptionDraft] = useState('');
  const [showImageManager, setShowImageManager] = useState(null);
  const [newImageDescription, setNewImageDescription] = useState('');
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Track which image is showing per category
  const [currentIndexes, setCurrentIndexes] = useState(() =>
    getStoredCategories().map(() => 0)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    setCurrentIndexes((prev) => {
      if (prev.length === categories.length) {
        return prev;
      }

      return Array.from({ length: categories.length }, (_, index) => prev[index] ?? 0);
    });
  }, [categories.length]);

  const handleNext = (catIndex) => {
    setCurrentIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[catIndex] = (newIndexes[catIndex] + 1) % categories[catIndex].images.length;
      return newIndexes;
    });
  };

  const handlePrev = (catIndex) => {
    setCurrentIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[catIndex] =
        (newIndexes[catIndex] - 1 + categories[catIndex].images.length) %
        categories[catIndex].images.length;
      return newIndexes;
    });
  };

  const handleCreateCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    const newCat = {
      id: Date.now(),
      name: trimmedName,
      images: [],
    };

    setCategories((prev) => [newCat, ...prev]);
    setCurrentIndexes((prev) => [0, ...prev]);
    setNewCategoryName('');
    setShowCreateCategory(false);
  };

  const handleDeleteCategory = (categoryId) => {
    const categoryIndex = categories.findIndex((category) => category.id === categoryId);
    if (categoryIndex === -1) return;

    setCategories((prev) => prev.filter((category) => category.id !== categoryId));
    setCurrentIndexes((prev) => prev.filter((_, index) => index !== categoryIndex));
  };

  const handleDescriptionClick = (categoryId, imageIndex, currentDescription) => {
    if (loggedInUser !== 'jean.feerick@gmail.com') return;

    setEditingDescription({ categoryId, imageIndex });
    setDescriptionDraft(currentDescription || '');
  };

  const handleSaveDescription = (categoryId, imageIndex) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id !== categoryId) return category;

        return {
          ...category,
          images: category.images.map((image, idx) =>
            idx === imageIndex ? { ...image, description: descriptionDraft.trim() } : image
          ),
        };
      })
    );

    setEditingDescription(null);
    setDescriptionDraft('');
  };

  const handleAddImage = (categoryId, imageFile) => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id !== categoryId) return category;

          return {
            ...category,
            images: [
              ...category.images,
              {
                src: reader.result,
                description: newImageDescription.trim(),
              },
            ],
          };
        })
      );

      setNewImageDescription('');
      setShowImageManager(null);
    };

    reader.readAsDataURL(imageFile);
  };

  const handleDropImage = (event, categoryId) => {
    event.preventDefault();
    setIsDraggingImage(false);

    const droppedFile = event.dataTransfer?.files?.[0];
    if (!droppedFile || !droppedFile.type.startsWith('image/')) return;

    handleAddImage(categoryId, droppedFile);
  };

  const handleImageInputChange = (event, categoryId) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return;

    handleAddImage(categoryId, selectedFile);
    event.target.value = '';
  };

  const handleRemoveImage = (categoryId, imageIndex) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id !== categoryId) return category;

        return {
          ...category,
          images: category.images.filter((_, idx) => idx !== imageIndex),
        };
      })
    );
  };

  return (
    <>
      <section className="center-text">
        <div>
          <h1 className="about-title">Gallery</h1>
          <p className="about-subtitle">
            Photography is the story I fail to put into words
          </p>
        </div>
      </section>

      <section className="gallery-page">
        {loggedInUser === 'jean.feerick@gmail.com' && (
          <div className="create-category-container">
            {showCreateCategory ? (
              <div className="create-category-form">
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={handleCreateCategory} className="btn-blog">Add Category</button>
                <button onClick={() => setShowCreateCategory(false)} className="btn-blog">Cancel</button>
              </div>
            ) : (
              <button
                className="btn-blog"
                onClick={() => setShowCreateCategory(true)}
              >
                Create Category
              </button>
            )}
          </div>
        )}

        {categories.map((category, catIndex) => {
          const currentImage = category.images[currentIndexes[catIndex]] || { src: '', description: '' };
          const isEditingCurrentDescription =
            editingDescription?.categoryId === category.id &&
            editingDescription?.imageIndex === currentIndexes[catIndex];

          return (
            <div key={category.id} className="category-section">
              <h2 className="category-title">{category.name}</h2>
              {loggedInUser === 'jean.feerick@gmail.com' && (
                <button className="btn-blog" onClick={() => handleDeleteCategory(category.id)}>
                  Delete Category
                </button>
              )}
              <div className="revolving-door">
                <button className="arrow left-arrow" onClick={() => handlePrev(catIndex)}>
                  &#8592;
                </button>
                {category.images.length > 0 ? (
                  <div className="image-display">
                    <img
                      src={currentImage.src}
                      alt={`${category.name} ${currentIndexes[catIndex] + 1}`}
                      className="category-image"
                    />
                    {loggedInUser === 'jean.feerick@gmail.com' && isEditingCurrentDescription ? (
                      <div className="description-edit">
                        <textarea
                          value={descriptionDraft}
                          onChange={(e) => setDescriptionDraft(e.target.value)}
                          placeholder="Edit description"
                        />
                        <div className="description-edit-actions">
                          <button className="btn-blog" onClick={() => handleSaveDescription(category.id, currentIndexes[catIndex])}>
                            Save
                          </button>
                          <button className="btn-blog" onClick={() => {
                            setEditingDescription(null);
                            setDescriptionDraft('');
                          }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="image-description"
                        onClick={() => handleDescriptionClick(category.id, currentIndexes[catIndex], currentImage.description)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleDescriptionClick(category.id, currentIndexes[catIndex], currentImage.description);
                          }
                        }}
                      >
                        {currentImage.description || 'No description available.'}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="no-images">No images yet</div>
                )}
                <button className="arrow right-arrow" onClick={() => handleNext(catIndex)}>
                  &#8594;
                </button>
              </div>
              {loggedInUser === 'jean.feerick@gmail.com' && (
                <div className="category-actions">
                  <button className="btn-blog small-btn" onClick={() => setShowImageManager(showImageManager === category.id ? null : category.id)}>
                    {showImageManager === category.id ? 'Hide Manager' : 'Manage Images'}
                  </button>
                  {showImageManager === category.id && (
                    <div className="image-manager">
                      <div className="image-manager-form">
                        <label
                          className={`image-drop-zone ${isDraggingImage ? 'dragging' : ''}`}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsDraggingImage(true);
                          }}
                          onDragLeave={() => setIsDraggingImage(false)}
                          onDrop={(event) => handleDropImage(event, category.id)}
                        >
                          <span>Drag and drop an image here</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageInputChange(event, category.id)}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Image description"
                          value={newImageDescription}
                          onChange={(e) => setNewImageDescription(e.target.value)}
                        />
                      </div>
                      {category.images.length > 0 && (
                        <div className="image-manager-list">
                          {category.images.map((image, imageIndex) => (
                            <div key={`${category.id}-${imageIndex}`} className="image-manager-item">
                              <span>{image.description || 'Untitled image'}</span>
                              <button className="btn-blog small-btn" onClick={() => handleRemoveImage(category.id, imageIndex)}>
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Gallery;
