import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { CustomAccordion, CustomAccordionItem, CustomAccordionSkeleton } from '../../libs/Accordion';
import { initialMessages, InputMessage } from '../message';
import { ContentLine, LoadingChat, ChatGPTMessage } from '../../components';
import { IconArrow } from '../../assets/icons';

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3';

const Chat: React.FC = () => {
  console.log(initialMessages);
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  console.log(messages);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | null>('panel1');
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie]);

  const sendMessage = async (message: string) => { // envia mensagem para API /api/chat endpoint
    setLoading(true);

    const newMessages: any = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ]

    setMessages(newMessages);
  
    const last10messages = newMessages.slice(-10); // memoria para 10 mensagens
    console.log("PARTE 5");
    console.log(last10messages);
    
    const response = await fetch('https://supplyfy.com.br/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    console.log(response);
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();

      done = doneReading;

      const chunkValue = decoder.decode(value);

      lastMessage = (lastMessage + chunkValue);

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
  }

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : null);
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  return (
    <div style={{ borderRadius: '5px', zIndex:999999, marginBottom:'2rem', maxWidth:300 }}>
      <CustomAccordion align='start' size='md'>
          <p>Supply Pharma</p>
          <div style={{
            height: '300px',
            background: '#f5f1f0',
            padding: '3px',
            borderRadius: '1px',
            marginBottom: '3px'
          }}>
          <CustomAccordionItem
            title="Supply Pharma"
            renderToggle={() => (<IconArrow />)} 
            onClick={() => handleChange('panel1')}
          >
            Supply Pharma
            <div  className="rounded-2xl border-zinc-100  lg:border lg:p-6 border-r-2 h-60 overflow-scroll">
              <div style={{overflowY:'scroll',height:'240px'}}>
                {messages?.length > 0 ? 
                  <>
                    {messages?.map(({ content, role }: ChatGPTMessage, index: number) => (
                      <ContentLine key={index} role={role} content={content} />
                    ))}
                  </>
                  : <CustomAccordionSkeleton/>
                }
                {loading && <LoadingChat />}
              </div>
              <div style={{ marginTop:'5px', paddingBottom:'25px' }}>
                <InputMessage
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          </CustomAccordionItem>
        </div>
      </CustomAccordion>
    </div>
  );
}

export default Chat;