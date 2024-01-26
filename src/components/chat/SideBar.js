import React from 'react';
import NavBar from './NavBar';
import Search from './Search';
import Chats from './Chats';

const SideBar = ({modal}) => {
    return (
        <div id='sidebar'>
            <NavBar/>
            <Search/>
            <Chats modal={modal}/>
        </div>
    )
}
export default SideBar;