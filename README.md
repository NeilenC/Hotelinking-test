# Hotelinking Test

Este proyecto es una aplicación web que permite a los usuarios generar y gestionar códigos promocionales para diferentes hospedajes. Desarrollado con Next.js, Material-UI y MongoDB.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 14.0 o superior)
- npm (versión 6.0 o superior)
- Git

## Instalación

1. **Clonar el repositorio**
   Corre el comando:
   git clone https://github.com/tu-usuario/hotelinking-test.git
   cd hotelinking-test
 

2. **Instalar dependencias**
   Corre el comando:
   npm install
 

3. **Variables de entorno**
   Las variables de entorno se encuentran configuradas en el archivo .env 

##  Ejecutar el Proyecto

1. **Configuración de Base de Datos**
   
   **MongoDB Atlas**
   - No requiere instalación local 
   - Este proyecto utiliza la URI de conexión proporcionada por MongoDB Atlas ( Base de datos Cloud )
  


2. **Iniciar el servidor de desarrollo**
   Corre el comando:
   npm run dev
   

   La aplicación estará disponible en `http://localhost:3000`

## Datos de Prueba

Para probar la aplicación con datos de ejemplo:

1. Inicia sesión en la aplicación
2. Ve a la página principal
3. Haz clic en el botón "Crear datos de prueba"

## Estructura del Proyecto

```
hotelinking-test/
├── components/          # Componentes React reutilizables
├── pages/              # Páginas y API routes
├── models/             # Modelos de MongoDB
├── lib/               # Utilidades y configuraciones
├── types/             # Definiciones de TypeScript
└── public/            # Archivos estáticos
```

## Funcionalidades Principales

- **Autenticación de usuarios**
  - Registro
  - Inicio de sesión
  - Cierre de sesión

- **Gestión de Códigos Promocionales**
  - Generación de códigos
  - Listado de códigos disponibles
  - Canje de códigos
  - Cancelación de reservas

## Tecnologías Utilizadas

- **Frontend**
  - Next.js
  - React
  - Material-UI
  - TypeScript

- **Backend**
  - Node.js
  - MongoDB Atlas/Local
  - Mongoose
  - JWT para autenticación

