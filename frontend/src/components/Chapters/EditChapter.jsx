import React, { useEffect, useState } from "react";
import { updateChapter } from "@services/chapterService";
import { showSuccess, showError } from "@utils/toast";

const EditChapter = ({ chapterData, onClose, onUpdate, isOpen }) => {

    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        image: "",
        isMids: false,
    });

    const [loading, setLoading] = useState(false);
    const [hasNewImage, setHasNewImage] = useState(false);

    // Pre-fill form with old data
    useEffect(() => {
        if (chapterData) {
            setFormData({
                name: chapterData.name || "",
                image: chapterData.image || "",
                imageUrl: chapterData.image || "",
                isMids: chapterData.isMids || false
            });
            setHasNewImage(false);
        }
    }, [chapterData]);

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
            setFormData((prev) => ({ ...prev, imageUrl }));
            setFormData((prev) => ({ ...prev, image: file }));
            setHasNewImage(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let payload;
            const isMidsValue = formData.isMids === "true" || formData.isMids === true;

            // Check what fields have changed
            const hasNameChanged = formData.name !== chapterData.name;
            const hasIsMidsChanged = isMidsValue !== chapterData.isMids;

            // If user uploaded a new image, send as FormData
            if (hasNewImage && formData.image instanceof File) {
                const fd = new FormData();

                // Only append changed fields
                if (hasNameChanged) {
                    fd.append("name", formData.name);
                }
                if (hasIsMidsChanged) {
                    fd.append("isMids", isMidsValue);
                }
                fd.append("image", formData.image);

                payload = fd;
            } else {
                // Build JSON payload with only changed fields
                payload = {};

                if (hasNameChanged) {
                    payload.name = formData.name;
                }
                if (hasIsMidsChanged) {
                    payload.isMids = isMidsValue;
                }

                // If no fields changed, don't send the request
                if (Object.keys(payload).length === 0) {
                    showError("No changes detected");
                    setLoading(false);
                    return;
                }
            }

            const res = await updateChapter(chapterData._id, payload);
            if (res.success) {
                onUpdate(res.data.chapter); // update parent state
                showSuccess("Chapter updated successfully!");
                onClose(); // close modal
            } else {
                showError("Failed to update chapter!");
            }
        } catch (error) {
            showError("Failed to update chapter!");
            console.error("Update failed", error);
        } finally {
            setLoading(false);
        }
    }

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
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Edit Chapter
                </h3>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* chapter Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Chapter Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Chapter Name"
                            className="input input-bordered w-full rounded-lg"
                        />
                    </div>

                    {/* Image Preview + Update */}
                    <div className="flex gap-3">
                        {formData.image ? (
                            <div className="relative w-full object-contain h-40 rounded-lg overflow-hidden group">
                                <img
                                    src={formData.imageUrl}
                                    alt="Chapter Preview"
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
                            <label className="w-full h-32 cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-sm text-gray-600 hover:border-gray-400 transition-colors">
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

                    {/* Mids/Finals Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Chapter Type
                        </label>
                        <select
                            name="isMids"
                            value={formData.isMids}
                            onChange={handleChange}
                            className="select select-bordered w-full rounded-lg"
                        >
                            <option value={true}>Mids</option>
                            <option value={false}>Finals</option>
                        </select>
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
                            {loading ? (
                                <span className="loading loading-dots loading-sm text-white px-3"></span>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditChapter;
