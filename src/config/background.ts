interface IDesktopBackground {
    light: string;
    dark: string;
}
import desktopLight from '../assets/desktop/desktopLight.png';
import desktopDark from '../assets/desktop/desktopDark.png';

export const desktopBackground: IDesktopBackground = {
    light: desktopLight,
    dark: desktopDark,
};
