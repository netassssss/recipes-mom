import '../styles/directions.css';

/* eslint no-debugger:0 */
const Directions = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        getCustomDirectionClass() {
          return this.rtl ? 'rtl' : '';
        },
      },
      data() {
        return {
          rtl: options.rtl || false,
        };
      },
      methods: {
        changeDirection(isRtl) {
          this.rtl = isRtl;
          if (!document.body.classList.contains('.rtl')) document.body.classList.add('.rtl');
          else document.body.classList.remove('.rtl');
        },
      },
    });
  },
};

export default Directions;
