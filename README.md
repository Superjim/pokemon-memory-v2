# Pokemon Memory Card Game

:point_right:[Live Demo](https://jim-pokemon.netlify.app/)

This React.js application is a pokemon game. It uses React Hooks (useState, useEffect, useContext), Firebase authentication / database, and PokeAPI to fetch and display pokemon data and a list of high scores.

The app starts displaying a component that allows the user to choose the difficulty level. You can select a range of Pokemon generations to play from. It consists of a slider input to select the difficulty level, a CheckboxContainer component for selecting the generation (1 thru 8) of Pokemon, and easy / medium / hard / custom buttons. Custom button allows for an exact number of pokemon to play with on a range slider.

Each click on a pokemon card increases your score. If you click the same pokemon twice, you lose. If you click all the pokemon only once, you win. Regardless of win or lose, you are taken to a step thru game review screen, where you see the leaderboards, which are able to be queried by to get the top10 by percent or score. If logged in, you can enter your chosen username and submit your score.

Built with [PokeAPI](https://pokeapi.co/)
