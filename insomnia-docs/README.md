# Insomnia — Documentación para pene-main

> Nota: Si Insomnia mostró "Parse file insomnia-export.json failed: \"type\": Invalid input", es porque el JSON de exportación no tenía el formato esperado. He añadido un archivo corregido `insomnia-export.json` en esta carpeta (formato válido de exportación de Insomnia).

Pasos para usar:
1. Abrir Insomnia.
2. Menú > Import/Export > Import Data > From File.
3. Seleccionar `insomnia-export.json` de esta carpeta.
4. En Insomnia, seleccionar el workspace "pene-main API".
   - ¿Dónde está ese selector? Mira en la esquina superior izquierda de la ventana: hay un desplegable con el nombre del workspace actual. Haz clic en ese desplegable y elige "pene-main API".  
   - Alternativamente, en la barra lateral izquierda busca el nombre "pene-main API" y haz clic para abrirlo.
   - Si no ves "pene-main API": cierra y vuelve a abrir Insomnia o abre Manage Workspaces (desde el menú) para confirmar que la importación se completó correctamente.
5. Antes de ejecutar solicitudes, abrir Manage Environments y ajustar:
   - base_url (por ejemplo http://localhost:3000)
   - auth_token (si aplica)
6. Probar `GET /users` y `POST /users` desde el workspace importado.

Notas:
- El JSON contiene ejemplos mínimos. Añadir más requests según la API real.
- Para endpoints protegidos, completar `auth_token` en el entorno.
