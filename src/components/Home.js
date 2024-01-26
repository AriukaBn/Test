import React, { useState, useEffect } from "react";
import SideBar from "./chat/SideBar";
import Chat from "./chat/Chat";
import MobileChat from "./chat/MobileChat";

const Home = () => {

  const [modal, setModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  
  const toggleModal = () => {
    setModal(!isMobile)
    document.getElementById('sidebar').style.display='none';
    document.getElementById('mobileChat').style.display='block';
  };
  const untoggleModal = () => {
    setModal(!isMobile);
    document.getElementById('sidebar').style.display='block';
    document.getElementById('mobileChat').style.display='none';
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkIsMobile();
  }, []);
  console.log(isMobile);

  return (
    <div className="home">
      <div className="container">
        <SideBar modal={toggleModal}/>
        {isMobile && (<MobileChat modal={untoggleModal}/>)}
        <Chat/>
      </div>
    </div>
  );
};

export default Home;
