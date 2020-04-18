import React, { PureComponent } from 'react';
import styled from '@emotion/styled'

interface Props {
    time: number,
    restTime: number,
    exercises: string[]
}

interface State {
    limit: string,
    text: string,
    exercise: number
}

class FatBurn extends PureComponent<Props, State> {
    private readonly _time: number;
    private readonly _restTime: number;
    private _timeInt: any;
    private readonly _exercises: string[];
    constructor(props: Readonly<Props>) {
        super(props);
        const { time, restTime, exercises } = this.props;
        this._time = time;
        this._restTime = restTime;
        this._exercises = exercises;
        this._timeInt = null;
        this.state = {
            limit: '',
            text: '',
            exercise: 0
        };
        this._sport();
    }
    _write(limit: number, text: string) {
        // @ts-ignore
        this.setState({ limit, text });
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
        this._timer(this._restTime, 'Отдых', () => {
            this._sport();
        });
    }
    _sport() {
        const { exercise } = this.state;
        if (exercise >= this._exercises.length) {
            this._write(0, 'УРА! Финиш!');
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
    }

    render() {
        const { limit, text } = this.state;
        return limit && text ? (
                <FatBurnStyled>
                    <h1>{limit}</h1>
                    <p>{text}</p>
                </FatBurnStyled>
        ) : (
            <p>Упражнения не загружены</p>
        )
    }
}

const FatBurnStyled = styled.div`
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    font-size: 30px;
    justify-content: space-between;
    @media (min-width: 960px) {
        font-size: 70px;
    }
    
    button {
        color: #fff;
        background: green;
        font-size: inherit;
    }
`;

export default FatBurn
