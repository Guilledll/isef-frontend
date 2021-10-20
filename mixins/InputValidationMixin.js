export default {
  data() {
    return {
      /**
       * Array de errores para las validaciones
       */
      errors: [],
    };
  },
  methods: {
    /**
     * Define si en el campo hay cualquier error
     *
     * @param {object} model Model $v (vulidate)
     * @param {string} field Nombre del v-model
     */
    hasError(model, field = null) {
      return model.$anyError ||
        (field && this.errors[field] && this.errors[field][0])
        ? true
        : false;
    },
    /**
     * Devuelve el mensaje de error correspondiente
     *
     * @param {object} model Model $v (vulidate)
     * @param {string} field Nombre del v-model
     */
    errorText(model, field = null) {
      if (model.$anyError) return model;
      if (this.errors[field] && this.errors[field][0]) {
        return this.errors[field][0];
      }
    },
    /**
     * UTILIZAR PARA DEFINIR SI TRADUCIR ERROR O NO
     *
     * Resuelve si el campo debe ser traducido por
     * validation.service y pasarse como texto plano
     *
     * @param {object} model Model $v (vulidate)
     * @param {string} field Nombre del v-model
     */
    errorValidation(model) {
      return model.$anyError ? true : false;
    },
    /**
     * UTILIZAR CUANDO SE PUEDE TENER $v Y this.error A LA VEZ
     *
     * Resetea la validación del campo, aplica sobre $v
     * y sobre los errores particulares
     *
     * @param {object} model Model $v (vulidate)
     * @param {string} field Nombre del v-model
     */
    fieldReset(model, field = null) {
      model.$reset();
      if (field && this.errors[field]) this.errors[field] = [];
    },
    /**
     * Valida si hay errores de Vuelidate en el formulario
     */
    invalid() {
      this.$v.$touch();
      return this.$v.$invalid ? true : false;
    },
    /**
     * Verifica si el formulario fue tocado o no
     *
     * @param {object} model
     */
    touch(model) {
      model.$touch();
    },
  },
};
