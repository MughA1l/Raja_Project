import React, { useState, useEffect } from "react";
import { updateBook } from "../../api/services/bookService";
import { showSuccess } from "../../utils/toast";

const EditBook = ({ bookData, onClose, onUpdate, isOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        imageUrl: ""
    });

    const [loading, setLoading] = useState(false);

    // Pre-fill form with old data
    useEffect(() => {
        if (bookData) {
            setFormData({
                name: bookData.name || "",
                image: bookData.image || "",
                imageUrl: bookData.image || ""
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
            setFormData((prev) => ({ ...prev, imageUrl }))
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    // Save changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let fd = new FormData();

        fd.append('name', formData.name);

        if (formData.image instanceof File) {
            fd.append('image', formData.image)
        }

        try {
            const res = await updateBook(bookData._id, fd);
            onUpdate(res.data.data); // update parent state
            showSuccess('Update Book!')
            onClose(); // close modal
        } catch (error) {
            showSuccess('Failed to Update Book!')
            console.error("Update failed", error);
        }
        finally {
            setLoading(false);
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
                                    src={formData.imageUrl}
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
                            {
                                loading ? <span className="loading loading-dots loading-sm text-white px-3"></span> : "Update"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
