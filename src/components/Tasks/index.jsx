import { Task } from '../Task';
import styles from './tasks.module.scss';

export function Tasks({ tasks, onDelete, onComplete, onEdit, onMarkAllDone, onMarkAllUndone, onDeleteAll }) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const completionRate = tasksQuantity === 0 ? 0 : (completedTasks / tasksQuantity) * 100;

  const hasReachedDueDate = (dueDate, dueTime) => {
    const currentDateTime = new Date();
    const dueDateTime = new Date(`${dueDate}T${dueTime}`);
    return currentDateTime > dueDateTime; // Using `>` instead of `>=` to mark as missed if past due time
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      onDeleteAll();
    }
  };

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>{completedTasks} of {tasksQuantity}</span>
        </div>
      </header>

      {tasksQuantity > 0 ? (
        <>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${completionRate}%` }}>
              <span className={styles.progressText}>{completionRate.toFixed(0)}%</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <button onClick={onMarkAllDone} className={styles.actionButton}>Mark All Done</button>
            <button onClick={onMarkAllUndone} className={styles.actionButton}>Mark All Undone</button>
            <button onClick={handleDeleteAll} className={styles.actionButton}>Delete All</button>
          </div>

          <div className={styles.list}>
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={onDelete}
                onComplete={onComplete}
                onEdit={onEdit}
                highlight={hasReachedDueDate(task.dueDate, task.dueTime)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className={styles.noTasksMessage}>No tasks available. Please add a task.</p>
      )}
    </section>
  );
}
