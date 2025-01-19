# Indicadores Económicos Bancos Publicos y Privados de Costa Rica 

Una página web interactiva desarrollada en React para la visualización de indicadores económicos de bancos públicos y privados de Costa Rica. El backend, desarrollado con Node.js, se encarga de obtener los datos de las APIs de los respectivos bancos y creadas para proporcionar la información actualizada a través de solicitudes HTTP.

# Funciones

Tipo de Cambio: Muestra una tabla dinamica con todos los tipos de cambio actual de los bancos implementados para las siguientes divisas.

- CRC (Colón Costarricense)
- USD (Dólar Estadounidense)
- EUR (Euro)

Conversión de Divisas: Conozca el cambio de divisas actual para cualquier banco seleccionado.

- USD ⟷ CRC
- CRC ⟷ USD

# Bancos Implementados

| Nombre de Banco                                | Banco Público | Banco Privado | Link                                                                                          |
|--------------------------------------|---------------|---------------|-----------------------------------------------------------------------------------------------|
| Banco Central de Costa Rica (BCCR)   | ✔️            |               | [API BCCR](https://api.hacienda.go.cr/indicadores/tc)                                         |
| Banco Nacional (BN)                  | ✔️             |               | [En implementación...]                                               |
| BAC Credomatic (BAC)                 |               | ✔️             | [API BAC](https://www.sucursalelectronica.com/exchangerate/showXmlExchangeRate.do)            |
| Banco Popular (BP)                   |               | ✔️            | [API BP](https://www.appsbp.com/WsSINPEMovilV2/ServiciosGeneral/indicadoresfinancieros)       |
| ScotiaBank (SB)                      |               | ✔️             | [En implementación...]                                                   |


El programa utiliza diferentes tipos de solicitudes dependiendo de la entidad a la cual se le pida la información:

BCCR: Solicita el JSON al Web Service del BCCR mediante una solicitud HTTP GET para posteriormente acceder a los valores de tipo de cambio del JSON.

BN: Se crea una API local accediendo con una solicitud HTTP GET a la página web del BN donde se muestra el tipo de cambio, posteriormente a traves de un metodo REGEX se obtiene el valor de tipo de cambio en formato JSON para ser extraido y mostrado.

BAC: Solicita el XML al Web Service del BAC mediante una solicitud HTTP GET para posteriormente parsear el documento y obtener el respectivo valor.

BP:  Solicita el JSON al Web Service del BCCR mediante una solicitud HTTP GET para posteriormente acceder a los valores de tipo de cambio del JSON (Se utiliza metodo de distincion debido a valores con el mismo nombre en el JSON).

SB: Se crea una API local accediendo con una solicitud HTTP GET a la página web del SB donde se muestra el tipo de cambio, posteriormente a traves de un metodo REGEX se obtiene el valor de tipo de cambio en formato JSON para ser extraido y mostrado.

# Comentarios
Por favor hacer llegar cualquier [comentario o reporte](mailto:codificatorgm@gmail.com).

# Lanzamiento
- Fecha: 1 de enero de 2025
- Plataforma: Vercel
- Tecnologías: React, Node.js
- Versión: 1.0.0
