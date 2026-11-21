# Botiquín Todo en Uno Carrefour

Herramientas de tienda en una sola página HTML:

- **Diferencias Inventario**: cruza el Excel de diferencias con el surtido y las capturas por ubicación, con filtros y reporte PDF.
- **Buscador v2**: busca EAN en el informe de surtido (copia optimizada, fotos y reporte PDF en tabla o en tarjetas).
- **Listado Outlet**: listado GB Resto por centro/sector/sección con stock y ubicación del surtido.

Los Excel se procesan solo en el navegador: ningún dato de la tienda se sube a GitHub ni a ningún servidor.

Uso: abrir `index.html` (o la dirección de GitHub Pages) en Chrome o Edge.

## Reporte Mapeo: reportes online

Para ver en el ordenador los reportes generados en el móvil:

1. Crea una hoja de Google nueva y entra en **Extensiones → Apps Script**.
2. Borra lo que haya y pega el contenido de [`apps-script-reportes.gs`](apps-script-reportes.gs). Guarda.
3. **Implementar → Nueva implementación → Aplicación web**: *Ejecutar como*: yo; *Quién tiene acceso*: cualquier usuario. Autoriza los permisos.
4. Copia la URL que termina en `/exec` y pégala en **⚙ Configuración → Reportes online** del Botiquín, en el móvil y en el ordenador.
