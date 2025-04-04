import React,{useState,useEffect,useRef}from"react"
import ReactDOM from"react-dom/client"
import LocomotiveScroll from"locomotive-scroll"
import"locomotive-scroll/dist/locomotive-scroll.css"
import{motion}from"framer-motion"
import{FaGithub,FaLinkedin,FaEnvelope,FaArrowUp}from"react-icons/fa"
import"./index.css"

const SVG_PLACEHOLDER="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="circleGradient" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#059669" stop-opacity="0.9"/></radialGradient><filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter></defs><circle cx="150" cy="100" r="40" fill="url(#circleGradient)" filter="url(#dropShadow)"/><path d="M40,170 Q150,40 260,170" stroke="#10B981" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#dropShadow)"/></svg>`);
const BLOG_POSTS=[{id:1,title:"Building a Chess AI: Deep Learning Meets MCTS",category:"AI",image:SVG_PLACEHOLDER},{id:2,title:"My Path into AI and Robotics: Challenges and Aspirations",category:"AI",image:SVG_PLACEHOLDER},{id:3,title:"Navigating My Exchange Semester at JKU Linz",category:"Personal",image:SVG_PLACEHOLDER},{id:4,title:"Balancing Studies, Fitness, and Personal Growth",category:"Personal",image:SVG_PLACEHOLDER}]
const PROJECTS=[{id:1,title:"Hybrid Chess AI: Deep Learning Meets Strategy",category:"AI",description:"An end-to-end framework for training, evaluating, and deploying a deep learning-based chess engine.",image:SVG_PLACEHOLDER,github:"https://github.com/SereMark/hybrid-chess-ai"},{id:2,title:"Full-Stack Development Portfolio",category:"Software",description:"Scalable web apps built with C#, .NET, JS, and SQL. Includes experience from a junior developer role.",image:SVG_PLACEHOLDER,github:"https://github.com/SereMark"},{id:3,title:"AI & Machine Learning Experiments",category:"AI",description:"Various AI/ML projects exploring deep learning, RL, and applied techniques.",image:SVG_PLACEHOLDER,github:"https://github.com/SereMark/ai-experimentation"}]
const EXPERIENCES=[{year:"2021 - 2022",title:"Junior Full-Stack Developer @ Új algoritmus Kft",details:"Worked on enterprise web applications using C#, .NET, JavaScript, and SQL."},{year:"2020 - 2021",title:"Full-Stack Developer Intern @ Új algoritmus Kft",details:"Developed and maintained full-stack apps, gaining experience in software architecture."}]
const SKILLS=["Python","C#","JavaScript","TensorFlow","PyTorch","Optuna","SQL",".NET"]
const CATEGORIES=["All","AI","Software","Personal"]
const QUICK_STATS=[{value:2,label:"Years of Professional Experience"},{value:3,label:"AI & Software Projects"},{value:6,label:"Programming Languages"},{value:2,label:"Countries Explored"}]
const fadeUp={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:0.6,ease:"easeInOut"}}}
const container={hidden:{},show:{transition:{staggerChildren:0.2}}}
function Wave({flip,h="h-20"}){return<div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden z-10"><svg className={`block w-full ${h} ${flip?"rotate-180":""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.6C181.25,86.43,69.08,116,0,133.33H1200V0C1129.95,54.85,995.44,105.35,814,54.14C662.83,12.69,497.38,33.6,321.39,56.6Z" className="fill-current text-[#0e1622]"/></svg></div>}
function SkillItem({name}){return<motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="flex flex-col items-center"><div className="bg-accent w-16 h-16 rounded-full mb-2 flex items-center justify-center text-2xl font-bold text-white">{name[0]}</div><p className="text-gray-200">{name}</p></motion.div>}
function ExperienceItem({year,title,details}){return<motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="mb-10 relative"><div className="mb-2 text-gray-200"><span className="font-bold text-accent">{year}</span> – <span className="font-semibold">{title}</span></div><p className="text-gray-300">{details}</p></motion.div>}
function Home(){
 const [portfolioCategory,setPortfolioCategory]=useState("All")
 const [blogCategory,setBlogCategory]=useState("All")
 const [showTopBtn,setShowTopBtn]=useState(false)
 const filteredProjects=portfolioCategory==="All"?PROJECTS:PROJECTS.filter(p=>p.category===portfolioCategory)
 const filteredBlogs=blogCategory==="All"?BLOG_POSTS:BLOG_POSTS.filter(p=>p.category===blogCategory)
 useEffect(()=>{window.dispatchEvent(new Event("refreshScroll"))},[portfolioCategory,blogCategory])
 useEffect(()=>{const o=()=>setShowTopBtn(window.scrollY>400);window.addEventListener("scroll",o);return()=>window.removeEventListener("scroll",o)},[])
 const toTop=()=>window.scrollTo({top:0,behavior:"smooth"})
 return<div className="bg-[#0e1622] text-white transition duration-300">
  <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-secondary animate-gradientBackground bg-200"/>
   <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 text-center py-10 px-4 md:px-8">
    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold drop-shadow-xl">Hello, I'm <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-yellow-500 transition-colors">Mark Sere</span></motion.h1>
    <motion.p variants={fadeUp} className="mt-4 text-2xl font-semibold">AI Engineer · Robotics Enthusiast · Full-Stack Dev · Chess AI Tinkerer</motion.p>
    <motion.p variants={fadeUp} className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-300">Crafting intelligent software that merges research and real-world impact. Let's shape the future together.</motion.p>
   </motion.div>
   <motion.div variants={fadeUp} transition={{delay:1,duration:1.5}} className="absolute bottom-24 w-full flex justify-center z-20">
    <div className="flex flex-col items-center text-accent animate-bounce">
     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7"/></svg>
     <span className="text-sm">Scroll Down</span>
    </div>
   </motion.div>
   <Wave/>
  </section>
  <section id="about" className="relative py-20" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-primary"/>
   <Wave/>
   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-gray-100">
    <h2 className="text-4xl font-extrabold text-accent mb-8 text-center">About Me</h2>
    <div className="bg-secondary rounded-xl shadow-md p-8">
     <div className="flex flex-col md:flex-row items-center mb-8">
      <img src="assets/profile.jpg" alt="Profile" loading="lazy" className="w-36 h-36 rounded-full border-4 border-accent object-cover mb-4 md:mb-0 md:mr-6"/>
      <div>
       <p className="mb-4 text-gray-200">Hi, I'm <strong>Mark Sere</strong>, a Computer Science student at <strong>JKU Linz</strong>, focused on <strong>machine learning, robotics</strong>, and <strong>AI-driven systems</strong>.</p>
       <p className="text-gray-200">I love building AI solutions for <strong>healthcare</strong> and <strong>autonomous systems</strong>. Off-screen, I'm usually working out, exploring, or improving my <strong>chess AI</strong>.</p>
      </div>
     </div>
     <h3 className="text-2xl font-bold mb-4 text-accent">Quick Stats</h3>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {QUICK_STATS.map((s,i)=><div key={i}><h4 className="text-4xl font-extrabold text-accent">{s.value}</h4><p className="text-sm mt-2 text-gray-300">{s.label}</p></div>)}
     </div>
    </div>
   </motion.div>
  </section>
  <section id="skills" className="relative py-20 text-gray-100" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-primary"/>
   <Wave/>
   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
    <h2 className="text-4xl font-extrabold text-accent mb-8 text-center">Skills & Tech Stack</h2>
    <div className="bg-secondary rounded-xl shadow-md p-8">
     <p className="mb-8 text-gray-200 text-center max-w-3xl mx-auto">Over the years, I've built strong fundamentals and adaptability to tackle modern tech challenges.</p>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
      {SKILLS.map((skill,i)=><SkillItem key={i} name={skill}/>)}
     </div>
    </div>
   </motion.div>
  </section>
  <section id="experience" className="relative py-20 text-gray-100" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-primary"/>
   <Wave/>
   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
    <h2 className="text-4xl font-extrabold text-accent mb-8 text-center">Experience</h2>
    <div className="relative border-l border-gray-600 border-opacity-40 pl-8">
     {EXPERIENCES.map((exp,i)=><ExperienceItem key={i} {...exp}/>)}
    </div>
   </motion.div>
  </section>
  <section id="portfolio" className="relative py-20 text-gray-100" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-primary"/>
   <Wave/>
   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
    <h2 className="text-4xl font-extrabold text-accent mb-8 text-center">Portfolio</h2>
    <div className="flex flex-wrap gap-3 justify-center mb-8">
     {CATEGORIES.map(c=><button key={c} onClick={()=>setPortfolioCategory(c)} className={`px-4 py-2 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-secondary ${c===portfolioCategory?"bg-accent text-white shadow-md":"bg-secondary text-gray-200 hover:bg-accent hover:text-white"}`}>{c}</button>)}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredProjects.map(p=><motion.div key={p.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="bg-secondary rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl transition">
      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-48 object-cover"/>
      <div className="p-4 flex flex-col h-full">
       <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
       <p className="text-sm flex-grow text-gray-300 mb-3">{p.description}</p>
       <a href={p.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-accent text-white text-sm rounded-full w-fit hover:bg-accent-dark transition">GitHub</a>
      </div>
     </motion.div>)}
    </div>
   </motion.div>
   <Wave/>
  </section>
  <section id="blog" className="relative py-20 text-gray-100" data-scroll-section>
   <div className="absolute inset-0 z-0 bg-primary"/>
   <Wave/>
   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
    <h2 className="text-4xl font-extrabold text-accent mb-8 text-center">Blog</h2>
    <div className="flex flex-wrap gap-3 justify-center mb-8">
     {CATEGORIES.map(c=><button key={c} onClick={()=>setBlogCategory(c)} className={`px-4 py-2 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-secondary ${c===blogCategory?"bg-accent text-white shadow-md":"bg-secondary text-gray-200 hover:bg-accent hover:text-white"}`}>{c}</button>)}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredBlogs.map((post,i)=><motion.div key={post.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:i*0.1}} className="bg-secondary rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl transition">
      <img src={post.image} alt={post.title} loading="lazy" className="w-full h-48 object-cover"/>
      <div className="p-4">
       <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
       <p className="text-sm text-gray-300 mb-2">Category: {post.category}</p>
       <button disabled title="Blogs are not done yet" className="px-4 py-2 bg-accent text-white rounded-full cursor-not-allowed transition">Coming Soon</button>
      </div>
     </motion.div>)}
    </div>
   </motion.div>
   <Wave/>
  </section>
  <footer className="relative bg-primary text-gray-300 py-10" data-scroll-section>
   <div className="absolute top-0 left-0 right-0 -mt-1 pointer-events-none z-10"><Wave flip h="h-16"/></div>
   <div className="relative z-20 max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
     <div className="text-center md:text-left mb-4 md:mb-0">
      <h2 className="text-2xl font-extrabold text-white">Mark Sere</h2>
      <p className="text-gray-400 text-sm">AI Engineer · Robotics · Full-Stack</p>
     </div>
     <div className="flex space-x-6">
      <a href="mailto:seremark056@gmail.com" className="hover:text-accent transition">Email</a>
      <a href="https://github.com/SereMark" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">GitHub</a>
      <a href="https://www.linkedin.com/in/seremark/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">LinkedIn</a>
     </div>
    </div>
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
     <div className="flex justify-center space-x-6 mb-4 md:mb-0">
      <a href="mailto:seremark056@gmail.com" className="hover:text-accent transition text-2xl"><FaEnvelope/></a>
      <a href="https://github.com/SereMark" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition text-2xl"><FaGithub/></a>
      <a href="https://www.linkedin.com/in/seremark/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition text-2xl"><FaLinkedin/></a>
     </div>
     <div className="text-center text-sm text-gray-400">&copy; {new Date().getFullYear()} Mark Sere. All rights reserved.</div>
    </div>
   </div>
  </footer>
  {showTopBtn&&<button onClick={toTop} className="fixed bottom-8 right-8 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-accent-dark transition z-50"><FaArrowUp/></button>}
 </div>
}

function Root(){
 const scrollRef=useRef(null),loco=useRef(null)
 useEffect(()=>{
  if(!scrollRef.current)return
  loco.current=new LocomotiveScroll({el:scrollRef.current,smooth:true,multiplier:1,lerp:0.07})
  const update=()=>loco.current.update()
  window.addEventListener("resize",update)
  const imgs=scrollRef.current.querySelectorAll("img")
  Promise.all([...imgs].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r}))).then(update)
  window.addEventListener("refreshScroll",update)
  return()=>{
   window.removeEventListener("resize",update)
   window.removeEventListener("refreshScroll",update)
   loco.current.destroy()
  }
 },[])
 return<div id="main-container" data-scroll-container ref={scrollRef}><Home/></div>
}

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><Root/></React.StrictMode>)