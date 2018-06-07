const app = new Vue({
    el: '#app',
    data: {
        mostrar_init: true,
        mostrar_qsoy: false,
        mostrar_conoc: false,
        mostrar_expe: false,
        mostrar_proy: false
    },
    methods: {
      switchpanel(panel) {
        switch (panel) {
          case 'qs':
            console.log('koko');
            this.mostrar_init = false;
            this.mostrar_qsoy = true;
            break;
          case 'cono':
            console.log('koko');
            this.mostrar_init = false;
            this.mostrar_conoc = true;
            break;
          case 'expe':
            console.log('koko');
            this.mostrar_init = false;
            this.mostrar_expe = true;
            break;
          case 'proy':
            console.log('koko');
            this.mostrar_init = false;
            this.mostrar_proy = true;
            break;
          default:

        }
      },
      back_to_menu(){
        this.mostrar_init = true;
        this.mostrar_qsoy = false;
        this.mostrar_conoc = false;
        this.mostrar_expe = false;
        this.mostrar_proy = false;
      }
    }
});
