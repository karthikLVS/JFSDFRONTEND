import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ username: '', email: '', phoneNumber: '', password: '' });
    const [currentEditUser, setCurrentEditUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setErrorMessage("Failed to fetch users");
            }
        } catch (error) {
            setErrorMessage("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async () => {
        const userWithRole = { ...newUser, role: 'USER' }; // Default role as 'user'
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userWithRole)
            });
            if (response.ok) {
                fetchUsers();
                setNewUser({ username: '', email: '', phoneNumber: '', password: '' });
                setShowAddModal(false);
                setSuccessMessage("User added successfully!");
                setErrorMessage(''); // Clear error message
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "User addition failed!");
                setSuccessMessage(''); // Clear success message
            }
        } catch (error) {
            setErrorMessage("Error adding user");
            setSuccessMessage(''); // Clear success message
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchUsers();
                setSuccessMessage("User deleted successfully!");
                setErrorMessage('');
            } else {
                setErrorMessage("Failed to delete user");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage("Error deleting user");
            setSuccessMessage('');
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${currentEditUser.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentEditUser)
            });
            if (response.ok) {
                fetchUsers();
                setShowEditModal(false);
                setSuccessMessage("User updated successfully!");
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Update failed");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage("Error updating user");
            setSuccessMessage('');
        }
    };

    const openEditModal = (user) => {
        setCurrentEditUser(user);
        setShowEditModal(true);
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div className="manage-users">
            <h2>User and Faculty Details</h2>
            <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
                <FaPlus /> Add User
            </button>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddModal(false)}><FaTimes /></span>
                        <h3>Add New User</h3>
                        <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        <input type="text" placeholder="Phone Number" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
                        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        <button className="modal-add-btn" onClick={handleAddUser}>Add User</button>
                        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success Message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error Message */}
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && currentEditUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}><FaTimes /></span>
                        <h3>Edit User</h3>
                        <input type="text" placeholder="Username" value={currentEditUser.username} onChange={(e) => setCurrentEditUser({ ...currentEditUser, username: e.target.value })} />
                        <input type="email" placeholder="Email" value={currentEditUser.email} onChange={(e) => setCurrentEditUser({ ...currentEditUser, email: e.target.value })} />
                        <input type="text" placeholder="Phone Number" value={currentEditUser.phoneNumber} onChange={(e) => setCurrentEditUser({ ...currentEditUser, phoneNumber: e.target.value })} />
                        <input type="text" placeholder="Role" value={currentEditUser.role} onChange={(e) => setCurrentEditUser({ ...currentEditUser, role: e.target.value })} />
                        <button className="modal-add-btn" onClick={handleUpdateUser}>Update User</button>
                        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success Message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error Message */}
                    </div>
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="action-btn edit" onClick={() => openEditModal(user)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;
