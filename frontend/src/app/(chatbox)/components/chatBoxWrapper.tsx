'use client';

/* Package System */
import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from '@iconify/react'
import PerfectScrollbar from "react-perfect-scrollbar";
import Image from "next/image";

/* Package Application */
import '@/styles/admin/components/perfectScrollBar.css'
import { fetchContent, sendMessageToBot } from "../libs/server/content";
import { NAVIGATE_ROUTES } from "../libs/endpoints/navigateEndpoints";

interface ChatBoxWrapperProps {
  handleOpen: () => void;
}

interface ChatBoxContent {
  id: number;
  context: string;
  message: string | null;
  rootId?: number | null;
  isBot?: boolean | null;
  route?: string;
  ResultMessage?: string;
  Result?: number[];

  Root?: ChatBoxContent | null;
  Child: ChatBoxContent[];
}

interface NavigationResponse {
  Route: string;
  Message: string;
  NextPrompt: string | null;

  Result?: number[] | string[];
  ResultMessage?: string;
}

const chatBoxLogo = '/images/chatbox-space1.png';

export default function ChatBoxWrapper({ handleOpen }: ChatBoxWrapperProps) {
  const [chatBoxContents, setChatBoxContents] = useState<ChatBoxContent[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatBoxContent[]>([]);
  const [chatContent, setChatContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isErrorFetch, setIsErrorFetch] = useState<boolean>(false);
  const scrollRef = useRef<PerfectScrollbar | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetchContent(setIsErrorFetch).then((content) => {
      if (content) {
        setChatBoxContents([content]);
        setChatHistory([content]);
      }
      setIsLoading(false);
    })
  }, []);

  const handleDialog = () => {
    setIsError(!isError);
  }

  const setDefaultMessage = (): ChatBoxContent[] => {
    return [
      {
        id: 1,
        context: 'Chào bạn, tôi là trợ lý Space1. Tôi có thể giúp gì cho bạn?',
        message: 'Bạn có thể chọn một trong các tùy chọn bên dưới để bắt đầu.',
        rootId: null,
        isBot: true,
        Child: [
          {
            id: 2,
            context: 'Tìm hiểu về dịch vụ',
            message: 'Chúng tôi cung cấp các dịch vụ tổ chức sự kiện, đặt vé sự kiện.',
            rootId: 1,
            isBot: true,
            Child: [
              {
                id: 4,
                context: 'Chi tiết dịch vụ tổ chức sự kiện',
                message: 'Dịch vụ tổ chức sự kiện là gì và phù hợp với ai?',
                rootId: 2,
                isBot: true,
                Child: []
              },
              {
                id: 5,
                context: 'Chi tiết dịch vụ đặt vé sự kiện',
                message: 'Dịch vụ đặt vé sự kiện có ưu điểm gì?',
                rootId: 2,
                isBot: true,
                Child: []
              }
            ]
          },
          {
            id: 3,
            context: 'Hỗ trợ kỹ thuật',
            message: 'Bạn cần hỗ trợ kỹ thuật nào? Ví dụ như tài khoản, lỗi hệ thống...',
            rootId: 1,
            isBot: true,
            Child: [
              {
                id: 6,
                context: 'Khôi phục tài khoản',
                message: 'Bạn có thể khôi phục mật khẩu qua email đã đăng ký.',
                rootId: 3,
                isBot: true,
                Child: []
              }
            ]
          }
        ]
      }
    ];
  };

  const handleSelectStep = (step: ChatBoxContent) => {
    setChatHistory(prev => [...prev, step]);
    setChatBoxContents([step]);
  };

  const handleGoBack = () => {
    setChatHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      const lastRoot = newHistory[newHistory.length - 1];
      setChatBoxContents([lastRoot]);
      return newHistory;
    });
  };

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setChatContent((e.target as HTMLTextAreaElement).value);
  };

  const handleSendChat = async () => {
    const textarea = document.getElementById('chatTextArea');
    const _content = (textarea as HTMLTextAreaElement)?.value;

    if (_content) {
      (textarea as HTMLTextAreaElement).value = '';

      (textarea as HTMLTextAreaElement).style.height = '64px';

      if (!chatContent.trim()) return;
      const newMsg: ChatBoxContent = {
        id: Date.now(),
        context: chatContent,
        message: chatContent,
        rootId: null,
        isBot: false,
        Child: []
      };
      setChatBoxContents(prev => [...prev, newMsg]);
      setChatContent('');

      await handleSendToBot();
    }
  }

  const handleSendToBot = async () => {
    if (!chatContent || isLoading) return;

    setIsLoading(true);

    try {
      const response = await sendMessageToBot(chatContent);

      if (response) {
        const botMessage: ChatBoxContent = {
          id: Date.now(),
          context: response.Message,
          message: response.Message,
          rootId: null,
          isBot: true,
          Child: [] // You can expand this based on the response if needed
        };

        if (response.Route === 'SEARCH_PAGE' && response.ResultMessage) {
          botMessage.message = response.ResultMessage;
          botMessage.Child = response.Result.map((eventId: number) => ({
            id: eventId,
            context: `Đi tới sự kiện ${eventId}`, // Customize as needed
            message: null,
            rootId: botMessage.id,
            isBot: true,
            route: 'EVENT_PAGE',
            Child: [],
          }));
        } else if (response.Route) {
          const routeChild: ChatBoxContent = {
            id: Date.now() + 1,
            context: `Đi tới trang ${response.Route}`,
            message: response.Message,
            rootId: botMessage.id,
            isBot: true,
            Child: [],
            route: response.Route,
          };

          botMessage.Child.push(routeChild);
        }

        setChatBoxContents(prev => [...prev, botMessage]);
        setChatContent('');
      }
    } catch (error) {
      console.error('Error sending query to bot:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChildClick = (child: ChatBoxContent) => {
    if (child.route) {
      if (child.route === 'EVENT_PAGE') {
        router.push(`/event/${child.id}`);
      } else {
        router.push(NAVIGATE_ROUTES[child.route as keyof typeof NAVIGATE_ROUTES]);
      }
    } else {
      setChatHistory(prev => [...prev, child]);
      setChatBoxContents([child]);
    }
  };

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendChat();
    }
  }

  return (
    <>
      <div className="chat-box flex w-[397px] h-[70vh] max-h-[72vh] fixed bottom-16 right-10 bg-white flex-col rounded-2xl shadow-md z-[999]">
        <div className="chat-box__header flex p-2 rounded-tl-2xl rounded-tr-2xl bg-[#0C4762] border-b border-[#ddd]">
          <div className="chat-box__header-img mt-4 mr-1 mb-3 ml-3">
            <Image className="rounded-[50%] mr-3" src={chatBoxLogo} width={36} height={28.39} alt="chat-box-logo" />
          </div>
          <div className="chat-box__header-info mt-3">
            <h2 className="chat-box-name text-xl font-semibold leading-[27.28px] text-left text-[#F4EEEE]">Trợ lý EveBox</h2>
            <div className="chat-box-status">
              <div className={`action items-center flex flex-row ${!isLoading ? 'text-[#9EF5CF]' : (isErrorFetch ? 'text-danger-500' : 'text-[#F4EEEE]')}`}>
                {!isLoading ?
                  <>
                    <Icon className="mr-1" icon="material-symbols:circle" width="10px" height="10px" />
                    Online
                  </>
                  :
                  ((isErrorFetch) ?
                    <>
                      <Icon className="" icon="material-symbols:circle" width="10px" height="10px" />
                      {isErrorFetch ? 'Lấy dữ liệu thất bại' : 'Có lỗi xảy ra'}
                    </>
                    :
                    <div className="flex flex-row">
                      <div className="dot-pulse">
                        <span></span>
                      </div>
                      <span className='ml-3'>Đang nhập</span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <button
            className="close-btn flex text-[#F4EEEE] items-center justify-center text-center border-none p-0 cursor-pointer ml-auto w-8 h-8 min-w-0 
                    hover:bg-[#F4EEEE] hover:text-[#0C4762] hover:rounded
                    active:bg-[#F4EEEE] active:text-[#0C4762] active:scale-95 active:rounded transition-all ease-in-out"
            onClick={handleOpen}
          >
            <Icon icon="mdi:close" width="24px" height="24px" />
          </button>
        </div>
        <div className="chat-box__body flex flex-col flex-1 overflow-auto">
          {chatHistory.length > 1 && (
            <div className="flex justify-start px-4 py-2">
              <button className="text-sm text-blue-600 hover:underline" onClick={handleGoBack}>
                ← Quay lại
              </button>
            </div>
          )}

          <PerfectScrollbar
            className="perfect-scroll-bar-chat-box h-full relative whitespace-nowrap overflow-hidden max-h-[calc(70vh-150px)]"
            ref={scrollRef}
          >
            {chatBoxContents.map((message) => (
              <div key={message.id} className={`chat-box__body-item ${message.isBot ? 'justify-start bot' : 'justify-end user'} flex flex-col px-4 py-2`}>
                <div className={`general-content ${message.isBot ? 'justify-start bot' : 'justify-end user'} flex flex-row items-start`}>
                  {message.isBot && (
                    <div className="chat-box__body-item-img">
                      <Image src={chatBoxLogo} width={36} height={28.39} alt="chat-bot-avatar" className="rounded-full mr-6" />
                    </div>
                  )}
                  <div className={`chat-box__body-item-content max-w-[88%] leading-[17.73px] gap-3 rounded-xl px-3 py-2 text-sm
                                ${message.isBot ? 'bg-[#f1f1f1] text-[#505050] bot'
                      : 'flex items-center min-h-14 bg-[#0C4762] text-[#F4EEEE] user'}`}
                  >
                    {message.isBot && (
                      <p className="font-semibold mb-1">Trợ lý EveBox</p>
                    )}
                    {message.message && <p>{message.message}</p>}
                  </div>
                </div>
                {message.Child.length > 0 && (
                  <div className="chat-box__default-options w-[85%] flex flex-col mt-3 ml-14 gap-2">
                    {message.Child.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => {
                          if (child.route) {
                            handleChildClick(child);
                          } else handleSelectStep(child);
                        }}
                        className="chat-box__default-options-input relative cursor-pointer flex-grow-[0.1] flex items-center text-left text-sm px-4 py-2 border border-gray-300 rounded-full hover:bg-[#0C4762] hover:text-[#F4EEEE] transition"
                      >
                        <span className="default-content box-border focus:border-none focus:outline-none">{child.context}</span>
                        <button onClick={() => handleSelectStep(child)} className="chat-box__default-options-btn ml-auto flex items-center justify-center">
                          <Icon icon="lucide:send" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </PerfectScrollbar>
        </div>
        <div className="chat-box__footer flex w-full h-20 border-t-1 border-[#ddd] gap-3 bg-white py-0 px-4 rounded-bl-2xl rounded-br-2xl">
          <div className="chat-box__footer-input flex items-center justify-between flex-grow relative w-full h-fit min-h-16 max-h-[4rem] bg-white shadow-md border-none rounded-3xl mt-1 py-1 px-2">
            <textarea
              id="chatTextArea"
              className="textarea-auto-resize w-[88.5%] max-h-[4rem] min-h-16 p-[15px_10px_10px_10px] text-[13px] text-[#667085] bg-transparent border-none resize-none overflow-y-auto box-border outline-none font-sans font-medium"
              placeholder='Nhập tin nhắn của bạn'
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
                handleInputChange(e);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`w-8 h-8 min-w-0 mr-[9px] rounded-full flex items-center justify-center p-0 transition-colors ${chatContent && chatContent !== '' && !isLoading
                ? 'bg-[#9EF5CF] text-[#0C4762] hover:bg-[#0C4762] hover:text-[#9EF5CF]'
                : 'bg-transparent text-[#98A2B3]'
                }`}
              onClick={handleSendChat}
              disabled={!chatContent || isLoading}
            >
              <Icon icon="lucide:send" className="w-[19.52px] h-[19.21px] mt-[3px] mr-[2px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}