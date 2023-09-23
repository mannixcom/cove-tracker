import React from 'react';
import Image from 'next/image';
import icon from '../app/icon.png';

const styles = {
  topbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F9F9',
    height: '50px',
    width: '100%',
    borderBottom: '1px solid #E5E7E9',
    position: 'sticky',
    top: 0,
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: '10px',
  },
  slogan: {
    color: '#2C3E50',
    marginLeft: '10px',
  },
};

const TopBar = () => {
  return (
    <nav className="topbar" style={styles.topbar}>
      <Image src={icon} alt="icon" width={35} height={35} />
      <h1 className="title" style={styles.title}>
        COVE TRACKER
      </h1>
      <div className="slogan" style={styles.slogan}>
        Your local coves, at your fingertips.
      </div>
    </nav>
  );
};

export default TopBar;
