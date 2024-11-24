import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="bg-background text-text py-12 border-2 border-green-400">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-heading mb-6">Projects</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">CareerForge - Job Portal Application</h3>
            <p>Application provides an efficient solution for job seekers and employers to collaborate in the recruitment process.</p>
            <p>Users can access the platform from any device with an internet connection, making it convenient to search for jobs or manage recruitment tasks on the go.</p>
            <p>Component-based architecture, written in JSX, makes it convenient to scale up the application according to future needs.</p>
            <p className="font-semibold">Technology Used: MERN Stack, REST API, Redux Toolkit, Tailwind CSS, JWT</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Review of the Algorithm Visualization Field</h3>
            <p>Conducted an in-depth review of the AV field to analyze its evolution and impact on computer science education.</p>
            <p>Utilized comprehensive research methodologies, including literature reviews, surveys, and case studies, to gather and analyze data from various sources.</p>
            <p>Presented research findings in academic settings and contributed to discussions on the relevance and potential advancements of AV.</p>
            <p className="font-semibold">Technology Used: Literature review and analysis techniques</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Blog Website</h3>
            <p>Designed and developed a dynamic blogging website using modern web technologies.</p>
            <p>Implemented the front-end using React JS, leveraging the power of component-based architecture for a responsive and interactive user interface.</p>
            <p>Utilized Redux for efficient state management, ensuring seamless data flow and improved user experience.</p>
            <p className="font-semibold">Technology Used: HTML, React JS, API</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
