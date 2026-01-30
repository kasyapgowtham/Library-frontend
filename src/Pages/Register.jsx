import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        studentName: '',
        studentEmail: '',
        time: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(
                'library-backend-production-a99c.up.railway.app/api/Library/register',
                formData
            );
            setMessage('Registration successful!');
            setFormData({
                studentId: '',
                studentName: '',
                studentEmail: '',
                time: '',
                password: '',
            });
            navigate('/login');
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Registration failed. Try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">📚 Library Registration</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="studentId"
                        className="register-input"
                        placeholder="Student ID"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="studentName"
                        className="register-input"
                        placeholder="Student Name"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="studentEmail"
                        className="register-input"
                        placeholder="Student Email"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        className="register-input"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="register-input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}