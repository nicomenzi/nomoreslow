import styles from '../styles/tile.module.css';
import { Tile as TileProps } from '../models/tile';
import { containerWidth, mergeAnimationDuration, tileCountPerDimension } from '../constants/gameConstants';
import { useEffect, useState } from 'react';
import usePreviousProps from '../hooks/use-previous-props';

export default function Tile({position, value}: TileProps) {

    const [scale, setScale] = useState(1);
    const previousValue = usePreviousProps(value);
    const hasChanged = previousValue !== value;

    const positionToPixel = (position: number) => {
        return (position / tileCountPerDimension) * containerWidth;
    }

    useEffect(() => {
        if (hasChanged) {
            setScale(1.1);
            setTimeout(() => {
                setScale(1);
            }, mergeAnimationDuration);
        }
    }, [hasChanged])

    const style = {
        left: positionToPixel(position[0]),
        top: positionToPixel(position[1]),
        transform: `scale(${scale})`,
        zIndex: value
    }

    return (
        <div className={styles.tile} style={style} >
            {value}
        </div>
    );

}