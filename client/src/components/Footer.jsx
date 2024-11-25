import React, { useEffect, useState } from 'react';
import { name } from '../constants';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import {  AiFillLinkedin } from 'react-icons/ai';
import { BiSolidDashboard } from "react-icons/bi";
import { FiMail } from 'react-icons/fi';
import axios from 'axios';
import {auth} from '../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';


const Footer = () => {
	const year = new Date().getFullYear();
	const [footer,setFooter] = useState({})
	useEffect(()=>{


		
				const fetchData = async ()=>{
					let email = localStorage.getItem('email');
					let response = await axios.get(`http://localhost:4000/footer/get-data/${email}`)
					console.log(response.data);
					setFooter(response.data.payload)
					
				};
				setTimeout(()=>{
					fetchData();
				},500)
				
		
	},[])

	return (
		<div className='bg-slate-800 p-4' style={{ cursor: 'default' }}>
			<div className='flex justify-between flex-wrap gap-4'>
				<p className='text-white text-center w-full sm:w-auto font-light'>© {year} <a href='https://www.github.com/gsarthak783' className='hover:underline' target='_blank'>{name}</a>    . All rights reserved.</p>
				<div className='text-white flex justify-around sm:w-[250px] w-full'>
					

					<Link to='/dashboard' className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }}>
					<BiSolidDashboard  className='text-xl'/>
					</Link>

					<a href={`mailto:${footer?.email}`} className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }}>
						<FiMail className='text-xl' />
					</a>
					<a  href={footer?.twitter} target='_blank' className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }}>
						<FaTwitter className='text-xl' />
					</a>
					<a href={footer?.linkedin} target='_blank' className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }}>
						<AiFillLinkedin className='text-xl' />
					</a>
					<a href={footer?.github} target='_blank' className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }} >
						<FaGithub className='text-xl' />
					</a>
					{/* <a href="#" target='_blank' className='transition ease-in-out duration-300 rounded-md hover:scale-110 cursor-pointer hover:-translate-y-1' style={{ cursor: 'pointer' }}>
						<AiFillMediumCircle className='text-xl' />
					</a> */}
					
				</div>
			</div>
		</div>
	);
}

export default Footer;