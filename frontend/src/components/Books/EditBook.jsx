import React, { useState, useEffect } from "react";
import { updateBook } from "../../api/services/bookService";

const EditBook = ({ bookData, onClose, onUpdate, isOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        isCompleted: false,
    });

    // Pre-fill form with old data
    useEffect(() => {
        if (bookData) {
            setFormData({
                name: bookData.name || "",
                image: bookData.image || "",
                isCompleted: bookData.isCompleted || false,
            });
        }
    }, [bookData]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, image: imageUrl }));
        }
    };

    // Save changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateBook(bookData._id, formData);
            onUpdate(res.data.data); // update parent state
            onClose(); // close modal
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box relative rounded-2xl  shadow-lg bg-white w-[450px]">
                {/* Close button (top-right) */}
                <button
                    type="button"
                    className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-gray-200"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Edit Book</h3>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Book Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Book Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Book Name"
                            className="input input-bordered w-full rounded-lg"
                        />
                    </div>

                    {/* Image Preview + Update */}
                    <div className="flex gap-3">
                        {formData.image ? (
                            <div className="relative w-full object-contain h-40 rounded-lg overflow-hidden group">
                                <img
                                    src={formData.image}
                                    alt="Book Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />

                                {/* Hover overlay with Update button */}
                                <div className="absolute inset-0 bg-black/8 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <label className="font-medium rounded-lg px-2 py-3 text-xs bg-light-pink text-white hover:bg-light-pink cursor-pointer">
                                        Update Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <label className="w-2/3 h-32 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-600 hover:border-gray-400">
                                Select Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>


                    {/* isCompleted */}
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            name="isCompleted"
                            checked={formData.isCompleted}
                            onChange={handleChange}
                            className="checkbox checkbox-secondary"
                        />
                        <span className="text-sm">Mark as Completed</span>
                    </label>

                    {/* Action buttons */}
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn px-5 py-3 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn px-5 !py-4 rounded-xl bg-light-pink text-white font-semibold hover:opacity-90"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
