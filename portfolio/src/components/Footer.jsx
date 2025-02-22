import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const year = new Date().getFullYear();
  const [footer, setFooter] = useState({});
  const {userData, isLoading} = useSelector((state) => state.userState);
  

   useEffect(() => {
        if (!isLoading) {
          setFooter(userData?.resume?.footerLinks || {});
        }
      }, [isLoading, userData]);
  
  return (
    <footer className="footer p-6 bg-base-200 text-base-content flex flex-wrap justify-between items-center">
      <div>
        <p className="text-center sm:text-left">
          © {year}{" "}
         
          . All rights reserved.
        </p>
      </div>
      <div className="flex gap-4">
        

        <a
          href={`mailto:${footer?.email}`}
          className="btn btn-ghost btn-circle transition hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9 6 9-6"
            />
          </svg>
        </a>

        <a
          href={footer?.twitter}
          target="_blank"
          className="btn btn-ghost btn-circle transition hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 19c11 0 16-9 16-16a12.3 12.3 0 01-4 1 8.5 8.5 0 00-15 6c0 .7.1 1.4.2 2A11.4 11.4 0 011 4s-4 9 5 13a13.7 13.7 0 01-7 2c9 5 19 0 19-11v-.5A14 14 0 0023 3"
            />
          </svg>
        </a>

        <a
          href={footer?.linkedin}
          target="_blank"
          className="btn btn-ghost btn-circle transition hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2V9zm2-4a2 2 0 110-4 2 2 0 110 4z"
            />
          </svg>
        </a>

        <a
          href={footer?.github}
          target="_blank"
          className="btn btn-ghost btn-circle transition hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 00-3 19c.5 0 .7-.2.7-.5v-2c-3 .7-3-1-3-1a2.4 2.4 0 00-1-2c1 0 2 .7 2 .7a4 4 0 006-3c0-1 .3-2 1-2-2 0-4 1-4-3a3 3 0 011-2s-.3-1 1-2c2 0 3 2 3 2a6.5 6.5 0 015 2c0-1 .4-2 .7-2 .7-.3 1.3.3 1.3.3a6 6 0 011 3 7 7 0 01-1 4c2 0 4-1 4-6a9 9 0 00-9-9z"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
