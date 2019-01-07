const mix = require('laravel-mix');

mix.js('src/install.js', 'dist/ranger.min.js');
mix.js('src/example.js', 'dist/example.min.js');