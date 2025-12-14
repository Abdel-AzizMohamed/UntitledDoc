import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./popup.module.css";

function AskPopup({ title, description, type, setShowPopup, setAccept }) {
  const icons = { info: "circle-info", warning: "warning" };

  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      <div className={styles.bar}>{type}</div>
      <div className={styles.top}>
        <FontAwesomeIcon icon={icons[type]} />
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.proceed} onClick={() => setAccept(true)}>
          proceed
        </button>
        "
        <button className={styles.cancel} onClick={() => setShowPopup(false)}>
          cancel
        </button>
        "
      </div>
    </div>
  );
}

export default AskPopup;
