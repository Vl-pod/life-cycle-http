import  { useState } from 'react';
import Clock from './Clock/Clock';
import './Watches.css';

const Watches = () => {
  const [watchList, setWatchList] = useState([]);

  const handleAddWatch = (name, timezone) => {
    setWatchList([...watchList, { name, timezone }]);
  };

  const handleRemoveWatch = (index) => {
    const updatedWatchList = [...watchList];
    updatedWatchList.splice(index, 1);
    setWatchList(updatedWatchList);
  };

  return (
    <div className='watches__container'>
      <form onSubmit={(e) => e.preventDefault()}>
				<label>
          <p>Название</p>
          <input type="text" id="name" />
        </label>
        <label>
          <p>Временная зона</p>
          <input type="text" id="timezone" />
        </label>
        <button 
          type="submit" 
          onClick={() => {
            const name = document.getElementById('name').value;
            const timezone = document.getElementById('timezone').value;
            handleAddWatch(name, timezone);
          }}
        >
          Добавить
        </button>
      </form>
      {watchList.map((watch, index) => (
        <div key={index} className='clock'>
          <Clock name={watch.name} timezone={watch.timezone} />
          <button onClick={() => handleRemoveWatch(index)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Watches;
