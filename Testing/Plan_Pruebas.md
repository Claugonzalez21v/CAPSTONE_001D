 Plan de Pruebas - CAPSTONE_001D

 Objetivo

Validar el correcto funcionamiento del sistema web de reservas y pagos, comprobando que las funcionalidades principales operen correctamente en ambiente cloud.

---

Ambiente de Pruebas

| Elemento | Descripción |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Repositorio | GitHub |
| Lenguaje Backend | Node.js |
| Framework Backend | Express |
| Pagos | Stripe API |
| Navegador | Google Chrome |

---

 Casos de Prueba

| ID | Funcionalidad | Prueba realizada | Resultado esperado | Estado |
|---|---|---|---|---|
| T01 | Acceso al sistema | Abrir el frontend desde Netlify | El sistema carga correctamente | OK |
| T02 | Login | Ingresar usuario válido | El usuario accede al sistema | OK |
| T03 | Login | Ingresar datos incorrectos | El sistema muestra mensaje de error | OK |
| T04 | Reservas | Crear una nueva reserva | La reserva se registra correctamente | OK |
| T05 | Reservas | Enviar formulario con campos vacíos | El sistema muestra validaciones | OK |
| T06 | Pago Stripe | Realizar pago con tarjeta de prueba | El pago se procesa correctamente | -- |
| T07 | Backend Render | Ejecutar petición al backend | El servidor responde correctamente | OK |
| T08 | GitHub | Revisar commits del repositorio | Se evidencia avance del desarrollo | OK |

---

Datos de Prueba

| Tipo | Dato |
|---|---|
| Usuario prueba | admin@test.com |
| Contraseña prueba | 123456 |
| Tarjeta Stripe test | 4242 4242 4242 4242 |
| Fecha tarjeta | Cualquier fecha futura |
| CVC | Cualquier número de 3 dígitos |

---

 Resultado General

Las pruebas ejecutadas permiten validar que el sistema cuenta con funcionalidades operativas para login, reservas, pagos mediante Stripe y despliegue en ambiente cloud.