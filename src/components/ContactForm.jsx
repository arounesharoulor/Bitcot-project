import React, { useState, useEffect } from 'react';

const ContactForm = ({ initialData, onSubmit, onCancel }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // Clear error when user changes value
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!data.mobile.trim()) {
      newErrors.mobile = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(data.mobile.trim())) {
      newErrors.mobile = 'Phone number must be 10-15 digits';
    }
    if (!data.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(data);
    }
  };

  const handleReset = () => {
    setData({
      name: '',
      email: '',
      mobile: '',
      address: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="form-group mb-0">
        <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1 ml-1">Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="e.g. Aaron"
          className={`form-control-compact ${errors.name ? 'border-red-500' : ''}`}
          value={data.name} 
          onChange={handleChange} 
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group mb-0">
        <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1 ml-1">Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="name@example.com"
          className={`form-control-compact ${errors.email ? 'border-red-500' : ''}`}
          value={data.email} 
          onChange={handleChange} 
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group mb-0">
        <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1 ml-1">Phone</label>
        <input 
          type="text" 
          name="mobile" 
          placeholder="5785664545"
          className={`form-control-compact ${errors.mobile ? 'border-red-500' : ''}`}
          value={data.mobile} 
          onChange={handleChange} 
        />
        {errors.mobile && <p className="error-message">{errors.mobile}</p>}
      </div>

      <div className="form-group mb-0">
        <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1 ml-1">Address</label>
        <textarea 
          name="address" 
          placeholder="Full address here..."
          rows="2"
          className={`form-control-compact ${errors.address ? 'border-red-500' : ''}`}
          value={data.address} 
          onChange={handleChange} 
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
      </div>

      <div className="flex gap-3 mt-4">
        <button type="submit" className="btn-vibrant-primary flex-1">
          {initialData ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={handleReset} className="btn-vibrant-secondary px-4">
          Reset
        </button>
      </div>

      <style>{`
        .form-control-compact {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          color: #1f2937;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .form-control-compact:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .btn-vibrant-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 0.6rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          transition: all 0.2s;
        }
        .btn-vibrant-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
        }
        .btn-vibrant-secondary {
          background: #f3f4f6;
          color: #4b5563;
          padding: 0.6rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .btn-vibrant-secondary:hover {
          background: #e5e7eb;
          color: #1f2937;
        }
        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.2rem;
          margin-left: 0.25rem;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
