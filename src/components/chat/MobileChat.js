import React, { useContext } from 'react';
import Add from '../../img/add.png';
import More from '../../img/more.png';
import Cam from '../../img/cam.png';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatContext';

const MobileChat = ({modal}) => {
    const {data} = useContext(ChatContext);

    return (
        <div id='mobileChat'>
            <div className='chatInfo'>
                <span>{data.user?.displayName}</span>
                <div className='chatIcons'>
                    <img src={Cam} alt=''/>
                    <img src={Add} alt=''/>
                    <img src={More} alt=''/>
                </div>
                <button onClick={modal}>close</button>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}
export default MobileChat;