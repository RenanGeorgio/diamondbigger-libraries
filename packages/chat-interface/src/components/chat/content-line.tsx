import { useRef } from 'react';
import clsx from 'clsx';
import Balancer from 'react-wrap-balancer';

import { convertNewLines } from '../../helpers/convert-new-lines';

const BalancerWrapper = (props: any) => <Balancer {...props} />

export type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  key?: number;
  role: ChatGPTAgent;
  content: string | null;
}

const ContentLine: React.FC<ChatGPTMessage> = ({ role='assistant', content=null }: ChatGPTMessage) => {
  let formatteMessage: any = null;
  
  if (!content) {
    return null;
  }
  
  formatteMessage = convertNewLines(content);

  return (
    <div className={ role != 'assistant' ? 'float-right clear-both' : 'float-left clear-both' }>
      <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className={clsx(
                'text ',
                role == 'assistant' ? 'font-semibold font- ' : 'text-gray-400'
              )}
            >
              {formatteMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLine;