import React, {PureComponent} from 'react';
import ButtonControl from "../button-control/button-control";
import styled from "@emotion/styled";

interface Props {
    time: number,
    restTime: number
}

interface State {
    limit: number | null,
    text: string,
    exercise: number,
    started: boolean,
    next: string,
    exercises: string[],
    roundsCount: number
}

class FatBurn extends PureComponent<Props, State> {
    private readonly _time: number;
    private readonly _restTime: number;
    private _timeInt: any;

    constructor(props: Readonly<Props>) {
        super(props);
        const {time, restTime} = this.props;
        this._time = time;
        this._restTime = restTime;
        this._timeInt = null;
        this.state = {
            limit: null,
            text: '',
            exercise: 0,
            started: false,
            next: '',
            exercises: [],
            roundsCount: 3
        };
    }

    get _exercises() {
        return this.state.exercises
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

    _loadExercises() {
        const savedExercises = localStorage.getItem('fat_burn_exercises');
        if (savedExercises) {
            const exercises = JSON.parse(savedExercises);
            // @ts-ignore
            const filteredExercises = [...new Set(exercises)]
            this.setState((prevState) => ({
                ...prevState,
                exercises: filteredExercises
            }))
        }
    }

    _saveExercises(value: string) {
        const {roundsCount} = this.state;
        // @ts-ignore
        const exercises = value.split('\n').map(el => el.trim()).filter(el => el).reduce((acc, exercise) => {
            // @ts-ignore
            acc.push(...new Array(roundsCount).fill(exercise));
            return acc;
        }, []);
        this.setState({ exercises });
        localStorage.setItem('fat_burn_exercises', JSON.stringify(exercises));
    }

    componentDidMount(): void {
        this._loadExercises()
    }

    render() {
        const {limit, text, started, next, exercises, roundsCount} = this.state;

        if (!started) {
            return (
                <>
                    <p>{roundsCount} rounds of exercises:</p>
                    <TextAreaStyled
                        name="exercises"
                        defaultValue={exercises.toString().replace(/,/g, '\n')}
                        placeholder={'one by line'}
                        onBlur={(e) => this._saveExercises(e.target.value)}/>
                    <ButtonControl text="Train" disabled={!exercises.length} onClick={() => {
                        this.setState({ started: true });
                        this._sport()
                    }} />
                    <LinksStyled>
                        <li><a href="?sport=40&rest=20">40/20</a></li><li><a href="?sport=60&rest=30">60/30</a></li>
                    </LinksStyled>
                </>
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

const LinksStyled = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0;
    font-size: 80%;
    
    @media (min-width: 961px) {
      font-size: 50%;
    }
    
    a {
        color: #000;
        text-decoration: none;
    }
    
    li + li {
        margin-left: 1.5em;
    }
`;

const TextAreaStyled = styled.textarea`
    display: flex;
    resize: none;
    border: 1px dotted;
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
    padding: 5px 10px;
    @media (min-width: 768px) {
        width: 50%;
        height: 300px;
        font-size: 20px;
    }
`;

export default FatBurn
