import styles from '../styles/tile.module.css';
import { Tile as TileProps } from '../models/tile';
import { containerWidth, tileCountPerDimension } from '../constants/gameConstants';

export default function Tile({position, value}: TileProps) {

    const positionToPixel = (position: number) => {
        return (position / tileCountPerDimension) * containerWidth;
    }

    const style = {
        left: positionToPixel(position[0]),
        top: positionToPixel(position[1])
    }

    return (
        <div className={styles.tile} style={style} >{value}</div>
    );

}