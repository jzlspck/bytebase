import type { FC } from 'react';
import { Outlet } from 'react-router';

const App: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
