import {FETCH_POSTS,NEW_POST} from './types';

// export function fetchPosts(){
//     return function(dispatch){
//         fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(posts=> dipatch({
//             type:FETCH_POSTS,
//             payload:posts
//         }));
//     }
// }
//with ES6 syntax
export const fetchPosts = () => dispatch =>{
       
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts=> dispatch({
                type:FETCH_POSTS,
                payload:posts
            }));
        }
        
        
export const createPost = (postsData) => dispatch =>{
       
            fetch( 'https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(postsData)
        })
        .then(res=>res.json())
        .then(post=>dispatch({
            type:NEW_POST,
            payload:post
        }));
        }
    