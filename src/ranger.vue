<style>
   .ranger-div {
      position: relative;
   }

   .ranger-error {
      position: absolute;
      top: -3.5em;
      left: 0;
      padding: .5em 1em .4em;
      background-color: #f66;
      border: 1px solid #f00;
      border-radius: 5px;
      color: #fff;
   }

   .ranger-error::after,
   .ranger-error::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 15px;
      border: solid transparent;
   }

   .ranger-error::after {
      margin-left: 1px;
      border-top-color: #f66;
      border-width: 7px;
   }

   .ranger-error::before {
      border-top-color: #f00;
      border-width: 8px;
   }
</style>

<template>
   <div class="ranger-div">
      <input v-model="val" @update-model="input" @success="success" @error="error" v-ranger="settings">

      <slot name="error" v-if="!withoutTooltip" :message="errorMessage">
         <span class="ranger-error" v-if="errorMessage">
            {{ errorMessage }}
         </span>
      </slot>
   </div>
</template>

<script>
    import ranger from './directive';

    export default {
        directives: {
            ranger,
        },
        data() {
            return {
                val: '',
                errorMessage: null,
            };
        },

        props: {
            value: {
                required: true,
            },
            settings: {
                required: true,
                type: Object,
            },
            withoutTooltip: Boolean,
        },

        methods: {
            input( value ) {
                this.$emit( 'input', value );
            },

            success() {
                this.errorMessage = '';
                this.$emit( 'success' );
            },

            error( {message} ) {
                this.errorMessage = message;
                this.$emit( 'error' );
            },

        },

        watch: {
            value( current ) {
                this.val = current;
            },
        },

    };
</script>