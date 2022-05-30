import React from 'react';
import './Header.css';

const Header: React.FC<{children: JSX.Element | JSX.Element[]}> = (props) => {
  return <header>
      {props.children}
  </header>
}

export default Header