import React, { useState } from 'react';

interface User {
    id: string;
    name: string;
}

interface AssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (taskId: string, userId: string) => void;
    taskId: string;
    users: User[];
}

const AssignModal: React.FC<AssignModalProps> = ({ isOpen, onClose, onAssign, taskId, users }) => {
    const [selectedUser, setSelectedUser] = useState('');

    const handleAssign = () => {
        if (selectedUser) {
            onAssign(taskId, selectedUser);
            onClose();
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Assign Task</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Select User</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                        <button onClick={handleAssign} className="px-4 py-2 bg-blue-500 text-white rounded-md">Assign</button>
                    </div>
                </div>
            </div>
        ) : null
    );
}


export default AssignModal;