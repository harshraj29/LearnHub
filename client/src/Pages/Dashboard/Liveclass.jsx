import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

function Liveclass() {
    const { lectureId } = useParams();

    const userName = "Your Name";
    
    const Liveclass = async(element)=> {
        const appID = 1752201823;
        const serverSecret = "a8e3273cfb32e052efb4b48febddf40f";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, lectureId,  Date.now().toString(),  userName);
         
        //create instance for live class

        const zc =ZegoUIKitPrebuilt.create(kitToken);
        
        // join class
        zc.joinRoom({
            container: element,
            scenario: 
            {
                mode:ZegoUIKitPrebuilt.LiveStreaming
            },
            showScreenSharingButton:true
        })
    };
       
  return (
    <div className='text-white'>
        <div ref={Liveclass} className='w-screen h-screen'/>
    </div>
  )
}

export default Liveclass