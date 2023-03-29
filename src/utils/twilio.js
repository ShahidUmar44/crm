import { node } from '../constants/index';

export async function sendMessage(message, to, from, bizId, bizName, customerName) {
  let initials = '';

  const bizNameArray = bizName.split(' ');
  if (bizNameArray.length === 1) {
    initials = bizNameArray[0].slice(0, 2).toUpperCase();
  } else {
    initials = bizNameArray.reduce((acc, cur) => acc + cur[0], '').toUpperCase();
  }

  try {
    const response = await fetch(`${node}/messages/twilioSend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        from: from,
        message: message,
        bizName: bizName,
        bizId: bizId,
        initials: initials,
        customerName: customerName,
      }),
    });

    // response status code is 200 then we continue with the rest of the code
    if (response.status === 200) {
      console.log('message sent');
      return true;
    } else {
      console.log('message not sent');
      return false;
    }
  } catch (error) {
    console.log('error:', error);
    return false;
  }
}
