import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="btn-icon-close">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .modal-content {
          background: #ffffff;
          width: 100%;
          max-width: 320px;
          max-height: calc(100vh - 3rem);
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: #333;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
        }

        @keyframes slideIn {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .modal-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          color: white;
          flex-shrink: 0;
        }

        .modal-header h2 {
           color: white;
           font-weight: 700;
           font-size: 1.1rem;
           letter-spacing: -0.01em;
        }

        .modal-body {
          padding: 1.25rem;
          overflow-y: auto;
          flex: 1;
          background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 246, 1) 100%);
        }

        .btn-icon-close {
           color: rgba(255, 255, 255, 0.8);
           padding: 0.25rem;
           border-radius: 8px;
           transition: all 0.2s;
        }
        .btn-icon-close:hover {
           background: rgba(255, 255, 255, 0.2);
           color: white;
        }
      `}</style>
    </div>
  );
};

export default Modal;
