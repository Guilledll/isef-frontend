<template>
  <form @submit.prevent="updateRol">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Modificar rol</h3>
          <p class="mb-3">Cambiar permisos del usuario.</p>
          <div>
            <FormSelect
              id="rol"
              v-model.number="form.rol"
              name="rol"
              required
              :error="hasError($v.form.rol)"
              @input="fieldReset($v.form.rol)"
              @blur="touch($v.form.rol)"
            >
              <template #options>
                <option v-if="originalRol == 0" value="0">Sin asignar</option>
                <option
                  v-for="rol in roles"
                  :key="rol.value"
                  :value="rol.value"
                  :selected="usuario.rol == rol.value"
                >
                  {{ rol.text }}
                </option>
              </template>
              <template #error>
                <LazyFormError
                  v-if="hasError($v.form.rol)"
                  :text="errorText($v.form.rol)"
                />
              </template>
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar rol"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        ci: '',
        rol: '',
      },
      roles: [
        { value: 1, text: 'Usuario' },
        { value: 2, text: 'Guardia' },
        { value: 3, text: 'Administrador' },
      ],
      originalRol: 0,
    };
  },
  computed: {
    usuario() {
      return this.$store.state.users.user;
    },
    disabled() {
      return Object.keys(updatedDiff(this.usuario, this.form)).length == 0;
    },
  },
  mounted() {
    this.form.ci = this.usuario.ci;
    this.form.rol = this.usuario.rol;
    this.originalRol = this.usuario.rol;
  },
  methods: {
    updateRol() {
      if (this.invalid()) return;
      this.$store
        .dispatch('users/updateRol', this.form)
        .then(() => this.cambioRol())
        .catch((e) => (this.errors = e.response.data.errors));
    },
    cambioRol() {
      this.closeModal();
      this.$emit('cambioRol');
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('users/clear');
      this.$emit('close');
    },
  },
  validations: {
    form: {
      rol: {
        required,
        integer,
      },
    },
  },
};
</script>
