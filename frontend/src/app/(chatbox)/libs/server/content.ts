export const fetchContent = async (setIsError: (isError: boolean) => void) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_AI_URL}/content`);

    if(!response.ok) {
      setIsError(true);
      throw new Error('Lỗi khi lấy dữ liệu content')
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    setIsError(true);
    console.error('Lỗi khi lấy dữ liệu content', error);
    return null;
  }
}

export const sendMessageToBot = async (message: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_AI_URL}/navigation?query=${encodeURIComponent(message)}`,{
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Failed to send message to bot');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error sending message to bot: ', error);
    return null;
  }
}