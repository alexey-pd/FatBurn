import React, {PureComponent} from 'react';
import ButtonControl from "../button-control/button-control";

interface Props {
    time: number,
    restTime: number,
    exercises: string[]
}

interface State {
    limit: number | null,
    text: string,
    exercise: number,
    started: boolean,
    next: string
}

class FatBurn extends PureComponent<Props, State> {
    private readonly _time: number;
    private readonly _restTime: number;
    private _timeInt: any;
    private readonly _exercises: string[];

    constructor(props: Readonly<Props>) {
        super(props);
        const {time, restTime, exercises} = this.props;
        this._time = time;
        this._restTime = restTime;
        this._exercises = exercises;
        this._timeInt = null;
        this.state = {
            limit: null,
            text: '',
            exercise: 0,
            started: false,
            next: ''
        };
    }

    _write(limit: number, text: string) {
        this.setState((prevState) => {
            return {
                ...prevState,
                limit,
                text
            }
        });
    }

    _timer(time: number, header: string, callback: () => void) {
        let limit = time;
        this._timeInt = setInterval(() => {
            if (limit === 0) {
                clearInterval(this._timeInt);
                callback();
                return;
            }
            limit--;
            this._write(limit, header);
        }, 1000);
    }

    _rest() {
        this._timer(this._restTime, 'Rest', () => {
            this._sport();
        });
    }

    _sport() {
        const {exercise} = this.state;
        if (exercise >= this._exercises.length) {
            this._write(0, 'Hooray! Finish!');
            return;
        }

        this._timer(this._time, `${this._exercises[exercise]}`, () => {
            this.setState((prevState) => ({
                ...prevState,
                exercise: exercise + 1
            }));
            this._rest();
            return;
        });

        const next = this._exercises[exercise + 1] || 'Finish';

        this.setState({ next })
    }

    render() {
        const {limit, text, started, next} = this.state;

        if (!started) {
            return (
                <ButtonControl text="Train" onClick={() => {
                    this.setState({ started: true });
                    this._sport()
                }} />
            );
        }

        return (
            <>
                <strong>{text}</strong>
                <h1>{limit}</h1>
                <p>{next}</p>
            </>
        )
    }
}

export default FatBurn
