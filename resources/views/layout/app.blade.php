<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8"/>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="Pratique tênis de Mesa"/>
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png"/>
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
        <title>Projeto Hyper Pong</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,300&display=swap" rel="stylesheet">
        <style>
            * {
                padding:0;
                margin:0;
                border:0;
                font-family: 'Poppins', sans-serif;
            }
        </style>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
    <main>
        @component('components.component_menu')
        @endcomponent

        @hasSection('body')
            @yield('body')
        @endif
    </main>
    </body>
</html>
