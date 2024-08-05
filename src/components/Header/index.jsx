import todoLogo from '../../assets/todoLogo.svg';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';

export function Header({ handleAddTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask({ title, dueDate, dueTime });
    setTitle('');
    setDueDate('');
    setDueTime('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeDueDate(event) {
    setDueDate(event.target.value);
  }

  function onChangeDueTime(event) {
    setDueTime(event.target.value);
  }

  return (
    <header className={styles.header}>
      <h1>My Tasks</h1>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
          required
        />
        <input
          type="date"
          onChange={onChangeDueDate}
          value={dueDate}
          required
        />
        <input
          type="time"
          onChange={onChangeDueTime}
          value={dueTime}
          required
        />
        <button type="submit">Create <AiOutlinePlusCircle size={20} /></button>
      </form>
    </header>
  );
}
