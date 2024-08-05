import styles from './task.module.scss';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

export function Task({ task, onDelete, onComplete }) {
  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <div className={styles.taskDetails}>
        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>
        <div className={styles.dueDetails}>
          <span>{task.dueDate}</span>
          <span>{task.dueTime}</span>
        </div>
      </div>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
