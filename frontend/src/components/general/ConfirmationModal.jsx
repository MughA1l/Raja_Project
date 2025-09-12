import React from "react";

const ConfirmationModal = ({
  isOpen,
  title,
  para,
  onCancel,
  onConfirm,
}) => {
  return (
    <dialog
      className={`modal h-screen ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box bg-white rounded-xl shadow-lg">
        {/* Heading */}
        <h3 className="font-bold text-lg text-gray-800">
          {title || "Are you sure?"}
        </h3>

        {/* Paragraph */}
        <p className="py-3 text-gray-600 text-sm">
          {para ||
            "This action cannot be undone. Please confirm your choice."}
        </p>

        {/* Buttons */}
        <div className="modal-action">
          <button
            className="btn px-5 py-3 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn px-5 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
