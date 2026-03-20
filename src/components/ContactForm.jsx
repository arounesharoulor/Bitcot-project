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
    <form onSubmit={handleSubmit} className="light-form flex flex-col gap-6">
      <div className="form-group">
        <label className="text-gray-700 font-medium mb-2">Name:</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Aaron"
          className={`form-control-light ${errors.name ? 'border-red-500' : ''}`}
          value={data.name} 
          onChange={handleChange} 
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label className="text-gray-700 font-medium mb-2">Email:</label>
        <input 
          type="email" 
          name="email" 
          placeholder="your@email.com"
          className={`form-control-light ${errors.email ? 'border-red-500' : ''}`}
          value={data.email} 
          onChange={handleChange} 
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label className="text-gray-700 font-medium mb-2">PhoneNumber:</label>
        <input 
          type="text" 
          name="mobile" 
          placeholder="5785664545"
          className={`form-control-light ${errors.mobile ? 'border-red-500' : ''}`}
          value={data.mobile} 
          onChange={handleChange} 
        />
        {errors.mobile && <p className="error-message">{errors.mobile}</p>}
      </div>

      <div className="form-group">
        <label className="text-gray-700 font-medium mb-2">Address:</label>
        <textarea 
          name="address" 
          placeholder="Enter your Address"
          rows="3"
          className={`form-control-light ${errors.address ? 'border-red-500' : ''}`}
          value={data.address} 
          onChange={handleChange} 
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
      </div>

      <div className="flex gap-4 mt-8">
        <button type="submit" className="btn btn-primary-alt flex-1 h-12">
          {initialData ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary-alt flex-1 h-12">
          Reset
        </button>
      </div>

      <style>{`
        .form-control-light {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
          color: #333;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .form-control-light:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .text-gray-700 { color: #4b5563; font-size: 0.85rem; }
        .btn-primary-alt {
          background: #3b82f6;
          color: white;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .btn-primary-alt:hover {
          background: #2563eb;
        }
        .btn-secondary-alt {
          background: #1f2937;
          color: white;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .btn-secondary-alt:hover {
          background: #111827;
        }
        .error-message {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
