import React from 'react';
import ReactDOM from 'react-dom';

export default function CustomAlert({
  visible,
  title = 'Alert',
  message = '',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
}) {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 mx-4 shadow-lg w-80">
        <h2 className="text-lg font-bold text-center text-black mb-3">{title}</h2>
        <p className="text-gray-700 text-md text-center mb-5">{message}</p>

        <div className="flex justify-center space-x-4">
          {onClose && (
            <button
              onClick={onClose}
              className=" px-6 py-2 btn btn-outline btn-error text-red-600  hover:bg-red-600 hover:text-white transition duration-200"
            >
              <span className="">{cancelText}</span>
            </button>
          )}

          <button
            onClick={onConfirm}
            className="px-6 py-2 btn btn-outline btn-primary transition duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
