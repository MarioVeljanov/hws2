import React, {ChangeEvent, ClassAttributes, KeyboardEvent} from 'react'
import s from './Greeting.module.css'
import { UserType } from './HW3';

type GreetingPropsType = {
  name: string; // need to fix any
  setNameCallback: (e: ChangeEvent<HTMLInputElement>) => void; // need to fix any
  addUser: () => void; // need to fix any
  onBlur: () => void; // need to fix any
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void; // need to fix any
  error: string; // need to fix any
  totalUsers: number; // need to fix any
  lastUserName?: Array<UserType>; // need to fix any
};

// презентационная компонента (для верстальщика)
const Greeting: React.FC<GreetingPropsType> = (
    {
        name,
        setNameCallback,
        addUser,
        onEnter,
        onBlur,
        error,
        totalUsers,
        lastUserName,
    } // деструктуризация пропсов
) => {
    const inputClass = error ? s.errorInput : s.input // need to fix with (?:)

    return (
        <div id={'hw3-form'} className={s.greetingForm}>
            <div className={s.text}>
                {'Людей добавили: '}
                <span id={'hw3-users-total'}>
                    {totalUsers}
                </span>
            </div>

            <div className={s.inputAndButtonContainer}>
                <div>
                    <input
                        id={'hw3-input'}
                        value={name}
                        onChange={setNameCallback}
                        className={inputClass}
                        onKeyDown={onEnter}
                        onBlur={onBlur}
                    />
                    
                </div>

                <button
                    id={'hw3-button'}
                    onClick={addUser}
                    className={s.button}
                    disabled={!name.trim()}
                >
                    Add
                </button>
            </div>
            <div id={'hw3-error'} className={s.error}>
                        {error}
            </div>

            {lastUserName && (
                <div className={s.greeting}>
                    <span id={'hw3-last-user'}>{lastUserName.map((user) => <li key={user._id}>Привет {user.name}!</li>)}</span>
                </div>
            )}
        </div>
    )
}

export default Greeting
