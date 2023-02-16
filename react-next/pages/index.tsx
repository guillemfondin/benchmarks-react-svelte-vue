import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getBaseValue, saveValue, type Todo, TodoContext } from "../src/store/TodoContext";
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>(getBaseValue);

  useEffect(() => {
    saveValue(todos);
  }, [todos]);

  const add = () => {
    setTodos([{text: newTodo}, ...todos]);
    setNewTodo('');
  }

  const remove = (todo: Todo) => {
    setTodos(todos.filter((t: Todo) => t !== todo));
  }

  return (
    <TodoContext.Provider value={[todos, setTodos] as any}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/vite.svg" />
      </Head>

      <main className={styles.container}>
        <input type="text" value={newTodo} onChange={({target}) => setNewTodo(target.value)} placeholder="Add a new element"/>
        <button type="button" disabled={newTodo.length === 0} onClick={add}>Add</button>

        <ul>
          {todos.map((todo, index) => (
            <div key={index} className="todo__item">
              <p>{todo.text}</p>
              <button onClick={() => remove(todo)}>X</button>
            </div>
          ))}
        </ul>
      </main>
    </TodoContext.Provider>
  );
}

export default Home
