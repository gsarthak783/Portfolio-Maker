import React from 'react';

const Education = () => {
  return (
    <section id="education" className="bg-background text-text py-12 border-2 border-green-400">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-heading mb-6">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">B.Tech in Information Technology (2019-2023)</h3>
            <p>KIET Group of Institutions (Dr. A.P.J. Abdul Kalam Technical University - Lucknow), CGPA: 8.36%</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Higher Secondary School (2018-2019)</h3>
            <p>Dayawati Modi Public School – Modinagar, Percentage: 88.6%</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Secondary School (2016-2017)</h3>
            <p>Dayawati Modi Public School – Modinagar, CGPA: 8.4</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
