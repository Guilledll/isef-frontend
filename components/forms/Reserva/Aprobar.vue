<template>
  <form>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-1 text-xl text-gray-800 font-1 sm:text-2xl">
          Gestionar Reserva
        </h3>
        <p class="font-1">
          Aprobar o rechazar reserva realizada por {{ reserva.user }}.
        </p>
        <hr class="w-full mt-2" />
        <GlobalAlert class="!my-4" color="yellow">
          Esta reserva tiene una duración superiror a 24hs, para ser entregada
          un administrador debe aprobarla primero.
        </GlobalAlert>
        <div class="mb-5 grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            v-for="res in data"
            :key="res.key"
            :title="res.title"
            :value="datoReserva(res.key)"
            :color="res.color"
            :svg="res.svg"
          />
        </div>
        <div v-if="reserva.nota_usuario" class="mb-3">
          <LazyGlobalInputData
            title="Notas del usuario"
            :value="reserva.nota_usuario"
            color="yellow"
            svg="chat-alt"
          />
        </div>
        <Table>
          <template #head>
            <TableHead :header="['Materiales', 'Cantidad']" :action="false" />
          </template>
          <template #body>
            <tr v-for="material in materiales" :key="material.id">
              <td class="table-td">{{ material.nombre }}</td>
              <td class="table-td">{{ material.cantidad }}</td>
            </tr>
          </template>
        </Table>
        <!-- TOMA DE ACCION (aprueba/cancela) -->
        <div class="foot">
          <p class="font-1 text-center text-gray-800">
            Define si aprobar o cancelar la reserva. Al terminar informaremos la
            acción tomada al respectivo usuario.
          </p>
          <div class="aciones">
            <button
              type="button"
              class="btn full cancelar"
              :disabled="loading"
              @click="accion(5)"
            >
              <span v-if="!loading">Cancelar pedido</span>
              <GlobalSvg
                v-else
                class="h-5 w-5 animate-spin mx-4"
                svg="refresh"
              />
            </button>
            <button
              type="button"
              class="btn full aprobar"
              :disabled="loading"
              @click="accion(2)"
            >
              <span v-if="!loading">Aprobar pedido</span>
              <GlobalSvg
                v-else
                class="h-5 w-5 animate-spin mx-4"
                svg="refresh"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter :button="false" close-text="Volver" @close="$emit('close')" />
  </form>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  data() {
    return {
      form: {
        id: null,
        estado: null,
      },
      data: [
        {
          key: 'user_ci',
          title: 'Cédula',
          color: 'yellow',
          svg: 'identification',
        },
        {
          key: 'user',
          title: 'Usuario',
          color: 'blue',
          svg: 'user',
        },
        {
          key: 'inicio',
          title: 'Inicia',
          color: 'green',
          svg: 'clock',
        },
        {
          key: 'fin',
          title: 'Finaliza',
          color: 'red',
          svg: 'clock',
        },
        {
          key: 'razon',
          title: 'Razón de uso',
          color: 'purple',
          svg: 'question-circle',
        },
        {
          key: 'lugar',
          title: 'Lugar de uso',
          color: 'pink',
          svg: 'location-marker',
        },
      ],
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    loading() {
      return this.$store.state.global.loading;
    },
  },
  methods: {
    accion(estado) {
      this.form.id = this.reserva.id;
      this.form.estado = estado;

      this.$store
        .dispatch('reservas/cambiarEstado', this.form)
        .then(() => {
          this.$emit('close');
          this.$store.dispatch('reservas/clear');

          this.$router.push({
            path: `/guardia`,
            query:
              this.form.estado == 2
                ? { aprobada: this.form.id }
                : { cancelada: this.form.id },
          });
        })
        .catch(() => {
          this.$store.dispatch('global/loading', false);
        });
    },
    // Devuelve el valor, si es fecha la traduce
    datoReserva(key) {
      return key === 'inicio' || key === 'fin'
        ? this.formatearFecha(this.reserva[key])
        : this.reserva[key];
    },
  },
};
</script>

<style lang="postcss" scoped>
::v-deep .form-label {
  @apply text-gray-700 !important;
}
.foot {
  @apply bg-gray-50 border rounded px-3 py-4 mt-4 space-y-3;
  .aciones {
    @apply flex items-center justify-between space-x-3;
    .aprobar {
      @apply bg-green-500 hover:shadow-md;
    }
    .cancelar {
      @apply bg-red-500 hover:shadow-md;
    }
  }
}
</style>
