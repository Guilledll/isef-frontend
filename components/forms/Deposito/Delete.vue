<template>
  <form @submit.prevent="deleteDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="delete" />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Eliminar depósito</h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estas a punto de eliminar un depósito, este será removido del
            sistema para siempre.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter text="Eliminar depósito" type="del" @close="closeModal" />
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    deposito() {
      return this.$store.state.depositos.deposito;
    },
  },

  methods: {
    deleteDeposito() {
      this.$store
        .dispatch('depositos/delete', this.deposito.id)
        .then(() => this.$emit('close'));
    },
    closeModal() {
      this.$store.dispatch('depositos/clear');
      this.$emit('close');
    },
  },
};
</script>
