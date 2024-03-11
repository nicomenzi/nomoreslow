import { use, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { Tile as TileModel } from '../models/tile';
import styles from '../styles/Board.module.css';
import Tile from './tile';
import { mergeAnimationDuration } from '../constants/gameConstants';
import { GameContext } from '../context/game-context';

export default function Board() {

    const { appendRandomTile, getTiles, dispatch} = useContext(GameContext);

    const initialized = useRef(false);

    const handleKeyDown = useCallback( (e: KeyboardEvent) => {
        e.preventDefault();

        switch (e.code) {
            case "ArrowUp": {
                dispatch({type: "move_up"});
                break;
            }
            case "ArrowDown": {
                dispatch({type: "move_down"});
                break;
            }
            case "ArrowLeft": {
                dispatch({type: "move_left"});
                break;
            }
            case "ArrowRight": {
                dispatch({type: "move_right"});
                break;
            }
            
        }
        setTimeout(() => {
            dispatch({type: "clean_up"})
            appendRandomTile();
        }, mergeAnimationDuration); 
    }, [appendRandomTile, dispatch]);

    const renderGrid = () => {
        const cells: JSX.Element[] = [];
        const totalCellsCount = 16;
        for (let i = 0; i < totalCellsCount; i++) {
            cells.push(<div key={i} className={styles.cell}></div>);
        }
        return cells;
    }; 

    const rednerTiles = () => {
        return getTiles().map(
            (tile: TileModel) => {
            return <Tile key={`${tile.id}`} {...tile} />
        });
    }


    useEffect(() => {
        if (initialized.current === false) {
            dispatch({type: "create_tile", tile: {position: [0,1], value: 2}})
            dispatch({type: "create_tile", tile: {position: [0,2], value: 2}})
            initialized.current = true;
        }
    }, [dispatch])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }

    }, [handleKeyDown])



    return (
        <div className={styles.board}>
            <div className={styles.tiles}>
            {rednerTiles()}
            </div>
           <div className={styles.grid}>
                {renderGrid()}
            </div>
        </div>
    );
}