/**
 * Mensajes de validación utilizandos por Vulidate
 */
export const mensajes = {
  required: () => 'Campo requerido',
  minLength: ({ $params }) =>
    `Debe tener al menos ${$params.minLength.min} caracteres.`,
  maxLength: ({ $params }) =>
    `Debe tener como máximo ${$params.maxLength.max} caracteres.`,
  numeric: () => 'El campo debe ser numérico.',
  email: () => 'El correo no es válido.',
  sameAsPassword: () => 'Las contraseñas no coinciden.',
  departamento: () => 'Por favor seleccione un departamento.',
  cedula: () => 'La cédula no es válida.',
  categoria: () => 'La categoría no es válida.',
  deposito: () => 'El depósito no es válido.',
};

/**
 * Retorna el digito verificador
 *
 * @param {*} ci
 */
function validation_digit(ci) {
  var a = 0;
  var i = 0;
  if (ci.length <= 6) {
    for (i = ci.length; i < 7; i++) {
      ci = '0' + ci;
    }
  }
  for (i = 0; i < 7; i++) {
    a += (parseInt('2987634'[i]) * parseInt(ci[i])) % 10;
  }
  if (a % 10 === 0) {
    return 0;
  } else {
    return 10 - (a % 10);
  }
}

/**
 * Valida la cedula con el digito verificador
 *
 * @param {*} ci
 */
function validateCi(ci) {
  ci = ci.replace(/\D/g, '');
  var dig = ci[ci.length - 1];
  ci = ci.replace(/[0-9]$/, '');
  return dig == validation_digit(ci);
}

/**
 * Validación de la cédula
 *
 * @param {int} value
 */
export function cedula(value) {
  return !!validateCi(value);
}

/**
 * Valida que se haya seleccionado un departamento
 *
 * @param {string} dep
 */
export const departamento = (dep) => dep != 0;
