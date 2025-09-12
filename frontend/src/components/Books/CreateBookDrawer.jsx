import React, { useRef, useState } from "react";
import { createBook } from "../../api/services/bookService";
import { showError, showSuccess } from "../../utils/toast";

const CreateBookDrawer = ({ isOpen, onClose, getAllBooks }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      showError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("image", file);

    try {
      const creation = await createBook(formData);
      if (creation.success) {
        showSuccess("Created Book successfully");
        getAllBooks();
        onClose();
      }
    } catch (err) {
      console.error("Error creating book:", err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-96 bg-base-100 shadow-lg z-50 transform transition-all duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
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
        <h2 className="text-2xl font-bold">Create Book</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Book Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Book Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter book name"
              className="w-full border border-[#d9d9e2] h-9 rounded-md px-2 placeholder:text-sm focus:outline-2 focus:outline-black/20 mt-2"
            />
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Book Cover Image
              </span>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />

            {/* Clickable Upload Area */}
            <div
              onClick={handleImageClick}
              className="w-full aspect-video border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center text-sm text-gray-500 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition mt-2"
            >
              {selectedImage
                ? "Click to change image"
                : "Click to select a cover image"}
            </div>

            {/* Preview */}
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

          {/* Buttons */}
          <button
            type="submit"
            className="py-2 text-white bg-dark-blue/90 hover:bg-dark-blue duration-200 w-full rounded-full text-sm"
          >
            Create Book
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
  );
};

export default CreateBookDrawer;
