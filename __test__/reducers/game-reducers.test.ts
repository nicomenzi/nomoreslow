import { act,renderHook } from "@testing-library/react";
import { Tile } from "../../models/tile";
import { useReducer } from "react";
import gamerReducer, { initialState } from "../../reducers/game-reducer";
import { init } from "next/dist/compiled/webpack/webpack";

describe("game-reducers", () => {
    describe("create_tile", () => {
        it("should create a new tile", () => {
            const tile: Tile = {
                position: [0,0],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => discpatch({type: "create_tile", tile}))

            const [state,] = result.current;

            expect(state.board[0][0]).toBeDefined();
            expect(Object.values(state.tiles)).toEqual([tile]);

        });
    });

});