/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import reducers, { createTodo, deleteTodo, updateTodo } from "../duck";

describe("Todo Actions", () => {
  describe("createTodo", () => {
    it("should create todo action with default incomplete", async () => {
      expect(createTodo("Todo item")).toEqual({
        type: "todo/CREATE",
        payload: {
          id: expect.any(String),
          text: "Todo item",
          complete: false,
        },
      });
    });

    it("should create todo action with complete", async () => {
      expect(createTodo("Todo item", true)).toEqual({
        type: "todo/CREATE",
        payload: {
          id: expect.any(String),
          text: "Todo item",
          complete: true,
        },
      });
    });
  });

  describe("deleteTodo", () => {
    it("should create todo action", async () => {
      expect(deleteTodo("todo-id-1")).toEqual({
        type: "todo/DELETE",
        payload: "todo-id-1",
      });
    });
  });

  describe("updateTodo", () => {
    it("should create todo action", async () => {
      expect(
        updateTodo({
          id: "todo-id-1",
          text: "Todo item",
        })
      ).toEqual({
        type: "todo/UPDATE",
        payload: {
          id: "todo-id-1",
          text: "Todo item",
        },
      });
    });
  });
});

describe("Todo Reducers", () => {
  describe("createTodo", () => {
    it("should add todo to state", async () => {
      expect(reducers([], createTodo("Todo item"))).toEqual([
        {
          id: expect.any(String),
          text: "Todo item",
          complete: false,
        },
      ]);
    });
  });

  describe("deleteTodo", () => {
    it("should not remove missing todo", async () => {
      expect(reducers([], deleteTodo("todo-id"))).toEqual([]);

      expect(
        reducers(
          [
            {
              id: "1",
              text: "1",
            },
          ],
          deleteTodo("Todo item")
        )
      ).toEqual([
        {
          id: "1",
          text: "1",
        },
      ]);
    });

    it("should remove todo from state", async () => {
      expect(
        reducers(
          [
            {
              id: "1",
              text: "1",
            },
            {
              id: "2",
              text: "2",
            },
          ],
          deleteTodo("1")
        )
      ).toEqual([
        {
          id: "2",
          text: "2",
        },
      ]);

      expect(
        reducers(
          [
            {
              id: "1",
              text: "1",
            },
            {
              id: "2",
              text: "2",
            },
          ],
          deleteTodo("2")
        )
      ).toEqual([
        {
          id: "1",
          text: "1",
        },
      ]);
    });
  });

  describe("updateTodo", () => {
    it("should update state", async () => {
      expect(
        reducers(
          [
            {
              id: "1",
              text: "1",
            },
          ],
          updateTodo({ id: "1", text: "update" })
        )
      ).toEqual([
        {
          id: "1",
          text: "update",
        },
      ]);
    });

    it("should not update state if missing id", async () => {
      expect(
        reducers(
          [
            {
              id: "1",
              text: "1",
            },
          ],
          updateTodo({ id: "missing-id", text: "update" })
        )
      ).toEqual([
        {
          id: "1",
          text: "1",
        },
      ]);
    });
  });
});
