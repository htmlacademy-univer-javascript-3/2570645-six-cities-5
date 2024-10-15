import styles from './not-found-screen.module.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/" style={{ display: 'inline-block' }}>
          <img src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </a>
      </div>
      <div className={styles.main}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Looks like you&apos;re lost in the city.</p>
        <span role="img" aria-label="pin" className={styles.pin}>
          📍
        </span>
        <p className={styles.secondaryMessage}>
          Don&apos;t worry, it happens. Let&apos;s get you back on track!
        </p>
        <a href="/" className={styles.button}>
          <span role="img" aria-label="home" style={{ marginRight: '10px' }}>🏠</span>
          Go to homepage
        </a>
      </div>
    </div>
  );
}

export default NotFoundScreen;
