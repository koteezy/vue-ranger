import Vue from 'vue';
import { ranger, vueRanger } from '../src/install';

// Vue.use( VueRanger, {
// translations.
// messages: {
//     ru: 'Переключитесь на русский язык.',
//     en: 'Переключитесь на английский язык.',
//     digit: 'Введите цифру!!',
//     letter: 'Введите букву',
// },
// custom rules.
// rules: {
//     notSymbol: {
//         regex: /(\d|[a-zA-Zа-яА-Я])/,
//         message: 'Введите цифру или букву.',
//     },
// },
// } );

new Vue( {
    directives: {ranger},
    components: {vueRanger},
    data: {
        vin: '',
        grz: '',
        grzMessage: '',
        grzIsValid: false,
        grzValidate: {
            params: {
                '0': 'letter,en',
                '1-4': 'digit',
                '4-6': 'letter,en',
                '6-9': 'digit',
            },
        },
    },
    el: '#app',

    computed: {
        grzValidStatus() {
            return this.grzIsValid ? 'All ok!' : 'Not ok....';
        },
    },

    methods: {
        grzSuccess() {
            this.grzIsValid = true;
            this.grzMessage = '';
        },

        grzError( rule = null ) {
            this.grzIsValid = false;
            this.grzMessage = rule ? rule.message : rule;
        },
    },
} );