# DOCUMENTACIÓN DE LAS PRUEBAS DE POSTMAN

En las descripciones de las pruebas se puede observar un resultado esperado mediante el código de http del request, al igual que los casos utilizados, los cuales fueron similares a los que se utilizaron en las pruebas de lógica

## ALBUM

Se implementaron los siguientes requests

Add an Album: Crea un album nuevo con éxito


Add an Album con error: Crea album con título vacío sin éxito, indicando que el título no puede ser vacío


Get Album by Id: Obtiene un album con id existente con éxito.


Get Album by ID con error: Intenta obtener un album con id no existente. La prueba verifica que se obtenga un código 404 Not Found

Add Photo: Añadir foto con rango válido al album

Add Photo to Album: Asocia foto con album con éxito

Add Photo to Album con error 1: Asocia una foto noo exstente con un album no existente

Add Photo - 2: foto creada con rango de fecha inválido

Add Photo to Album con error 2: Buscar foto con fecha fuera del rango existente

Add an Album - 2: Añade un album utilizado para pruebas futuras

Delete Album: Elimina un album existente siin fotos,  con éxito .

Delete Album - Error 1: Elimina un album que no existe dado que no se encuentra su ID

Delete Album - Error 2: Elimina un album con una foto existente, falla debido a la regla de negocio que establece que no se puede elimnar un album sin una foto


## FOTO

Add Photo: Crea una foto nueva con éxito

Add Photo - iso error: Intenta crear foto con iso inválido, prueba no exitosa

Add Photo - velObturacion Error: Intenta crear foto con velObturacion inválido, prueba no exitosa

Add Photo - Apertura Error: Intenta crear foto con apertura inválido, prueba no exitosa

Add Photo - Media inválida: Intenta crear una foto sin cumplir la resricción de negocio de cumplir las dos medias

Get Photo - Id: Obtiene una foto con id existente, prueba exitosa

Get Photo - Error: Obtiene una foto con id inexistente, prueba no exitosa

Get all photos: Obtiene todas las fotos creadas con éxito

Delete Foto: Elimina una foto existente, se espera una prueba exitosa.

Delete Photo - Error: Elimina una foto no existente, se espera una prueba no exitosa.

Add Album - 2: Crea nuevo album para asociar con foto.

Add Photo 2: Crea una nueva foto para asociar con album - prueba exitosa.

Add Photo Album: Añade una foto a un album, prueba exitosa dado que se encuentran ambos ids.

Get album - Error 2: Verificar que se elimina el album al aliminar la última foto.


## RED-SOCIAL

Add RedSocial: Crea una nueva red social, prueba exitosa.

Add RedSocial - Error 1: Crea una red social con un slogan vacío, prueba no exitosa, verificada con cross-validator

Add RedSocial - Error 2: Crea una red social con slogan menor a 20 caracteres, por lo que es una prueba no exitosa.


## USUARIO

Add Usuario: Crea un nuevo usuario exitosamente con un nuevo id.

Add Usuario - Error 1: Crea un usuario con un teléfono diferente de 10 dígitos, prueba no exitosa debido a la regla de negocio.

Get Usuario: Obtiene un usuario exitosammente dado que el id existe

Get Usuario - Error 1: Obtiene un usuario con id no existente, prueba no exitosa

Get All Usuarios: Obtiene todos los usuarios existentes, prueba exitosa.