import { useEffect } from 'react';

function useToggleTheme() {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'default');
  };

  return { toggleTheme };
}
export default useToggleTheme;
