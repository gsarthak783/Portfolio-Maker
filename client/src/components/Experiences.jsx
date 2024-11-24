import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import { experiences } from '../constants';
// import Footer from './Footer';
import axios from 'axios';


const Experiences = () => {


  let [data,setData] = useState([]);

  useEffect(()=>{
    let fetchData = async ()=>{
      let email = localStorage.getItem('email')
      let result = await axios.get(`http://localhost:4000/experience/get-data/${email}`)
      console.log(result.data.payload);
      let fetchedData = result.data.payload;
      setData(fetchedData?.reverse());
      console.log(data)
    }

    fetchData();
  },[])

  return (
    <div className='experience min-h-screen bg-black text-black pt-4 pt-4 overflow-x-hidden' id='experience'>
      <div className='pt-12 sm:px-16'>
        <p className='font-light text-white'>MY JOURNEY SO FAR.</p>
        <h2 className='text-4xl sm:text-5xl font-extrabold mt-2 text-white'>Work Experience.</h2>
      </div>
      <VerticalTimeline className='mt-9'>
        {data?.map((experience, index) => (
          <VerticalTimelineElement
          key={index}
            className="relative vertical-timeline-element--work"
            contentStyle={{ background: "#1d1836", color: "#fff", }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            date={experience.duration}
            iconStyle={{ background: '#fff' }}
            icon={
              <a className='flex justify-center items-center w-full h-full' href={experience.companyUrl} target='_blank'>
                <img
                  src={experience.companyLogo}
                  alt={experience.companyName}
                  className='w-[60%] h-[60%] object-contain'
                />
              </a>
            }
          >
            <div>
              <h3 className='text-white text-[24px] font-bold'>{experience.role}</h3>
              <p
                className='text-secondary text-[16px] font-semibold'
                style={{ margin: 0 }}
              >
                {experience.companyName}
              </p>
            </div>

            <ul className='mt-5 list-disc ml-5 space-y-2'>
              {experience.summaryPoints.map((point, index) => (
                <li
                  key={`experience-point-${index}`}
                  className='text-white-100 text-[14px] pl-1 tracking-wider'
                >
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default Experiences;