# Marvel wallet

Marvel wallet es un proyecto en crecimiento que nace con la idea de crear una webapp que permita gestionar tu colección de comics marvel. En esta primera versión nuestra intención en crear una demostración del uso del Api de Marvel, cómo se interactúa con este api y cómo se muestran los resultados de las consultas recurriendo solo a código JS sin recurrir a framework alguno.

Versiones posteriores del proyecto deberán integrar el uso de esta API con un sistema de BBDD que permita relacionar nuestra propia colección con la información facilitada por la propia Marvel. Las versiones que estén por venir podrán estar planteadas en frameworks reconocidos como Angular JS o React.

## Por qué Marvel

Marvel posee una de las colecciones de comics más ricas y variadas de la industria. Muchos hemos crecido leyendo sus comics y sus personajes se han convertidos en auténticas figuras a seguir, más aún después de su llegada al mundo de la gran pantalla.

Hace unos años Marvel comenzó a desarrollar un API que permitiera obtener información de su ingente colección de comics. Series, portadas, dibujantes, etc. Este API, amplia, basta e interesantísima, nos permitiría cosas como conocer los gustos de los compradores de comics, perfilarlos e incluso hacer big data para saber cuáles son sus preferencias y cuál sería la probabilidad de adquisición de según qué nuevas publicaciones.

Cruzar pues datos de big data con este API es algo áltamente interesante y toda una demo técnica para aquellos que comienzan su andadura en el mundo de las aplicaciones web.

## Comenzando 🚀

Al tratarse de una versión preliminar hemos decidido disponer de un boilerplate limpio basado en [Parcel](https://parceljs.org/). Basta con que descargues el código. Lo instales con node y lo despliegues para empezar a probar y desarrollar.

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

El proyecto está basado en Parcel. Para poder contar con parcel y poder desplegar el proyecto necesitarás node. 

```
Visita [Página de descargas de NodeJS](https://nodejs.org/es/download/)
```

Una vez descargado node para tu sistema operativo podrás acceder desde consola a los comandos de node para instalar y arrancar el programa.

### Instalación 🔧

Las dependencias del proyecto parcel se encuentran descritas en el fichero package.json. Para instalar todas las dependencias con node deberás navegar a la carpeta raiz del proyecto y lanzar el comando install

```
npm install
```

Una vez instaladas todas las dependencias dispondrás de un script para desplegar el servidor del proyecto y comenzar a hacer pruebas. 

```
npm run dev
```

Si necesitas crear más scripts puedes hacerlo desde la sección scripts del fichero package.json

### Estilo de codificación ⌨️

Para la codificación nos basamos en las directivas de javascript code conventions. Con nomenclatura de variables y métodos en camel case y tabulaciones a doble espacio.

## Despliegue 📦

Para elaborar las versiones de producción podéis lanzar el script de build

```
npm run build
```

Puedes consultar una versión publicada del proyecto en: [netlify](https://elegant-lovelace-02dfa3.netlify.app/)

## Construido con 🛠️

Las herramientas utilizadas son las siguientes:

* [VS Code](https://code.visualstudio.com/) - Editor de código empleado
* [Parcel](https://parceljs.org/) - Bundler untilizado para empaquetar
* [FontAwesome](https://fontawesome.com/) - Tipografía para los iconos
* [Google Fonts](https://fonts.google.com/) - Tipografías empleadas en el proyecto
* [Post Css](https://parceljs.org/css.html) - Herramienta para modificar las css con plugins
* [Css nano](https://cssnano.co/) - Minimiza el css de salida
* [Autoprefixer](https://github.com/postcss/autoprefixer) - Reduce la cantidad de css añadiendo compatibilidad
* [Crypto js](https://cryptojs.gitbook.io/docs/) - Implementación de MD5 para JS

## Wiki 📖

### 1. Creación del boilerplate



### 2. Proceso de Creación

#### 2.1 Index

#### 2.2 Comics

#### 2.3 Series

#### 2.4 Autores

### 3. Api

### 4. Mobile first

### 5. Responsive

### 6. Consideraciones

## Autores ✒️

* **Roberto Martínez Sánchez** - *Trabajo Inicial* - [RobertoMS2](https://github.com/RobertoMS2/demoProject/)

## Expresiones de Gratitud 🎁

* Comparte el proyecto, hazlo crecer y añade funcionalidades 📢
* No dudes en invitar una cerveza 🍺 (coca cola mejor) o un café ☕ a alguien del equipo.
* Gracias a mi mujer, mis hijos y mi perro por aguantarme hablando de programación y Marvel hasta mientras duermo 🤓.



---
⌨️ con ❤️ por [RobertoMS2](https://github.com/RobertoMS2/demoProject/) 😊
