# **HotelComplete**

**HotelComplete** es una aplicación backend de gestión de reservas para un hotel, desarrollada utilizando **Spring Boot** y **Spring Data JPA**. La aplicación permite gestionar reservas, huéspedes y habitaciones de manera eficiente. Está diseñada como una solución escalable para administrar operaciones de hotel y está integrada con una base de datos.

## **Tecnologías utilizadas**

- **Spring Boot**: Framework para el desarrollo de aplicaciones backend.
- **Spring Web**: Para la creación de APIs RESTful.
- **Spring Data JPA**: Para la interacción con la base de datos.
- **H2 Database**: Base de datos en memoria utilizada para el entorno de desarrollo.
- **MySQL**: Base de datos para producción.
- **Lombok**: Para reducir el código repetitivo en las clases de modelo.
- **Spring Boot DevTools**: Para facilitar el desarrollo con recarga automática.

## **Características**

- Gestión de **reservas** de los huéspedes.
- Administración de **huéspedes** y su información.
- Control de **habitaciones** disponibles en el hotel.
- Uso de **Spring Boot** para exponer APIs RESTful para la interacción entre el frontend y el backend.
- Base de datos en memoria **H2** para pruebas y desarrollo.

## **Instalación**

Para ejecutar el proyecto, sigue los siguientes pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/lupe2456/HotelComplete.git
```

**2. Navegar al directorio del proyecto**

Una vez clonado, navega al directorio del proyecto:

```bash
cd HotelComplete
```

**3. Importar el proyecto en tu IDE**

Si estás usando un IDE como IntelliJ IDEA o Eclipse, importa el proyecto como un proyecto Maven.

**4. Configuración de la base de datos**

En el archivo `src/main/resources/application.properties`, puedes configurar la base de datos. Para el entorno de desarrollo, se usa H2 por defecto, pero puedes configurarlo para usar MySQL en producción.

```properties
# Configuración de H2 (por defecto)
spring.datasource.url=jdbc:h2:mem:testdb

# Configuración de MySQL
# spring.datasource.url=jdbc:mysql://localhost:3306/tu_base_de_datos
# spring.datasource.username=tu_usuario
# spring.datasource.password=tu_contraseña
```

**5. Ejecutar la aplicación**

Puedes ejecutar la aplicación directamente desde tu IDE o utilizando el siguiente comando Maven:

```bash
mvn spring-boot:run
```

La aplicación estará disponible en [http://localhost:8080](http://localhost:8080).

**Uso de la API**

La API expone los siguientes endpoints:

- **GET** `/api/guests`: Obtener la lista de todos los huéspedes.
- **POST** `/api/guests`: Crear un nuevo huésped.
- **GET** `/api/rooms`: Obtener la lista de habitaciones disponibles.
- **POST** `/api/reservations`: Realizar una nueva reserva.
- **GET** `/api/reservations`: Obtener la lista de todas las reservas.

**Contribución**

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica (ejemplo: `git checkout -b feature-nuevaCaracteristica`).
3. Realiza tus cambios y haz un commit (ejemplo: `git commit -am 'Añadir nueva característica'`).
4. Haz push a tu rama (ejemplo: `git push origin feature-nuevaCaracteristica`).
5. Crea un Pull Request.

**Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
