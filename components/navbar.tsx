'use client'
import {useState} from 'react';
function Navbar(){
    const [menubar, setMenubar]=useState(false)
    const handleEnter = (e: { target: { className: string; }; }) => {
        e.target.className="active"
    }
    const handleLeave = (e: { target: { className: string; }; }) => {
        e.target.className="navbar-link"
    }
    const openMenubar = (e: any) => {
        if(!menubar){
            const element =document.getElementById("navbar-links");
            element.style.display="block";
            element.style.position="absolute";
            element.style.top="10vh";
            element.style.zIndex="20";
            element.style.width="100%";
            const bars=document.getElementsByClassName("bar");
            for(var i=0;i<bars.length;i++){
                bars[i].style.backgroundColor="#d2d7d3"
            }
            element.style.backgroundColor="white";
            
            const navbar=document.getElementsByClassName("navbar")[0];
            navbar.style.backgroundColor="white";
        }
        else{
            const element =document.getElementById("navbar-links");
            element.style.display="none";
            const bars=document.getElementsByClassName("bar");
            for(var i=0;i<bars.length;i++){
                bars[i].style.backgroundColor="white"
            }
            
            const navbar=document.getElementsByClassName("navbar")[0];
            navbar.style.background="transparent";
        }
        setMenubar(!menubar)
    }
    return(
        <nav className="navbar w-full flex justify-around items-center py-6 relative top-0 right-0 left-0 z-10">
            <div className="navbar-brand w-2/6">
                <div className="w-3/4 md:w-1/2 lg:w-5/12 xl:w-4/12 p-auto">
                    <h5 className="tracking-[0.5rem] text-xl font-semibold text-[#f55e3f] bg-black w-fit pl-3 pr-2 mx-auto">HEXA</h5>
                    <p className="text-black mx-auto text-center">MEN'S FASHION</p>
                </div>
            </div>
            <div className="block w-1/2 md:hidden menu-bar" onClick={openMenubar}>
                <div className="w-3/12 sm:w-1/5 mx-auto h-1/2 border-solid border-2 border-white p-2 rounded-lg">
                    {
                        (menubar)?
                            <>
                                <div className="bar bg-white w-full h-1 rotate-45"></div>
                                <div className="bar bg-white w-full h-1 -rotate-45 -mt-1"></div>
                            </>
                        :
                            <>
                                <div className="bar bg-white w-full h-1"></div>
                                <div className="bar bg-white w-full h-1 mt-1 mb-1"></div>
                                <div className="bar bg-white w-full h-1"></div>
                            </>
                    }
                </div>
            </div>
            <div className="navbar-links hidden md:block text-[#1e1e1ebb] w-1/2 text-md my-4" id="navbar-links">
                <ul className="list-none block md:flex md:justify-evenly md:gap-y-1.5 text-center">
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>About</li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Products</li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Contacts</li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Login</li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>SignUp</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar