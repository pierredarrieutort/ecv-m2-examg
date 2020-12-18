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
            const { pictures, user } = state
            const index = pictures.findIndex(({ _id }) => _id === action.payload._id)
            pictures[index] = { ...pictures[index], likedBy: [...pictures[index].likedBy, user._id] }
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
