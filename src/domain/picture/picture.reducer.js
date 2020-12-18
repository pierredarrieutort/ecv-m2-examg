import { types } from './picture.actions';

export default function reducer(state, action) {
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            const { pictures } = state;
            const index = pictures.findIndex(({ picsum_id }) => picsum_id === action.payload.picsum_id)
            pictures[index] = { ...pictures[index], ...action.payload }
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
