
export const Browser = ({width='670', height= '480'}) => {
    const rectWidth = (parseInt(width) - 1).toString();
    const rectHeight = (parseInt(height) - 1).toString();

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='0.5' y='0.5' width={rectWidth} height={rectHeight} rx='3.5' fill='white' stroke='black'/>
            <circle cx='22' cy='22' r='5.5' stroke='black'/>
            <circle cx='46' cy='22' r='5.5' stroke='black'/>
            <circle cx='70' cy='22' r='5.5' stroke='black'/>
        </svg>
    );
};

