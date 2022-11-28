import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton({className, socket}) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    socket.emit('logout');
  }

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={className}
      onClick={logout}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
