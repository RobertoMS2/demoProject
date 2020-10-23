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

La creación del boilerplate ha buscado complicar lo mínimo el proyecto a la hora de arrancarlo. La idea ha sido partir de lo más básico de Parcel para a partir de ahí introducir los plugins mínimos de CSS que permitieran ahorrar aún más código a la hora de generar las CSS. 

Los pasos dados han sido los siguientes:

1. Contar con un boilerplate de html mínimo para los ficheros base. Hemos usado una versión reducida de [HTML5 Boilerplate](https://html5boilerplate.com/).

```
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link href="https://fonts.googleapis.com/css2?family=" rel="stylesheet"> 
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="shortcut icon" href="favicon.ico" />
  <meta name="theme-color" content="#fafafa">
</head>

<body>
  <header></header>
  <nav></nav>
  <section></section>
  <footer></footer>
</body>

</html>
```

2. Crear el bundle mínimo de Pacel. Primero instalando parcel y después creando al package.json

```
npm install -g parcel-bundler
npm init -y
```

3. Añadir las tareas al package.json

```
{
  "scripts": {
    "dev": "parcel index.html",
    "build": "parcel build index.html"
  }
}
```

4. Añadir el fichero para PostCss (.postcssrc)

```
{
  "modules": true,
  "plugins": {
    "autoprefixer": {
      "grid": true
    }
  }
}
```

5. Añadir el fichero .browserslistrc para la compatibilidad con navegadores antiguos

```
last 4 version
> 2%
not dead
IE 11
```

6. Crear el fichero de configuración de css nano (cssnano.config.js)

```
module.exports = {
  preset: [
    'default',
    {
      calc: false,
      discardComments: {
        removeAll: true
      }
    }
  ]
}
```

7. Una vez montado todo solo queda arrancar el servidor y comenzar a codificar.

### 2. Proceso de Creación

La primera necesidad cuando comencé el desarrollo fué lograr hacer una primera petición al Api de Marvel para obtener un json de respuesta. Esto no estuvo exento de problemas... Siguiendo la documentación oficial del Api de Marvel podría parecer que bastaría con la clave pública y la url con parámetros, pero si atacas de este modo el api obtienes un error de CORS (cosa que ni contempla en el API). En la sección *3. Api* Podéis ver la forma correcta de atacar a las urls del Api de Marvel.

Una vez resuelto el tema de las consultas y maquetada la primera salida mi siguiente problema fué plantear la navegación. Desconocer cómo funciona Parcel era un problema. Esto me llevo a montar una estructura por directorios (que posteriormente tiré) y luego una colección reducida de ficheros en html. Esta decisión me sigue resultado conflictiva. Por un lado sopesé hacerlo todo en una única página recurriendo a la carga de módulos en caliente y trabajando en formato SPA. Luego pensé en las posibilidades de crecimiento del proyecto y las ventajas de tener una página propia y pese a las escasas ventajas a corto plazo de tener una página por tipo de contenido decidí separar las secciones en páginas y no solo en módulos.

En este punto el código se encontraba demasiado mezclado con la configuración por lo que reordené el código de la siguiente manera:

```
root: (ficheros de configuración)
    |--> src (páginas html)
        |--> css
        |--> img
        |--> js (módulos js del proyecto)
        |--> static (para contenidos estáticos como favicon, robot.txt, etc.)
```

Esto me llevó también a cambiar mis entradas en el package.json por el actual:

```
"dev": "parcel ./src/*.html",
"build": "parcel build ./src/*.html"
```

Para que así Parcel contemplara las distintas páginas como puntos de entrada.

La carpeta static fue añadida con posteriridad junto con el plugin "parcel-plugin-robot" para evitar que parcel renombrara algunos ficheros de nombre fijo en la exportación.

El último cambio importante de rumbo en el desarrollo fué el comportamiento por defecto de las páginas comic.html, series.html y character.html. Eran páginas que tenían sentido cuando recibían parámetros, pero que carecían de el al no recibir ninguno. Las opciones que me planteé fueron muy variadas, desde cortar el acceso a la página si no contenía parámetros, hacer una redirección... al final opté por la más coherente: Hacer una consulta de todas las entradas del criterio si no había parámetro de consulta. De esta forma además mataba dos pájaros de un tiro, tenía página de listado y detalle en una sola url.

#### 2.1 Index

Muestra una lista de comics, personajes y series. Se ha maquetado de forma deliverada con un menú lateral porque inicialmente iba a funcionar como una spa. Finalmente se respetó el menú lateral pese a no ser una SPA ya que la navegación se ha planteado de una forma vertical en lugar de optar por un menú más convencional. El principal quebradero de cabeza al crear index era si se debía contar con tres módulos independientes con parámetros que permitieran hacer las consultas de la portada o si la portada debía contar con su propio módulo de consultas pese a poder caer en la ocurrencia de código repetitivo. Finalmente se optó por esta segunda opción, pues si bien se puede dar código repetitivo en una aplicación tan simple como esta versión actual, una vez la aplicación se complique el código generado para index será probablemente muy diferente que el generado para otros módulos. Considerando por ello rentable el disponer de un módulo de consultas propio para la portada.

#### 2.2 Comics, Series y Autores

Las tres secciones realmente cuentan con una lógica y una distribución análoga. Fueron planteadas a la vez como tres consultas distintas al Api. Al nacer al mismo tiempo cuentan con la misma distribución de módulos y esqueletos base. Nacieron a la par, crecieron a la par y será más adelante en el desarrollo del proyecto cuando comiencen a diferenciarse por mor de su funcionalidad. 

Comparten la misma dualidad listado/detalle que vendrá determinada por la existencia de un parámetro en la consulta. Si hay "id" estaremos ante una página de detalle, si no, ante un listado. Sencillo, directo, funcional y fácil de entender.

### 3. Api

El api resultó ser sencilla de utilizar... aunque la documentación de la propia Marvel no ayuda a que esto sea así. La primera tentación una vez consultada la documentación del Api es la siguiente:

```
const url_comics = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=-onsaleDate&limit=24&apikey=' + constants.public_key;
```

y hacer un fetch directamente de esta url. El problema es que el Api contestará con un error de CORS que te dejará completamente fuera de juego (dado que los errores CORS nisiquiera están contemplados en la versión actual del api). Lo que Marvel no te cuenta es que es necesario obtener una marca de tiempo y crear un MD5 con la clave privada. Adjuntar todo esto a la solicitud y entonces si hacer un fetch de esta url.

El proceso necesario es el siguiente:

```
/* Obtenemos una marca de tiempo */
const ts = new Date().getTime();
/* Construimos un mensaje con la marca de tiempo y las claves privada y pública */
const message = ts+constants.private_key+constants.public_key;
/* Codificamos a md5 el mensaje */
const md = md5(message);
const hash = md.toString();
/* Construimos la url a partir de la url de consulta, el id a consultar, la clave pública, la marca de tiempo y por último el hash md5 */
const url = url_comic + id + '?apikey=' + constants.public_key + '&ts=' + ts + '&hash=' + hash;
```

Una vez construida la url ya podemos trabajar con ella haciendo un fetch.

Puede consultar la [documentación completa del Api de Marvel en su página web](https://developer.marvel.com/docs).

### 4. Mobile first

Para el desarollo hemos partido de un enfoque más sencillo que el mobile first. El punto de partida han sido fundamentalmente tres conceptos. Containers con un display: flex. Contenidos basados en un grid 960 pero basado en 12 columnas y %. Y por último responsive Boxes. Cajas que mantienen la relación de aspecto de lo que contengan en función del ratio que se le solicite:

```
.r-box{
	position: relative;
  width: auto;
  overflow: hidden;
  background-color: var(--secundary-white);
}

.r-box:before{
	content: "";
	display: block;
	padding-top: 100%;
}

.r-box-1_1:before{
	padding-top: 100%;
}

.r-box-2_1:before{
	padding-top: 50%;
}
```

Basar nuestro desarrollo en estas tres patas nos permite "liberarnos" de los desarrollos basados en dispositivo para basarnos en los conceptos básicos del Responsive Web Design: "Adaptarnos a cualquier resolución y cualquier pantalla con independencia del dispositivo". La idea es ser 100% responsive, lo que nos lleva al siguiente punto.

### 5. Responsive

El objetivo en el diseño responsive ha sido ser fieles a los principios de Ethan Marcotte en su libro "Responsive Web Desing" y que quedaron plasmados en su web de ejemplo robot or not. La idea es poder coger la web en un monitor 2k y poder reescalarla pixel a pixel de manera que siempre se visualice sin problemas ni restricciones la totalidad de la página web. Sin colisiones, saltos limitados por un esqueleto predeterminado ni nada similar. Al no estar limitado por un framework o un número de saltos hemos plateado un responsive donde la plantilla se adapta allí cuando lo necesita, siendo como resultado funcional en cualquier resolución. 

Para ello ha sido herramienta básica la vista "con capacidad de respuesta" de los navegadores basados en chromium, que nos han permitido determinar de menos a más (y sobre todo de más a menos para localizar herrores) cuáles son las resoluciones exactas que requerían de adaptación.

## Autores ✒️

* **Roberto Martínez Sánchez** - *Trabajo Inicial* - [RobertoMS2](https://github.com/RobertoMS2/demoProject/)

## Expresiones de Gratitud 🎁

* Comparte el proyecto, hazlo crecer y añade funcionalidades 📢
* No dudes en invitar una cerveza 🍺 (coca cola mejor) o un café ☕ a alguien del equipo.
* Gracias a mi mujer, mis hijos y mi perro por aguantarme hablando de programación y Marvel hasta mientras duermo 🤓.



---
⌨️ con ❤️ por [RobertoMS2](https://github.com/RobertoMS2/demoProject/) 😊
