import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

import daisyuiThemes from '@/styles/daisyui-themes.json';

const themes = Object.keys(daisyuiThemes) || [''];
export const defaultTheme = themes[0];

function ThemeToggle() {
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    themeChange(false);
    setTheme(
      document.documentElement.getAttribute('data-theme') || defaultTheme
    );
  }, []);

  return (
    <div className="form-control md:ml-auto lg:mr-4">
      <label className="label cursor-pointer">
        <span className="label-text">🌞</span>
        <input
          type="checkbox"
          className="toggle-secondary toggle mx-1"
          data-toggle-theme={themes.join(',')}
          data-act-class="active"
          checked={theme !== themes[0]}
          onClick={() =>
            setTheme(theme !== defaultTheme ? defaultTheme : themes[1])
          }
          readOnly
        />
        <span className="label-text">🌚</span>
      </label>
    </div>
  );
}

export default ThemeToggle;
