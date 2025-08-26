import React, { useRef, useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { getAllBooksByUser } from '../../api/services/bookService'
import { showSuccess } from '../../utils/toast'
import { createChapter } from '../../api/services/chapterService'

const CreateChapterDrawer = ({ isOpen, onClose }) => {
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [examType, setExamType] = useState('')
    const [chapterImages, setChapterImages] = useState([])

    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState('')


    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(URL.createObjectURL(file))
        }
    }

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const handleMultipleImageSelect = (e) => {
        const files = Array.from(e.target.files)

        const imageObjects = files.map((file) => ({
            id: Date.now() + Math.random(), // simple unique ID
            url: URL.createObjectURL(file),
            file,
        }))

        setChapterImages((prev) => [...prev, ...imageObjects])
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)

        const imageObjects = files
            .filter((file) => file.type.startsWith('image/'))
            .map((file) => ({
                id: Date.now() + Math.random(),
                url: URL.createObjectURL(file),
                file,
            }))

        setChapterImages((prev) => [...prev, ...imageObjects])
    }

    const handleRemoveImage = (id) => {
        setChapterImages((prev) => prev.filter((img) => img.id !== id))
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("bookId", selectedBookId)
        formData.append('name', e.target.name.value);
        formData.append("image", fileInputRef.current.files[0])
        formData.append("isMids", examType === "Mids")
        chapterImages.forEach((img) => {
            formData.append("images", img.file) // multiple images
        })

        try {
            const res = await createChapter(formData)
            if (res.success) {
                showSuccess("Chapter created successfully");
            }

        } catch (error) {
            console.error("Error creating chapter:", error)
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooksByUser();
                if (data.success) {
                    setBooks(data.data);
                }
            } catch (err) {
                console.error("Error fetching books:", err);
            }
        };

        if (isOpen) {
            fetchBooks();
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed top-0 right-0 h-screen w-96 bg-base-100 shadow-lg z-50 transform duration-500 transition-all ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-40 z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer Content */}
            <div className="p-6 space-y-4 z-50 relative h-full overflow-y-auto">
                <h2 className="text-2xl font-bold">Create Chapter</h2>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Chapter Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Chapter Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter chapter name"
                            className="w-full border border-[#d9d9e2] h-9 rounded-md px-2 placeholder:text-sm focus:outline-2 focus:outline-black/20 mt-2"
                        />
                    </div>

                    {/* Single Cover Image Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Chapter Cover Image</span>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageSelect}
                        />

                        <div
                            onClick={handleImageClick}
                            className="w-full h-[120px] aspect-video border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center text-sm text-gray-500 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition mt-2"
                        >
                            {selectedImage ? 'Click to change image' : 'Click to select a chapter image'}
                        </div>

                        {selectedImage && (
                            <div className="mt-4">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="w-full h-auto max-h-52 object-contain rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Select Book */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Select Book</span>
                        </label>
                        <select
                            className="select select-bordered w-full mt-2"
                            required
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                        >
                            <option value="" disabled>Select a book</option>
                            {books.map((book) => (
                                <option key={book._id} value={book._id}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Exam Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Exam Type</span>
                        </label>
                        <select
                            className="select select-bordered w-full mt-2"
                            required
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                        >
                            <option value="" disabled>Select exam type</option>
                            <option value="Mids">Mids</option>
                            <option value="Finals">Finals</option>
                        </select>
                    </div>

                    {/* Multiple Images Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Add Images to Chapter</span>
                        </label>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="w-full min-h-[150px] border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center text-sm text-gray-500 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition mt-2"
                            onClick={() => document.getElementById('multi-image-input').click()}
                        >
                            Drag and drop or click to select multiple images
                            <input
                                id="multi-image-input"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleMultipleImageSelect}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* Image Previews */}
                        {chapterImages.length > 0 && (
                            <div className="mt-4 space-y-2 max-h-52 overflow-y-auto pr-2">
                                {chapterImages.map((img) => (
                                    <div
                                        key={img.id}
                                        className="flex items-center justify-between border border-black/10 gap-4 bg-white/50 p-1 pr-3 rounded-md"
                                    >
                                        <img
                                            src={img.url}
                                            alt="Chapter Img"
                                            className="w-14 h-14 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(img.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <button
                        type="submit"
                        className="py-2 text-white bg-dark-blue/90 hover:bg-dark-blue duration-200 w-full rounded-full text-sm"
                    >
                        Create Chapter
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="hover:bg-black/8 bg-black/5 py-2 w-full rounded-full text-sm"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateChapterDrawer
