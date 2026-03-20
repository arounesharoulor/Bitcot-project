import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="btn-icon">
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
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          transition: all 0.3s ease;
        }

        .modal-content {
          background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #fff5f8 100%);
          position: relative;
          width: 100%;
          max-width: 340px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          box-shadow: -15px 0 35px rgba(0, 0, 0, 0.08);
          animation: slideIn 0.3s ease-out;
          color: #333;
        }

        .modal-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.08), transparent 50%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.08), transparent 50%);
          pointer-events: none;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .modal-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          flex-shrink: 0;
        }

        .modal-header h2 {
           color: #666;
           font-weight: 500;
           font-size: 1.25rem;
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .btn-icon {
           color: #999;
        }
        .btn-icon:hover {
           background: #f5f5f5;
           color: #333;
        }
      `}</style>
    </div>
  );
};

export default Modal;
