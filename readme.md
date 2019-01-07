**NOTE:** It is rather a project for self-development than replacement of some already established libraries.

- [Demo](https://koteezy.github.io/vue-ranger/example/)

#### What is Vue Ranger?

It's just a very small library for validating inputs, with messages for each mask mismatch.

#### Install
```
npm i -S vue-ranger
```

#### Use global, add directive and component to your app.
By default, 4 rules are available:
Only Russian letters,
English letters only,
Only letters,
Only digit.

You can add an unlimited digit of rules, as well as messages to display errors.
```
import VueRanger from 'vue-ranger'
  
Vue.use( VueRanger, {
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
} );
```
#### Use only directive

```
import {ranger} from 'vue-ranger'
  
new Vue({
    directives: {ranger},
})
```

#### Use only component

```
import {vueRanger} from 'vue-ranger'
  
new Vue({
    components: {vueRanger},
})
```

#### Examples
-[Live example](https://koteezy.github.io/vue-ranger/example/)
-[Example code](https://github.com/koteezy/vue-ranger/blob/master/src/example.js)
  
The standard settings for the validation are passed as object
```
{
'0': 'letter,ru',
'1-4': 'digit',
'4-6': 'letter,ru',
'6-9': 'digit',
}
```
You can set the minimum and maximum digit of characters, by default, they are set automatically, based on the settings.
```
{   
    min: 8,
    max: 9,
    params: {
       '0': 'letter,ru',
       '1-4': 'digit',
       '4-6': 'letter,ru',
       '6-9': 'digit',
    }
}
```
Also, you can register new rules in this object, but it is better to do it as shown in the beginning
```
{   
    min: 8,
    max: 9,
    rules: {
        onlySpace: {
            regex: /\s/,
            message: 'Please, enter space!'
        }
    },
    params: {
       '0': 'onlySpace',
       '1-4': 'digit',
       '4-6': 'letter,ru',
       '6-9': 'digit',
    }
}
```
Also, you can specify the min and max value for the Directive in the form of element attributes.
```
   <input v-model="model" type="text" v-ranger="params" min="3" max="7">
```

### Events

@success - Notifies you that the validation was successful, without arguments
  
@error - Getting an error object, {message, rule}, or, an empty value if it is a minimum value error