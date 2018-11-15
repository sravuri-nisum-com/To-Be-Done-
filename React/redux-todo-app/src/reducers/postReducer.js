import {FETCH_POSTS,NEW_POST} from '../actions/types';

const initialState={
    items:[],
    intem:{}
}

export default function( state=initialState,action){//action is an object , has to have type if there is data ..it needs to have payload
    switch (action.type){
        case FETCH_POSTS:
        return {
            ...state,
            items:action.payload
        };
        case NEW_POST:
        return {
            ...state,
            item:action.payload
        }
     default:
     return state;
    }

}