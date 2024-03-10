import { act,renderHook } from "@testing-library/react";
import { Tile } from "../../models/tile";
import { useReducer } from "react";
import gamerReducer, { initialState } from "../../reducers/game-reducer";
import { init } from "next/dist/compiled/webpack/webpack";
import { isNil } from "lodash";

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

    describe("move_up", () => {
        it("should move tiles to the top", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [1,3],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => {
                discpatch({type: "create_tile", tile: tile1})
                discpatch({type: "create_tile", tile: tile2})
            });

            const [stateBefore] = result.current;
            expect(isNil(stateBefore.board[0][0])).toBeTruthy();
            expect(isNil(stateBefore.board[0][1])).toBeTruthy();

            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(typeof stateBefore.board[3][1]).toBe("string");

            act(() => discpatch({type: "move_up"}));


            const [stateAfter] = result.current;
            expect(typeof stateAfter.board[0][0]).toBe("string");
            expect(typeof stateAfter.board[0][1]).toBe("string");
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[3][1])).toBeTruthy();




        });

    });
}); 