import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const ROUNDS_COUNT = +(process.env.REACT_APP_ROUNDS_COUNT || 3);

const SpreadSheet = {
    ID: process.env.REACT_APP_GOOGLE_TABLE_ID,
    PAGE: 1
};

interface Exercise {
    content: {
        $t: string
    }
}

const getExercises = async () => {
    const {data: { feed : { entry }}} = await axios.get(`https://spreadsheets.google.com/feeds/cells/${SpreadSheet.ID}/${SpreadSheet.PAGE}/public/full?alt=json`);
    const exercises = entry.reduce((acc: [], el: Exercise) => {
        // @ts-ignore
        acc.push(...new Array(ROUNDS_COUNT).fill(el.content.$t));
        return acc
    }, []);

    ReactDOM.render(
        <React.StrictMode>
            <App exercises={exercises} />
        </React.StrictMode>,
        document.getElementById('root')
    );
};

getExercises();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
