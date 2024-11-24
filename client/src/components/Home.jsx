import React from 'react';
import { useState, useEffect, useRef } from 'react';
// import { name } from '../constants';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const Home = () => {

	const ref = useRef(0);
	const [text, setText] = useState('');
	const [user, setUser] = useState(null);
	let name = localStorage.getItem('name') || 'user';

	// useEffect(  () => {
	// 	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
	// 	  setUser(currentUser);
	// 	});
	// 	console.log(user)
	// 	name = user?.displayname;
	// 	return () => unsubscribe();
	//   }, [user]);

	useEffect(() => {

		
		const interval = setInterval(() => {
			if (ref.current < name?.length) {
				ref.current++;
				setText(() => text + name[ref.current - 1]);
			}
		}, 500);
		return () => clearInterval(interval);
	}, [text]);

	return (
		<div className='area relative z-0 bg-white w-screen h-screen'>
			<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<div className='hero relative h-[calc(100vh)] flex justify-center items-center text-black' id='hero'>
				<div className='pt-4 h-36 backdrop-blur-sm rounded-3xl'>
					<h1 className='text-6xl sm:text-7xl font-extrabold mt-2'>Hi, I'm&nbsp;<span className='text-blue-600 font-extrabold'>{text}</span></h1>
					<p className='mt-3 text-xl'>I love to learn and build scalable, optimized backend systems.</p>
				</div>      
			</div>
			
		</div>	
	);
}

export default Home;