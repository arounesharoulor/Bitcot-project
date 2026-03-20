import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Trash2, Edit2, UserCircle2 } from 'lucide-react';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import './index.css';

const API_URL = 'https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        // Since the API data doesn't have "address", we'll default it
        const enrichedData = data.map(c => ({
          ...c,
          address: c.address || 'No address provided'
        }));
        setContacts(enrichedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Handle Search
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const result = contacts.filter(contact => 
      contact.name?.toLowerCase().includes(lowerCaseQuery) ||
      contact.mobile?.toLowerCase().includes(lowerCaseQuery) ||
      contact.email?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredContacts(result);
  }, [searchQuery, contacts]);

  // Actions
  const handleAddSubmit = (newContact) => {
    const id = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const contactToAdd = { ...newContact, id };
    setContacts(prev => [...prev, contactToAdd]);
    setIsAddOpen(false);
  };

  const handleEditSubmit = (updatedContact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
    setIsEditOpen(false);
    setSelectedContact(null);
  };

  const handleDelete = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setIsViewOpen(true);
  };

  return (
    <div className="container animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 glass p-6 rounded-[--radius-lg]">
        <h1 className="text-3xl font-bold gradient-text">All Contacts</h1>
        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary rounded-full w-10 h-10 p-0 flex items-center justify-center">
          <Plus size={24} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search Contact"
          className="form-control pl-10 h-12 bg-white/5 border-white/10 glass rounded-xl focus:bg-white/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading contacts...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : filteredContacts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No contacts found.</p>
        ) : (
          filteredContacts.map((contact, index) => (
            <div key={contact.id} className="flex items-center justify-between glass p-4 rounded-xl hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                <UserCircle2 size={40} className="text-indigo-400" />
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-sm text-gray-400 font-medium">{contact.mobile}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => openViewModal(contact)} className="btn-icon" title="View">
                  <Eye size={20} />
                </button>
                <button onClick={() => handleDelete(contact.id)} className="btn-icon btn-danger-icon" title="Delete">
                  <Trash2 size={20} />
                </button>
                <button onClick={() => openEditModal(contact)} className="btn-icon" title="Edit">
                  <Edit2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Contact">
        <ContactForm onSubmit={handleAddSubmit} onCancel={() => setIsAddOpen(false)} />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Contact">
        <ContactForm 
          initialData={selectedContact} 
          onSubmit={handleEditSubmit} 
          onCancel={() => setIsEditOpen(false)} 
        />
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Contact Details">
        {selectedContact && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col items-center mb-4">
              <UserCircle2 size={80} className="text-indigo-400 mb-2" />
              <h3 className="text-2xl font-bold">{selectedContact.name}</h3>
              <p className="text-gray-400">{selectedContact.email}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Mobile</p>
                <p className="text-lg font-medium">{selectedContact.mobile}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">ID</p>
                <p className="text-lg font-medium">#{selectedContact.id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                <p className="text-lg font-medium">{selectedContact.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
               <button onClick={() => setIsViewOpen(false)} className="btn glass flex-1 justify-center">Close</button>
               <button onClick={() => { setIsViewOpen(false); openEditModal(selectedContact); }} className="btn btn-primary flex-1 justify-center">Edit Info</button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

export default App;
