// src/components/Members.js
import  { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', membership_type: '', email: '', phone: '' });
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
    fetchMembers(); // Reload members after adding
  };

  // Delete member
  const deleteMember = async (id) => {
    await axios.delete(`http://localhost:5000/api/members/${id}`);
    fetchMembers(); // Reload members after deleting
  };

  return (
    <div className="container">
      <h2>Members</h2>

      {/* Add New Member */}


      <div className="card">
        <input   className="input-field" required placeholder="Name" onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
        <select className="input-field" onChange={(e) => setNewMember({ ...newMember, membership_type: e.target.value })}>
          <option value="">Select Membership Type</option>
          <option value="Normal">Normal</option>
          <option value="Premium">Premium</option>
          <option value="Elite">Elite</option>
        </select>
        <input className="input-field" placeholder="Email" onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
        <input className="input-field" placeholder="Phone" onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} />
        <input className="input-field" placeholder="Start Date" type='date' onChange={(e) => setNewMember({ ...newMember, startDate: e.target.value })} />
        <input className="input-field" placeholder="End Date" type='date' onChange={(e) => setNewMember({ ...newMember, endDate: e.target.value })} />
        <button className="add-button" onClick={addMember}>Add Member</button>
      </div>


      {/* Display Members */}
      <ul>
        {members.map(member => (
          <li key={member.member_id}>
            {member.name} - {member.membership_type}
            <button className="delete-button" onClick={() => deleteMember(member.member_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
