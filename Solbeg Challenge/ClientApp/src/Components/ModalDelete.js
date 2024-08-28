import React from 'react';

const ModalDelete = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>{message}</h4>
                <div className="modal-buttons">
                    <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
                    <button className="btn btn-secondary" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;