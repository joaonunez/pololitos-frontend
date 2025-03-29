import React, { useState } from 'react';

export default function LoginForm() {
  const [form, setForm] = useState({
    emailLogin: '',
    passwordLogin: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones simples (puedes mejorarlas)
    const newErrors = {};
    if (!form.emailLogin) newErrors.emailLogin = 'El correo es obligatorio';
    if (!form.passwordLogin) newErrors.passwordLogin = 'La contraseña es obligatoria';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Aquí llamas a tu backend (ej: fetch("/api/login", {...}))
    console.log("Iniciando sesión con:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit" className="btn btn-primary">Ingresar</button>
    </form>
  );
}
