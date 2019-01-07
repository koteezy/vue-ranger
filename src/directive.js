let globalRules = {
    'ru': {
        regex: /^[а-яА-Я]+$/,
        message: 'Switch on russian language.',
    },
    'en': {
        regex: /^[a-zA-Z]+$/,
        message: 'Switch on english language.',
    },
    'digit': {
        regex: /^\d+$/,
        message: 'Enter a digit',
    },
    'letter': {
        regex: /^\D+$/,
        message: 'Enter a letter',
    },
};

/**
 *
 * @param params
 * @return {*}
 */
const setParameters = ( {messages = {}, rules = {}} ) => {
    globalRules = Object.assign( rules, globalRules );

    Object.keys( messages ).forEach( key => {
        if ( rules.hasOwnProperty( key ) )
            rules[ key ][ 'message' ] = messages[ key ];
    } );
};

/**
 * Get max or min value from settings.
 *
 * @param params
 * @param max
 * @param min
 * @param isMax
 * @return {*}
 */
const maxOrMin = ( {params, max, min}, isMax ) => {
    const value = isMax ? max : min;

    if ( value )
        return parseInt( value );

    const numbers = [];

    for ( const key in params )
        numbers.push( parseInt( key.split( '-' ).pop() ) );

    if ( isMax )
        return Math.min.apply( null, numbers );

    return Math.max.apply( null, numbers );
};

/**
 * initialize main settings.
 *
 * @param s
 * @param el
 * @return {{}}
 */
const getSettings = ( s, el, vnode ) => {
    setParameters( {messages: vnode.context.$root.rangerTranslations || s.messages || {}} );

    const r  = {};
    r.min    = s.min || el.getAttribute( 'min' );
    r.max    = s.max || el.getAttribute( 'max' );
    r.params = s.params || s;
    r.rules  = Object.assign( s.rules || {}, globalRules );
    r.max    = maxOrMin( r, true );
    r.min    = maxOrMin( r, false );

    return r;
};

/**
 * Emit from directive.
 *
 * @author https://stackoverflow.com/a/40720172/9844233
 * @param vnode
 * @param name
 * @param data
 */
const dispatch = ( vnode, name, data ) => {
    const handlers = (vnode.data && vnode.data.on) ||
        (vnode.componentOptions && vnode.componentOptions.listeners);

    if ( handlers && handlers[ name ] ) {
        handlers[ name ].fns( data );
    }
};

/**
 * Make float from string key.
 *
 * @param key
 * @example string 5-9 => float 5.9
 * @return {number}
 */
const pf = key => {
    return parseFloat( key.replace( '-', '.' ) );
};

/**
 * Default sorting, when a loop incorrectly iterates over the values.
 * To do this, we return the sorted keys in the order in which we need.
 *
 * @param params
 * @return {string[]}
 */
const parseParams = params => {
    return Object.keys( params ).sort( ( a, b ) => pf( a ) - pf( b ) ).map( a => a.replace( '.', '-' ) );
};


/**
 *
 * @param value
 * @param from
 * @param to
 * @return {*}
 */
const getFragmentByPeriod = ( value, from, to = 0 ) => {
    from = parseInt( from );
    to   = parseInt( to );

    if ( to === 0 ) {
        return value.charAt( from ? from - 1 : from );
    }

    return value.slice( from, to );
};

const validateValue = ( settings, val ) => {
    const parameterKeys = parseParams( settings.params ),
          rules         = settings.rules;
    let value           = '',
          rule          = {};

    for ( const key of parameterKeys ) {
        const fragment  = getFragmentByPeriod( val, ...key.split( '-' ) ),
              ruleNames = settings.params[ key ].split( ',' );

        if ( !fragment || settings.max && settings.max === value.length ) {
            continue;
        }

        for ( let s of [ ...fragment ] ) {

            for ( let name of ruleNames ) {
                const r = rules[ name ];

                console.log( [ ...fragment ], r, name, rules );

                if ( !r.regex.test( s ) ) {
                    return {value, rule: r};
                }
            }

            value += s;
        }
    }


    return {value, rule};
};

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
const event = ( name ) => {
    const evt = document.createEvent( 'Event' );
    evt.initEvent( name, true, true );
    return evt;
};

const ranger = ( el, binding, vnode ) => {
    const settings = getSettings( binding.value, el, vnode );

    el.oninput = function ( e ) {
        if ( !e.isTrusted ) return; // avoid infinite loop

        const {value, rule} = validateValue( settings, el.value );

        el.value = value;

        if ( rule.message || settings.min && value.length < settings.min )
            dispatch( vnode, 'error', rule );
        else
            dispatch( vnode, 'success' );

        el.dispatchEvent( event( 'input' ) );

        dispatch( vnode, 'update-model', value );
    };

    // var newDisplay = '';
    // if ( newDisplay !== el.value ) {
    //     el.value = newDisplay;
    //     el.dispatchEvent( event( 'input' ) );
    //     el.dispatchEvent( event( 'change' ) );
    // }
};


export { setParameters };

export default ranger;