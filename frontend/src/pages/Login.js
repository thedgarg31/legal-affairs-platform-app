// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { login } from '../api/auth';
// import { AuthContext } from '../context/AuthContext';
// import FormInput from '../components/common/FormInput';
// import Button from '../components/common/Button';
// import Alert from '../components/common/Alert';

// const Login = () => {
//         const { t } = useTranslation();
//         const navigate = useNavigate();
//         const { setCurrentUser } = useContext(AuthContext);

//         const [formData, setFormData] = useState({
//             email: '',
//             password: '',
//         });

//         const [loading, setLoading] = useState(false);
//         const [error, setError] = useState('');

//         const handleChange = (e) => {
//             setFormData({
//                 ...formData,
//                 [e.target.name]: e.target.value,
//             });
//         };

//         const handleSubmit = async(e) => {
//             e.preventDefault();
//             setLoading(true);
//             setError('');

//             try {
//                 const response = await login(formData);
//                 localStorage.setItem('token', response.token);
//                 setCurrentUser(response.user);
//                 navigate('/dashboard');
//             } catch (err) {
//                 setError(err.response ? .data ? .message || 'An error occurred during login');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         return ( <
//             div className = "login-container" >
//             <
//             div className = "login-card" >
//             <
//             h2 > { t('login.title') } < /h2>

//             {
//                 error && < Alert type = "error"
//                 message = { error }
//                 />}

//                 <
//                 form onSubmit = { handleSubmit } >
//                     <
//                     FormInput
//                 label = { t('login.email') }
//                 type = "email"
//                 name = "email"
//                 value = { formData.email }
//                 onChange = { handleChange }
//                 required
//                     /
//                     >

//                     <
//                     FormInput
//                 label = { t('login.password') }
//                 type = "password"
//                 name = "password"
//                 value = { formData.password }
//                 onChange = { handleChange }
//                 required
//                     /
//                     >

//                     <
//                     Button
//                 type = "submit"
//                 fullWidth
//                 disabled = { loading } >
//                     { loading ? t('common.loading') : t('login.submit') } <
//                     /Button> <
//                     /form>

//                 <
//                 div className = "login-footer" >
//                     <
//                     p > { t('login.noAccount') } < Link to = "/register" > { t('login.registerNow') } < /Link> <
//                     /p> <
//                     p >
//                     <
//                     Link to = "/forgot-password" > { t('login.forgotPassword') } < /Link> <
//                     /p> <
//                     /div> <
//                     /div> <
//                     /div>
//             );
//         };

//         export default Login;


// My Updated Code:
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Temporary login for testing
        login({ email, name: 'Test User' });
        alert('Logged in successfully!');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        required
                    />
                </div>
                <button type="submit" style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px' 
                }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
