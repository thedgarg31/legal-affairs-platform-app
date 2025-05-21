import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

const Login = () => {
        const { t } = useTranslation();
        const navigate = useNavigate();
        const { setCurrentUser } = useContext(AuthContext);

        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async(e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const response = await login(formData);
                localStorage.setItem('token', response.token);
                setCurrentUser(response.user);
                navigate('/dashboard');
            } catch (err) {
                setError(err.response ? .data ? .message || 'An error occurred during login');
            } finally {
                setLoading(false);
            }
        };

        return ( <
            div className = "login-container" >
            <
            div className = "login-card" >
            <
            h2 > { t('login.title') } < /h2>

            {
                error && < Alert type = "error"
                message = { error }
                />}

                <
                form onSubmit = { handleSubmit } >
                    <
                    FormInput
                label = { t('login.email') }
                type = "email"
                name = "email"
                value = { formData.email }
                onChange = { handleChange }
                required
                    /
                    >

                    <
                    FormInput
                label = { t('login.password') }
                type = "password"
                name = "password"
                value = { formData.password }
                onChange = { handleChange }
                required
                    /
                    >

                    <
                    Button
                type = "submit"
                fullWidth
                disabled = { loading } >
                    { loading ? t('common.loading') : t('login.submit') } <
                    /Button> <
                    /form>

                <
                div className = "login-footer" >
                    <
                    p > { t('login.noAccount') } < Link to = "/register" > { t('login.registerNow') } < /Link> <
                    /p> <
                    p >
                    <
                    Link to = "/forgot-password" > { t('login.forgotPassword') } < /Link> <
                    /p> <
                    /div> <
                    /div> <
                    /div>
            );
        };

        export default Login;