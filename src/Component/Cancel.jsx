import React from 'react';

const Cancel = () => {
  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.message}>Sorry, something went wrong!</h2>
        <p style={styles.description}>
          The page you were looking for cannot be found or the payment process was canceled.
        </p>
        <button style={styles.button} onClick={() => (window.location.href = '/')}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom, #ff416c, #ff4b2b)',
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
  },
  errorBox: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 1.5s ease',
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: 'bold',
    margin: '0',
    textShadow: '2px 4px 6px rgba(0, 0, 0, 0.5)',
  },
  message: {
    fontSize: '28px',
    fontWeight: '600',
    margin: '20px 0 10px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ff4b2b',
    background: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.3s',
  },
};

export default Cancel;
