import React from 'react';
import FatBurn from "./components/fat-burn/fat-burn";
import LayoutScreen from "./components/layout-screen/layout-screen";
// eslint-disable-next-line no-restricted-globals
// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const params = new Map(location.search.slice(1).split('&').map(kv => kv.split('=')));
const sport = +params.get('sport');
const rest = +params.get('rest');

interface Props {
    exercises: string[] | null
}

class App extends React.Component<Props> {
    render() {
        const {exercises} = this.props;

        if (!exercises) {
            return (
                <LayoutScreen>
                    <p>Упражнения не загружены</p>
                </LayoutScreen>)
        }

        return (
            <LayoutScreen>
                <FatBurn
                    time={sport > 0 ? sport + 1 : 41}
                    restTime={rest > 0 ? rest + 1 : 21}
                    exercises={exercises}
                />
            </LayoutScreen>
        );
    }
}

export default App;
