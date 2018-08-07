import React from 'react';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
import { withHandlers, compose } from 'recompose';

const _ToastifyTest = ({ onNotify, onClear }) => {
  return (
    <div>
      <button onClick={onNotify}>Notify !</button>
      <button onClick={onClear}>Clear !</button>
      <ToastContainer />
    </div>
  );
};

const _handlers = withHandlers({
  onNotify: (props) => (event) =>
    toast('Wow so easy !', { transition: _zoomTransition }),
  onClear: (props) => (event) => toast.dismiss(),
});

const _zoomTransition = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: 0,
});

export const ToastifyTest = compose(_handlers)(_ToastifyTest);
