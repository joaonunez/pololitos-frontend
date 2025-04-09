import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userActions';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailLogin: '',
    passwordLogin: ''
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setBackendError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.emailLogin) newErrors.emailLogin = 'El correo es obligatorio';
    if (!form.passwordLogin) newErrors.passwordLogin = 'La contraseña es obligatoria';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await dispatch(login(form.emailLogin, form.passwordLogin));

    if (!response.success) {
      setBackendError(response.message);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {backendError && <div className="alert alert-danger">{backendError}</div>}

      <div className="mb-3">
        <label htmlFor="emailLogin" className="form-label">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          id="emailLogin"
          name="emailLogin"
          value={form.emailLogin}
          onChange={handleChange}
        />
        {errors.emailLogin && <div className="text-danger">{errors.emailLogin}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="passwordLogin" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="passwordLogin"
          name="passwordLogin"
          value={form.passwordLogin}
          onChange={handleChange}
        />
        {errors.passwordLogin && <div className="text-danger">{errors.passwordLogin}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100">Ingresar</button>
    </form>
  );
}
