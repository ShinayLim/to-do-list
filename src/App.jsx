import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask({ title, dueDate, dueTime }) {
    if (title && dueDate && dueTime) {
      setTasksAndSave([...tasks, {
        id: crypto.randomUUID(),
        title,
        dueDate,
        dueTime,
        isCompleted: false
      }]);
    }
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function markAllDone() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: true
    }));
    setTasksAndSave(newTasks);
  }

  function markAllUndone() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: false
    }));
    setTasksAndSave(newTasks);
  }

  function deleteAllTasks() {
    setTasksAndSave([]);
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onMarkAllDone={markAllDone}
        onMarkAllUndone={markAllUndone}
        onDeleteAll={deleteAllTasks}
      />
    </>
  );
}

export default App;
