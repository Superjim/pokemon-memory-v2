# Pokemon Memory Card Game

:point_right:[Live Demo](https://jim-pokemon.netlify.app/)

This React.js application is a pokemon game. It uses React Hooks (useState, useEffect), firebase, and pokeapi to fetch and display pokemon data and a list of high scores.

The app starts displaying a component that allows the user to choose the difficulty level. It consists of a slider input to select the difficulty level, a CheckboxContainer component for selecting the generation (1 thru 8) of Pokemon, and a start button. The difficulty level represents the number of Pokemon that will be displayed in the game. You can select a range of Pokemon generations to play from.

Each click on a pokemon card increases your score. If you click the same pokemon twice, you lose. If you click all the pokemon only once, you win. Regardless, you are taken to a step-through game review screen, where if you are logged in, you will see a leaderboard of the top10 scores. There is an option to fetch users with either the highest scores, or the highest percentages. You can enter your chosen username and submit your score.

The game has a header component that displays the score and highscore of the game and allows the user to sign in and out of the game using firebase authentication.

Built with [PokeAPI](https://pokeapi.co/)
