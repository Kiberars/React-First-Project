import { useState } from 'react';

function Welcome(props) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('them');
    if (savedTheme === 'Dark') return true;
    if (savedTheme === 'Light') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('them', newTheme ? 'Dark' : 'Light');
  };

  return (
    <div className={isDark ? 'welcome-dark' : 'welcome-light'}>
      <h2>Добро пожаловать, {props.name}</h2>
      <p>Это новый реакт компонент</p>
      <button onClick={toggleTheme}>{isDark ? '🌙 Темная тема' : '☀️ Светлая тема'}</button>
      {props.message && <p className="message">{props.message}</p>}
    </div>
  );
}

export default Welcome;
