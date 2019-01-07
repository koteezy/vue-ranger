import vueRanger from './ranger';
import ranger, { setParameters } from './directive';

// Объявление функции установки, выполняемой Vue.use()
export function install( Vue, params = {} ) {
    setParameters( params );

    Vue.component( 'vue-ranger', vueRanger );
    Vue.directive( 'ranger', ranger );
}

// Создание значения модуля для Vue.use()
// const plugin = {
//     install,
// };

// Автоматическая установка, когда vue найден (например в браузере с помощью тега <script>)
if ( typeof window !== 'undefined' && window.Vue ) {
    window.Vue.use( install );
}

// Экспорт компонента, для использования в качестве модуля (npm/webpack/etc.)
export default install;

export { vueRanger, ranger };
