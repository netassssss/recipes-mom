import '../styles/directions.css';

/* eslint no-debugger:0 */
const Directions = {
  install(Vue, options) {
    Vue.mixin({
      data() {
        return {
          rtl: options.rtl || false,
          directionClass: '',
        };
      },
      methods: {
        changeDirection(isRtl) {
          this.rtl = isRtl;
        },
        getCustomDirectionClass() {
          this.directionClass = this.rtl ? 'rtl' : '';
        },
      },
      watch: {
        rtl: {
          immediate: true,
          handler() {
            this.getCustomDirectionClass();
          },
        },
      },
    });
  },
};

export default Directions;
