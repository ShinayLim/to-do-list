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
    } else {
      alert("Please fill out all fields.");
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

  function markAllTasksDone() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: true
    }));
    setTasksAndSave(newTasks);
  }

  function markAllTasksUndone() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: false
    }));
    setTasksAndSave(newTasks);
  }

  function deleteAllTasks() {
    setTasksAndSave([]);
  }

  function editTask(taskId, newTitle, newDueDate, newDueTime) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle,
          dueDate: newDueDate,
          dueTime: newDueTime
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onEdit={editTask}
        onMarkAllDone={markAllTasksDone}
        onMarkAllUndone={markAllTasksUndone}
        onDeleteAll={deleteAllTasks}
      />
    </>
  );
}

export default App;
