import React from 'react'
import { MessageType } from '../HW1'
import s from './Message.module.css'

// нужно создать правильный тип вместо any

export type MessagePropsType = {
    message: MessageType
}


// нужно отобразить приходящие данные
const Message = (props: MessagePropsType) => {
    return (
      <div id={"hw1-message-" + props.message.id} className={s.message}>
        <div className={s.imageAndText}>
          <div className={s.text}>
            <div id={"hw1-name-" + props.message.id} className={s.name}>
              {props.message.user.name}

              {/**/}
            </div>
            <pre id={"hw1-text-" + props.message.id} className={s.messageText}>
              {props.message.message.text}

              {/**/}
            </pre>
          </div>

          <img
            src={props.message.user.avatar}
            id={"hw1-avatar-" + props.message.id}
            // создаёт студент

            //
          />
          <div id={"hw1-time-" + props.message.id} className={s.time}>
            {props.message.message.time}

            {/**/}
          </div>
        </div>

        <svg height="0" width="0">
          <defs>
            <clipPath id="svgPath">
              <path fill="#FFFFFF" d="M20,20H0V0H0A20,20,0,0,0,20,20Z" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
}

export default Message
