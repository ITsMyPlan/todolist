import { desktopBackground } from './config/background';

const App = (): JSX.Element => {
    const dark = false; // TODO:: 다크모드

    return (
        <div
            className="bg-cover h-screen w-screen"
            style={{
                backgroundImage: `url(${dark ? desktopBackground.dark : desktopBackground.light})`,
            }}
        ></div>
    );
};

export default App;
