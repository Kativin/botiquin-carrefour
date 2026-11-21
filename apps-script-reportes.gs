/**
 * Servicio de reportes de Reporte Mapeo (Botiquín Todo en Uno Carrefour).
 * Pégalo en Extensiones > Apps Script de una hoja de Google y publícalo como
 * aplicación web (Ejecutar como: yo · Quién tiene acceso: cualquier usuario).
 */
const HOJA = 'Reportes';

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(['id', 'fecha', 'tarea', 'qr', 'hechos', 'impreso', 'datos']);
  }
  return sh;
}

function salida_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const filas = hoja_().getDataRange().getValues().slice(1);
  const reports = filas.filter(f => f[6]).map(f => JSON.parse(f[6]));
  return salida_({ ok: true, reports: reports });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === 'save' && body.report && body.report.id) {
      const r = body.report;
      const sh = hoja_();
      const ids = sh.getRange(1, 1, Math.max(sh.getLastRow(), 1), 1).getValues().map(x => String(x[0]));
      const fila = [String(r.id), new Date(r.date), r.task || '', r.items.length,
        r.items.filter(i => i.done).length, r.printed ? new Date(r.printed) : '', JSON.stringify(r)];
      const i = ids.indexOf(String(r.id));
      if (i > 0) sh.getRange(i + 1, 1, 1, fila.length).setValues([fila]);
      else sh.appendRow(fila);
      return salida_({ ok: true });
    }
    return salida_({ ok: false, error: 'Acción no válida' });
  } finally {
    lock.releaseLock();
  }
}
