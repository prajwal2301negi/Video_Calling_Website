
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number) {
  let result = '';
  var chars = '',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  
  let myMeeting = async (element: HTMLElement | any) => {
    const appID = ;
    const serverSecret = "";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    if (zp) {
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    } else {
      console.error('ZegoUIKitPrebuilt.create did not return a valid instance');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200 ">
      <div className="myCallContainer w-full h-full rounded-lg overflow-hidden shadow-lg" ref={myMeeting}></div>
    </div>
  );
}
