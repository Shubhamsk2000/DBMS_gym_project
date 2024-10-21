// src/components/Members.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', membership_type: '', email: '', phone: '', start_date: '', end_date: '' });

  // Fetch all members
  const fetchMembers = async () => {
    const res = await axios.get('http://localhost:5000/api/members');
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Add new member
  const addMember = async () => {
    await axios.post('http://localhost:5000/api/members', newMember);
    fetchMembers(); 
    setNewMember({ name: '', membership_type: '', email: '', phone: '', start_date: '', end_date: '' }); // Reset fields
  };

  // Delete member
  const deleteMember = async (id) => {
    await axios.delete(`http://localhost:5000/api/members/${id}`);
    fetchMembers(); // Reload members after deleting
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className='my-4 font-bold text-3xl text-center text-gray-800'>Members</h2>

      {/* Add New Member */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded-md p-2"
            required
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <select
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setNewMember({ ...newMember, membership_type: e.target.value })}
            value={newMember.membership_type}
          >
            <option value="">Select Membership Type</option>
            <option value="Normal">Normal</option>
            <option value="Premium">Premium</option>
            <option value="Elite">Elite</option>
          </select>
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Phone"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
          />

          {/* Start Date with Label */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              className="border border-gray-300 rounded-md p-2"
              type='date'
              value={newMember.start_date}
              onChange={(e) => setNewMember({ ...newMember, start_date: e.target.value })}
            />
          </div>

          {/* End Date with Label */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              className="border border-gray-300 rounded-md p-2"
              type='date'
              value={newMember.end_date}
              onChange={(e) => setNewMember({ ...newMember, end_date: e.target.value })}
            />
          </div>
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={addMember}
        >
          Add Member
        </button>
      </div>

      {/* Display Members */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Current Members</h3>
        <ul className="space-y-4">
          {members.map(member => (
            <li key={member.member_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
              <div>
                <span className="font-bold text-gray-800">{member.name}</span> - <span className="text-gray-600">{member.membership_type}</span>
              </div>
              <button
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => deleteMember(member.member_id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Members;
