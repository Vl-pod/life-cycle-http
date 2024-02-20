import { useState, useEffect } from 'react';
import './Clock.css'


const Clock = ({ name, timezone }) => {
	const [time, setTime] = useState(new Date());

	const formatTime = (date) => {
		const hours = String(date.getUTCHours() + parseInt(timezone)).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		const seconds = String(date.getUTCSeconds()).padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	};

	const updateTime = () => {
		setTime(new Date());
	};

	useEffect(() => {
		const intervalId = setInterval(updateTime, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<h4 className='name'>{name}</h4>
			<span>{formatTime(time)}</span>
		</div>
	);
};

export default Clock;

