<template>
  <div class="page-container">
    <div class="mb-4 md:mb-6">
      <div class="flex justify-between">
        <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
          {{ categoria.nombre }}
        </h3>
        <div>
          <button class="optional-btn" @click="edit">
            <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="pencil" />
          </button>
        </div>
      </div>
      <hr class="mt-3" />
    </div>
    <GlobalInfoTable
      title="Materiales"
      svg="cube"
      :table="table"
      :open="open.table"
      :count="materiales.length"
      @click="showDetails()"
    >
      <tr v-for="material in materiales" :key="material.id">
        <td class="table-td">
          <router-link
            :to="`/materiales/${material.id}`"
            class="text-black hover:text-blue-600 hover:underline"
          >
            {{ material.nombre }}
          </router-link>
        </td>
        <td class="table-td">
          <router-link
            :to="`/categorias/${material.deposito_id}`"
            class="text-black hover:text-blue-600 hover:underline"
          >
            {{ material.deposito }}
          </router-link>
        </td>
        <td class="table-td text-gray-500">
          {{ material.cantidad }}
        </td>
      </tr>
    </GlobalInfoTable>
    <LazyModal v-if="open.modal">
      <FormCategoriaUpdate is-view @close="open.modal = !open.modal" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      open: {
        modal: false,
        table: false,
      },
      table: ['Nombre', 'Depósito', 'Cantidad'],
    };
  },
  computed: {
    categoria() {
      return (
        this.$store.state.categorias.categoria ||
        this.$store.dispatch('categorias/get', this.$route.params.id)
      );
    },
    materiales() {
      return this.$store.state.categorias.materiales;
    },
  },
  beforeDestroy() {
    this.$store.dispatch('categorias/clear');
  },
  methods: {
    async showDetails() {
      if (!this.materiales.length) {
        await this.$store.dispatch('categorias/materiales', this.categoria.id);
      }
      this.open.table = !this.open.table;
    },
    edit() {
      this.open.modal = !this.open.modal;
    },
  },
};
</script>
