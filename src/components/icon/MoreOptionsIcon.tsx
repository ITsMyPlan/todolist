interface MoreOptionsIconProps {
    onClick: () => void;
}
const MoreOptionsIcon = (props: MoreOptionsIconProps): JSX.Element => {
    const { onClick } = props;

    return (
        <button className="flex space-x-0.5" onClick={onClick}>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </button>
    );
};

export default MoreOptionsIcon;
