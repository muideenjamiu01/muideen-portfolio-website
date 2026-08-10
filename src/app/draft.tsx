import React from "react";
import Fade from "react-reveal/Fade";
import YvImg from "../assets/images/yv.png";
import WoozeeeImg from "../assets/images/woozeee.png";
import OntheGoImg from "../assets/images/go.png";
import BillsPayImg from "../assets/images/billspay.png";
import YouStoreImg from "../assets/images/youstore.png";
import NetflixImg from "../assets/images/netflix-react.png";
import VeergeImg from "../assets/images/veerge.png";
import GrcdImg from "../assets/images/grcd.png";
import ImageSearchImg from "../assets/images/image-search.png";
import VideoSearchImg from "../assets/images/video-search.png";
import CalculatorImg from "../assets/images/calculator.png";
import LasslessImg from "../assets/images/lassless.png";
import NexterImg from "../assets/images/nexter.png";
import TrilloImg from "../assets/images/trillo.png";
import NatourImg from "../assets/images/natours.png";
import OmnifoodImg from "../assets/images/omnifood.png";
import SlackImg from "../assets/images/slack-clone.png";

function projects() {
  const projects = [
    {
      img: YvImg,
      title: "Youverify website",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "https://www.youverify.co/",
      code: "",
    },
    {
      img: WoozeeeImg,
      title: "Woozeee website",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "https://www.woozeee.com/",
      code: "",
    },
    {
      img: OntheGoImg,
      title: "OnTheGo",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "https://onthego.woozeee.com/",
      code: "",
    },
    {
      img: BillsPayImg,
      title: "BillsPay",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "",
      code: "",
    },
    {
      img: YouStoreImg,
      title: "Youstore",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "https://youstore-staging.netlify.app/",
      code: "https://github.com/muideenjamiu01/multi-merchant_e-commerce",
    },
    {
      img: CalculatorImg,
      title: "Javascript Calculator",
      desc: " A multi author blog. Built with Node.js, MongoDB, React, Redux and Tailwind CSS ",
      live: "https://mmj-calculator.netlify.app/",
      code: "https://github.com/muideenjamiu01/Calculator",
    },
    {
      img: NetflixImg,
      title: "netflix clone with react",
      desc: "Free website template directory for SaaS and Degital Agency. Built with Bootstrap, JQuery and JavaScript",
      live: "https://netflixclone-with-reactjs.netlify.app/",
      code: "https://github.com/muideenjamiu01/netflix-react",
    },
    {
      img: VeergeImg,
      title: "Veerge",
      desc: "Frontend Mentor challange directory, solved with vanilla CSS",
      live: "https://veerge-for-maintenance.netlify.app/",
      code: "https://github.com/muideenjamiu01/Matador-trust-front-end-Assesment",
    },
    {
      img: GrcdImg,
      title: "GRCD Assesment",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://gricd-frontend-assesment.netlify.app/",
      code: "https://github.com/muideenjamiu01/Gricd-frontend-assesment",
    },
    {
      img: ImageSearchImg,
      title: "Image Search Engine",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://image-browser-search.netlify.app/",
      code: "https://github.com/muideenjamiu01/react-image-search-",
    },
    {
      img: VideoSearchImg,
      title: "video Search",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "",
      code: "",
    },
    {
      img: LasslessImg,
      title: "Lassless vpn landing page",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://laslessvpndesign.netlify.app/",
      code: "https://github.com/muideenjamiu01/lasless-figma-design",
    },
    {
      img: NexterImg,
      title: "Nexter landing page",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://nexter-homepage.netlify.app/",
      code: "https://github.com/muideenjamiu01/nexter-clone-design",
    },
    {
      img: TrilloImg,
      title: "Trillo landing page",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://trillo-homepage.netlify.app/",
      code: "https://github.com/muideenjamiu01/trillo-clone",
    },
    {
      img: NatourImg,
      title: "Natour landing page",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://natour-homepage.netlify.app",
      code: "https://github.com/muideenjamiu01/natour-landing-page",
    },
    {
      img: OmnifoodImg,
      title: "OmniFood landing page",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://omifoodclone.netlify.app/",
      code: "https://github.com/muideenjamiu01/OmniFood-sample-web",
    },
    {
      img: SlackImg,
      title: "Slack Clone",
      desc: "Quote search app. Used Quotable API for the quotes and React, Redux on the frontend",
      live: "https://slack-clone-7fa06.web.app/",
      code: "https://github.com/muideenjamiu01/slack-clone",
    },
    {
      img: InstitutionImg,
      title: "Institution Management System",
      desc: "A comprehensive solution for managing educational institution operations.",
      live: "https://institution-management-system.vercel.app/",
      code: "https://github.com/muideenjamiu01/institution-management-system",
    }
  ];

  return (
    <section className="bg-primary text-white px-5 py-32" id="projects">
      <div className="container mx-auto grid md:grid-cols-2 items-center md:justify-between">
        <div className="about-info mb-5">
          <h2 className="text-4xl font-bold mb-5 border-b-[5px] w-[180px] border-indigo-600 pb-2">
            Projects
          </h2>

          <p className="pb-5">
            These are some of my projects. I have built these with React, MERN
            and CSS. Check them out.
          </p>
        </div>

        <div className="about-img"></div>
      </div>

      <div className="projects container mx-auto grid md:grid-cols-3 gap-10">
        <Fade left>
          {projects.map((project, i) => {
            return (
              <div className="relative" key={i}>
                <img src={project.img} alt={project.title} />
                <div className="flex absolute left-0 right-0 top-[13px] bottom-0 mx-auto w-[90%] h-[90%]  bg-primary  opacity-0 duration-500 justify-center flex-col hover:opacity-100 px-2 ">
                  <p className="px-5 py-2 bg-blue-500 hover:bg-blue-600 mr-5 font-bold rounded mx-auto container text-center ">
                    {project.title}
                  </p>
                  <p className="py-5 text-center font-bold px-2 text-white">
                    {project.desc}
                  </p>

                  <div className="mx-auto">
                    <a
                      href={project.live}
                      target="_blank"
                      className="px-5 py-2 bg-blue-500 hover:bg-blue-600 mr-5 font-bold"
                    >
                      Live
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 font-bold"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </Fade>
      </div>
    </section>
  );
}

export default projects;
