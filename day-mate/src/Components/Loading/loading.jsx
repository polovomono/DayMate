import styles from "../Loading/loading.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loader = ({ redirectTo, duration }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate(redirectTo);
    }, duration);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, duration]);

  return (
    <>
      {loading ? (
        <div className={styles.dotSpinner}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      ) : null}
    </>
  );
};
export default Loader;
