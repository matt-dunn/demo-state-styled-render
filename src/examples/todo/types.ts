/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

export type TodoItem = {
  id: string;
  text: string;
  complete?: boolean;
}

export type TodoItems = TodoItem[];
