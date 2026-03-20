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
      <div className="flex justify-between items-center mb-10 glass p-6 rounded-[--radius-lg] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-pink-500"></div>
        <div>
          <h1 className="text-4xl font-black gradient-text tracking-tight">Contacts</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Manage your network easily</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)} 
          className="btn btn-primary rounded-2xl px-6 h-12 flex items-center shadow-indigo-500/20"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="hidden sm:inline">Add New</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400">
          <Search size={20} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search contacts by name, email or phone..."
          className="form-control pl-12 h-14 bg-white/5 border-white/10 glass rounded-2xl focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-600 transition-all font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Loading your contacts...</p>
          </div>
        ) : error ? (
          <div className="text-center p-10 glass rounded-2xl border-red-500/20">
            <p className="text-red-400 font-bold mb-2">Oops! Something went wrong</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-20 glass rounded-[--radius-lg] border-dashed">
            <UserCircle2 size={48} className="mx-auto text-gray-600 mb-4 opacity-20" />
            <p className="text-gray-400 font-medium text-lg">No matching contacts found</p>
            <p className="text-sm text-gray-500 mt-1">Try a different search term or add a new one</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContacts.map((contact, index) => (
              <div 
                key={contact.id} 
                className="group flex items-center justify-between p-4 glass rounded-2xl transition-all hover:translate-x-1 hover:bg-white/[0.08] relative overflow-hidden"
              >
                {/* Dynamic accent gradient */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5 opacity-70 group-hover:opacity-100 transition-opacity" 
                  style={{ background: `linear-gradient(to bottom, hsl(${index * 137.5}, 70%, 60%), hsl(${index * 137.5 + 40}, 70%, 50%))` }}
                ></div>
                
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <UserCircle2 size={32} style={{ color: `hsl(${index * 137.5}, 70%, 75%)` }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{contact.name}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider">{contact.mobile}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[150px] sm:max-w-none">{contact.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => openViewModal(contact)} className="btn-icon hover:text-indigo-400 hover:bg-indigo-500/10" title="View Profile">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => openEditModal(contact)} className="btn-icon hover:text-emerald-400 hover:bg-emerald-500/10" title="Edit Contact">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="btn-icon hover:text-red-400 hover:bg-red-500/10" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
          <div className="flex flex-col h-full animate-fade-in">
            {/* Profile Header */}
            <div className="flex flex-col items-center py-6 mb-2">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-1 mb-4 shadow-xl">
                 <div className="w-full h-full rounded-[20px] bg-white flex items-center justify-center">
                    <UserCircle2 size={64} className="text-indigo-400 opacity-80" />
                 </div>
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">{selectedContact.name}</h3>
              <p className="text-gray-400 font-medium text-sm">{selectedContact.email}</p>
            </div>
            
            {/* Details Cards */}
            <div className="space-y-4 flex-1">
              <div className="p-4 bg-white/50 border border-gray-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Mobile Number</p>
                <p className="text-base font-bold text-gray-700">{selectedContact.mobile}</p>
              </div>
              
              <div className="p-4 bg-white/50 border border-gray-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Contact ID</p>
                <p className="text-base font-bold text-gray-700">#{selectedContact.id}</p>
              </div>

              <div className="p-4 bg-white/50 border border-gray-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Address</p>
                <p className="text-base font-bold text-gray-700 leading-relaxed">{selectedContact.address}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
               <button 
                  onClick={() => setIsViewOpen(false)} 
                  className="btn bg-gray-100 text-gray-500 hover:bg-gray-200 flex-1 justify-center rounded-xl"
               >
                 Close
               </button>
               <button 
                  onClick={() => { setIsViewOpen(false); openEditModal(selectedContact); }} 
                  className="btn btn-primary flex-1 justify-center rounded-xl"
               >
                 <Edit2 size={16} />
                 Edit Info
               </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

export default App;
