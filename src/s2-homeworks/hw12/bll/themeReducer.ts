

type changeThemeIdTpe = {
    type: string
    id: number
}

export type initStateType = {
    themeId: number
}

const initState: initStateType = {
    themeId: 1,
}

export const themeReducer = (state: initStateType = initState, action: changeThemeIdTpe): initStateType => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID':
            return {...state, themeId: action.id}

        default:
            return {...state}
    }
}

export const changeThemeId = (id: number): changeThemeIdTpe => ({ type: 'SET_THEME_ID', id }) // fix any
