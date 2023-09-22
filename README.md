# ekreb

**name**: thao hoang
**email**: thao.h.hoang@vanderbilt.edu

## sypnosis

a scramble game! randomly retrieve words from a .csv file, scramble it and prompt user to guess. user decides how many turns they want to play. afterwards, display game statistics.

**technology:** React, NodeJS, Express, tailwindcss

## setup

### clone this repository to your local machine

### backend

1. navigate to backend directory: `cd api`
2. install backend dependencies: `yarn install` or `npm install`
3. start the backend server: `yarn start` or `npm start`

### frontend

1. navigate to the frontend director: `cd client` (`cd ..` as needed)
2. install frontend dependencies: `yarn install` or `npm install`
3. start the frontend development server: `yarn dev` or `npm run dev`
   you should be able to access your web browser at http://localhost:5173

## gameplay information

<ol>
    <li>manually start the frontend and backend servers.</li>
    <li>click play. set the number of turns per round you would like to play.
    <li>click the Search icon to submit your guess.</li>
    <li>click the Question icon to get a hint.</li>
    <li>after completing your set number of turns, you will be prompted to continue or stop. the score will be displayed if you choose the latter</li>
    <li>at any point, you can click the red button in the upper right corner to exit the game.</li>
</ol>
NOTE: for debugging/testing, you can inspect element while playing the game to see the un-scrambled word.

## areas of growth

i have ambitious plans to include more features, like a competitive play mode, wordlist-creating ability, and even an impossible-hint mechanism (retrieving definition but in russian, for instance). i finally decided against it as i want to really (hopefully) nail the basics, but i will probably realize those ideas after!
additionally, i think with more experience, i will be able to improve my code's organization and scalability.

## reflection

this project allows me to apply and build on my web-dev skills. i've thoroughly enjoyed the whole process, from designing the frontend (lots of watching css animation tutorials on ytb) to manipulating server-side's logic. i was able to challenge myself by experimenting with new tools like tailwindcss and vite, and by striving to write organized and maintainable code. i hope that when reviewing my project, Change++ will be able to see the effort i've put in, my strengths in web dev, and my commitment to grow as a programmer!
