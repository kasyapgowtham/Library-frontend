import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Add this if Register has shared styles

export default function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('library-backend-production-a99c.up.railway.app/api/Library/Login', {
                studentId:studentId,
                StudentPassword:password,
            });
            console.log('Login successful:', response.data);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleLogin} className="login-btn">
                    Login
                </button>
                <p>
                    Don't have an account?{' '}
                    <a onClick={() => navigate('/register')} className="register-link">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}
