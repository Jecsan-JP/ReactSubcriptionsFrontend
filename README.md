# Frontend - Suscripciones con Stripe Checkout

Este proyecto es la parte frontend de la práctica técnica para integrar Stripe Checkout en un flujo de suscripción mensual. Permite a los usuarios registrarse, suscribirse y consultar el estado de su suscripción a través de un dashboard sencillo.

---

## Tecnologías utilizadas

- **Vite + React**
- **Axios** para peticiones HTTP
- **React Router DOM** para navegación
- **React Hook Form** para validación de formularios
- **CSS** (o framework de estilos a elección)

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone [URL_DEL_REPO]
   cd [NOMBRE_DEL_PROYECTO]
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega la URL de tu backend:
     ```
     VITE_API_URL=http://localhost:3000
     ```

4. **Inicia la aplicación:**
   ```bash
   npm run dev
   ```
   La app estará disponible en [http://localhost:5173](http://localhost:5173).

---

## Estructura del proyecto

```
src/
│
├── components/
│   ├── SubscriptionForm.jsx
│   └── Dashboard.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Ejemplo de uso

### 1. Formulario de suscripción

`src/components/SubscriptionForm.jsx`
```jsx
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SubscriptionForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
        data
      );
      window.location.href = res.data.checkout_url;
    } catch (error) {
      alert("Error al iniciar suscripción");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nombre"
        {...register("name", { required: true })}
      />
      {errors.name && <span>El nombre es obligatorio</span>}

      <input
        placeholder="Correo"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <span>Correo inválido</span>}

      <button type="submit">Suscribirse</button>
    </form>
  );
}
```

### 2. Dashboard

`src/components/Dashboard.jsx`
```jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ customerId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/subscription/${customerId}`)
      .then(res => setUser(res.data))
      .catch(() => alert("Error al obtener datos"));
  }, [customerId]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p><b>Nombre:</b> {user.name}</p>
      <p><b>Correo:</b> {user.email}</p>
      <p><b>Estado de suscripción:</b> {user.subscription_status}</p>
    </div>
  );
}
```

---

## Validaciones

- El formulario valida que el nombre y correo sean obligatorios y que el correo tenga formato válido.

---

## Pruebas

Incluye una prueba unitaria simple para el formulario usando [React Testing Library](https://testing-library.com/):

`src/components/SubscriptionForm.test.jsx`
```jsx
import { render, screen } from "@testing-library/react";
import SubscriptionForm from "./SubscriptionForm";

test("renderiza campos de nombre y correo", () => {
  render(<SubscriptionForm />);
  expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
});
```

Para ejecutar las pruebas:
```bash
npm run test
```

---

## Buenas prácticas

- Código modular y comentado.
- Manejo de errores en peticiones.
- Experiencia de usuario clara y sencilla.

---

## Notas

- Recuerda tener el backend corriendo y configurado correctamente.
- El flujo utiliza Stripe en modo test, no se realizan cobros reales.

---

## Enlaces útiles

- [Documentación de Stripe Checkout](https://stripe.com/docs/checkout)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
