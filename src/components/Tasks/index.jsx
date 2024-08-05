import { Task } from '../Task';
import styles from './tasks.module.scss';

export function Tasks({ tasks, onDelete, onComplete, onMarkAllDone, onMarkAllUndone, onDeleteAll }) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const completionRate = tasksQuantity === 0 ? 0 : (completedTasks / tasksQuantity) * 100;

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
            <button onClick={onDeleteAll} className={styles.actionButton}>Delete All</button>
          </div>

          <div className={styles.list}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} />
            ))}
          </div>
        </>
      ) : (
        <p className={styles.noTasksMessage}>No tasks available. Please add a task.</p>
      )}
    </section>
  );
}
