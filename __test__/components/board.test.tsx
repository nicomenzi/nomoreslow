import Board from "../../components/board";
import { render } from "@testing-library/react";
import GameProvider from "../../context/game-context";

describe('Board', () => {
    it('should render 16 cells', () => {
        const {container} = render(<GameProvider><Board /></GameProvider>);
        const cellElements = container.querySelectorAll('.cell');

        expect(cellElements.length).toBe(16);
    });

    it('should render board with 2 tiles', () => {
        const {container} = render(<GameProvider><Board /></GameProvider>);
        const tiles = container.querySelectorAll('.tile');

        expect(tiles.length).toBe(2);
    });
})