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
            expect(Object.values(state.tiles)).toEqual([
                {id: state.board[0][0], ...tile}
            ]);

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
        it("should stack tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [0,3],
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
            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(isNil(stateBefore.board[2][0])).toBeTruthy();
            expect(typeof stateBefore.board[3][0]).toBe("string");

            act(() => discpatch({type: "move_up"}));


            const [stateAfter] = result.current;
            expect(typeof stateAfter.board[0][0]).toBe("string");
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[2][0])).toBeTruthy();
            expect(isNil(stateAfter.board[3][0])).toBeTruthy();

        });
        it("should merge tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [0,3],
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
            expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
            expect(isNil(stateBefore.board[2][0])).toBeTruthy();
            expect(stateBefore.tiles[stateBefore.board[3][0]].value).toBe(2);

            act(() => discpatch({type: "move_up"}));


            const [stateAfter] = result.current;
            expect(stateAfter.tiles[stateAfter.board[0][0]].value).toBe(4);
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[2][0])).toBeTruthy();
            expect(isNil(stateAfter.board[3][0])).toBeTruthy();

        });

    });

    describe("move_down", () => {
        it("should move tiles to the bottom", () => {
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

            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(typeof stateBefore.board[3][1]).toBe("string");

            act(() => discpatch({type: "move_down"}));

            const [stateAfter] = result.current;
            
            expect(typeof stateAfter.board[3][0]).toBe("string");
            expect(typeof stateAfter.board[3][1]).toBe("string");
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
        });
        it("should stack tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [0,3],
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
            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(isNil(stateBefore.board[2][0])).toBeTruthy();
            expect(typeof stateBefore.board[3][0]).toBe("string");

            act(() => discpatch({type: "move_down"}));


            const [stateAfter] = result.current;
            expect(isNil(stateAfter.board[0][0])).toBeTruthy();
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[2][0])).toBeTruthy();
            expect(typeof stateAfter.board[3][0]).toBe("string");


        });
        it("should merge tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [0,3],
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
            expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
            expect(isNil(stateBefore.board[2][0])).toBeTruthy();
            expect(stateBefore.tiles[stateBefore.board[3][0]].value).toBe(2);

            act(() => discpatch({type: "move_down"}));


            const [stateAfter] = result.current;
            expect(isNil(stateAfter.board[0][0])).toBeTruthy();
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[2][0])).toBeTruthy();
            expect(stateAfter.tiles[stateAfter.board[3][0]].value).toBe(4);


        });
    });

    describe("move_left", () => {
        it("should move tiles to the left", () => {
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
            expect(isNil(stateBefore.board[3][0])).toBeTruthy();

            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(typeof stateBefore.board[3][1]).toBe("string");

            act(() => discpatch({type: "move_left"}));


            const [stateAfter] = result.current;
            expect(typeof stateAfter.board[1][0]).toBe("string");
            expect(typeof stateAfter.board[3][0]).toBe("string");
            expect(isNil(stateAfter.board[3][1])).toBeTruthy();

        });
        it("should stack tiles on top of eachother", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [3,1],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => {
                discpatch({type: "create_tile", tile: tile1})
                discpatch({type: "create_tile", tile: tile2})
            });

            const [stateBefore] = result.current;
            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(isNil(stateBefore.board[1][1])).toBeTruthy();
            expect(isNil(stateBefore.board[1][2])).toBeTruthy();
            expect(typeof stateBefore.board[1][3]).toBe("string");

            act(() => discpatch({type: "move_left"}));


            const [stateAfter] = result.current;
            expect(typeof stateAfter.board[1][0]).toBe("string");
            expect(isNil(stateAfter.board[1][1])).toBeTruthy();
            expect(isNil(stateAfter.board[1][2])).toBeTruthy();
            expect(isNil(stateAfter.board[1][3])).toBeTruthy();


        });
        it("should merge tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [3,1],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => {
                discpatch({type: "create_tile", tile: tile1})
                discpatch({type: "create_tile", tile: tile2})
            });

            const [stateBefore] = result.current;
            expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
            expect(isNil(stateBefore.board[1][1])).toBeTruthy();
            expect(isNil(stateBefore.board[1][2])).toBeTruthy();
            expect(stateBefore.tiles[stateBefore.board[1][3]].value).toBe(2);

            act(() => discpatch({type: "move_left"}));


            const [stateAfter] = result.current;
            expect(stateAfter.tiles[stateAfter.board[1][0]].value).toBe(4);
            expect(isNil(stateAfter.board[1][1])).toBeTruthy();
            expect(isNil(stateAfter.board[1][2])).toBeTruthy();
            expect(isNil(stateAfter.board[1][3])).toBeTruthy();


        });
        

    });

    describe("move_right", () => {
        it("should move tiles to the right", () => {
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
            expect(isNil(stateBefore.board[1][3])).toBeTruthy();
            expect(isNil(stateBefore.board[3][3])).toBeTruthy();

            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(typeof stateBefore.board[3][1]).toBe("string");

            act(() => discpatch({type: "move_right"}));


            const [stateAfter] = result.current;
            expect(typeof stateAfter.board[1][3]).toBe("string");
            expect(typeof stateAfter.board[3][3]).toBe("string");
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[3][1])).toBeTruthy();

        });
        it("should stack tiles on top of eachother", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [3,1],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => {
                discpatch({type: "create_tile", tile: tile1})
                discpatch({type: "create_tile", tile: tile2})
            });

            const [stateBefore] = result.current;
            expect(typeof stateBefore.board[1][0]).toBe("string");
            expect(isNil(stateBefore.board[1][1])).toBeTruthy();
            expect(isNil(stateBefore.board[1][2])).toBeTruthy();
            expect(typeof stateBefore.board[1][3]).toBe("string");

            act(() => discpatch({type: "move_right"}));


            const [stateAfter] = result.current;
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[1][1])).toBeTruthy();
            expect(isNil(stateAfter.board[1][2])).toBeTruthy();
            expect(typeof stateAfter.board[1][3]).toBe("string");



        });
        it("should merge tiles with the same values", () => {
            const tile1: Tile = {
                position: [0,1],
                value: 2
            }

            const tile2: Tile = {
                position: [3,1],
                value: 2
            }

            const {result} = renderHook(() => useReducer(gamerReducer, initialState))
            const [, discpatch] = result.current;

            act(() => {
                discpatch({type: "create_tile", tile: tile1})
                discpatch({type: "create_tile", tile: tile2})
            });

            const [stateBefore] = result.current;
            expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
            expect(isNil(stateBefore.board[1][1])).toBeTruthy();
            expect(isNil(stateBefore.board[1][2])).toBeTruthy();
            expect(stateBefore.tiles[stateBefore.board[1][3]].value).toBe(2);

            act(() => discpatch({type: "move_right"}));


            const [stateAfter] = result.current;
            expect(isNil(stateAfter.board[1][0])).toBeTruthy();
            expect(isNil(stateAfter.board[1][1])).toBeTruthy();
            expect(isNil(stateAfter.board[1][2])).toBeTruthy();
            expect(stateAfter.tiles[stateAfter.board[1][3]].value).toBe(4);



        });

    });
    
    
    
    
}); 