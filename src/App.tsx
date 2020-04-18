import React from 'react';
import FatBurn from "./components/fat-burn/fat-burn";
// eslint-disable-next-line no-restricted-globals
// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const params = new Map(location.search.slice(1).split('&').map(kv => kv.split('=')));
const sport = +params.get('sport');
const rest = +params.get('rest');

const exercises = [''];

const App = () => (
    <FatBurn
        time={sport > 0 ? sport + 1 : 41}
        restTime={rest > 0 ? rest + 1 : 21}
        exercises={exercises}
    />
);

export default App;
