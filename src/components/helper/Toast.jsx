import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../redux/message';
import './Toast.css';

const Toast = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('info');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('ℹ️');

  useEffect(() => {
    if (message) {
      setShow(true);

      // Determine message type and styling
      const messageLower = message.toLowerCase();

      if (messageLower.includes('success') || messageLower.includes('saved') ||
          messageLower.includes('updated') || messageLower.includes('created') ||
          messageLower.includes('deleted')) {
        setType('success');
        setTitle('Success');
        setIcon('✓');
      } else if (messageLower.includes('error') || messageLower.includes('failed') ||
                 messageLower.includes('invalid') || messageLower.includes('not found')) {
        setType('error');
        setTitle('Error');
        setIcon('✕');
      } else if (messageLower.includes('warning') || messageLower.includes('caution')) {
        setType('warning');
        setTitle('Warning');
        setIcon('⚠');
      } else {
        setType('info');
        setTitle('Information');
        setIcon('ℹ');
      }

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          dispatch(clearMessage());
        }, 400);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      dispatch(clearMessage());
    }, 400);
  };

  if (!show || !message) return null;

  return (
    <div className={`toast-container ${show ? 'show' : ''}`}>
      <div className={`toast-content toast-${type}`}>
        <div className="toast-progress"></div>
        <div className="toast-icon">
          {icon}
        </div>
        <div className="toast-message">
          <span className="toast-title">{title}</span>
          {message}
        </div>
        <button className="toast-close" onClick={handleClose} aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;