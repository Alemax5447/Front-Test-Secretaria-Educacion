# <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="40" height="40" style="vertical-align:middle; margin-right:10px;"/> Front-Test-Secretaria-Educacional

Este proyecto es un frontend Angular moderno y modular, diseñado para consumir las APIs de Laravel del proyecto complementario: [Test-Secretaria-Educacion (Laravel)](https://github.com/Alemax5447/Test-Secretaria-Educacion).

## Descripción General

- Permite registrar empleados escaneando o subiendo una foto de la credencial INE.
- Utiliza IA (Gemini) para extraer automáticamente los datos de la credencial.
- Maneja errores robustamente (errores de API, duplicados, SQL, faltantes, etc.).
- UI responsiva y optimizada para dispositivos móviles, con soporte para cámara y galería.
- Componentes standalone y uso de Tailwind CSS para estilos modernos.

## Integración con la API de Laravel

Este frontend está pensado para funcionar junto con el backend Laravel disponible en:
https://github.com/Alemax5447/Test-Secretaria-Educacion

### Configuración de Rutas de Servicio

Por defecto, las rutas de los servicios están en:

- `src/app/service/api.ts`

Ejemplo de endpoints configurados:

```
private apiUrlDelete = 'http://localhost:8000/api/empleados/delete';
private apiUrlGet = 'http://localhost:8000/api/empleados';
private apiUrlCreate = 'http://localhost:8000/api/empleados/create';
```

**Si tu backend Laravel está en otra URL o puerto, debes modificar estas rutas en el archivo mencionado.**

### Pasos para conectar con tu API

1. Clona y ejecuta el backend Laravel siguiendo las instrucciones de su README.
2. Asegúrate de que el backend esté corriendo y accesible desde el frontend (misma red o dominio permitido por CORS).
3. Modifica las URLs en `src/app/service/api.ts` si es necesario.
4. Ejecuta el frontend con `ng serve` y accede desde tu navegador o dispositivo móvil.

## Requisitos

- Node.js y Angular CLI instalados
- Acceso a la API de Gemini (clave válida)
- Backend Laravel corriendo y accesible

## Notas

- Si usas el frontend en un dispositivo móvil, asegúrate de que ambos (PC y móvil) estén en la misma red y usa la IP local de tu PC en las URLs de servicio.
- Los errores de Gemini (por ejemplo, modelo saturado) se mostrarán tal cual los retorna la API para facilitar el diagnóstico.

---

¿Dudas o problemas? Consulta los issues o abre uno nuevo en el repositorio.
