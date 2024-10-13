
function NotFoundScreen(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px' }}>
        <a href="/" style={{ display: 'inline-block' }}>
          <img src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </a>
      </div>
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '20px'
      }}
      >
        <h1 style={{fontSize: '5rem', fontWeight: 'bold', margin: 0}}>404</h1>
        <p style={{fontSize: '1.5rem', margin: '5px 0'}}>Oops! Looks like you&apos;re lost in the city.</p>
        <span role="img" aria-label="pin"
          style={{fontSize: '5rem', marginTop: '10px', animation: 'bounce 1s infinite'}}
        >
          📍
        </span>
        <p style={{fontSize: '1.2rem', marginTop: '10px'}}>Don&apos;t worry, it happens. Let&apos;s get you back on
          track!
        </p>
        <a href="/" style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center'
        }}
        >
          <span role="img" aria-label="home" style={{marginRight: '10px'}}>🏠</span>
          Go to homepage
        </a>
      </div>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default NotFoundScreen;
