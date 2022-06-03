import React from 'react';
import Quiz from './Quiz'
import '../App.css'

const Modal = ({ open, onClose, corrAnswer, close }) => {
    const pic_url = 'https://media3.giphy.com/media/3ohs88j0jPszpGCbYY/giphy.gif?cid=ecf05e47byzymrk8fgnethjjtzzmxwacu8p1ty49dzhsmv1n&rid=giphy.gif&ct=g'
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'>
        <img src={pic_url} alt='/' />
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <h1 className="correctAnswer">Correct answer:</h1>
            <p className ="EinsteinAnswer">{corrAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;