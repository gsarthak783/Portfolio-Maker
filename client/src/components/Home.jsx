import React from 'react';
import { useState, useEffect, useRef } from 'react';
// import { name } from '../constants';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const Home = () => {

	const ref = useRef(0);
	const [text, setText] = useState('');
	let name = localStorage.getItem('name') || 'user';
	const {email} = useParams();
	localStorage.setItem('email',email)

	useEffect( ()=>{
		const fetch = async ()=>{
			let response = await axios.get(`http://localhost:4000/user/get-data/${email}`)
			console.log(response.data)
			if(response.data.message !== 'No user found'){
				let nam = response.data.payload?.name;
				localStorage.setItem('name', nam)
			}else{
				localStorage.setItem('name', 'user')
			}
			// let nam = response.data.payload?.name || email;
			console.log((response.data.payload.name))
			
			
		}
		fetch()
		
	},[])

	useEffect(() => {

		console.log(email, "Params");
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