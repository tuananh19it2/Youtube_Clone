import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS,  } 
from "../actionType";
import request from "../../api";

export const getChannelDetails = (id) => async (dispatch, getState) => {
try {
   dispatch({
       type: CHANNEL_DETAILS_REQUEST,
   })
   const {data} = await request('/channels', {
       params:{
           part: 'snippet,contentDetails,statistics',
           id: id
       }
   })
   dispatch({
       type: CHANNEL_DETAILS_SUCCESS,
       payload: data.items[0]
   })
   
} catch (e) {
   console.log(e.message);
   dispatch({
       type: CHANNEL_DETAILS_FAIL,
       payload: e.message
   })

}
}

export const checkSubscriptionStatus = (id) => async (dispatch,getState) => {
try {
   const {data} = await request('/subscriptions', {
       params:{
           part: 'snippet',
           forChannelId: id,
           mine: true
       },
       headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`
       }
   })
   dispatch({
    type: SET_SUBSCRIPTION_STATUS,
    payload: data.items.length !== 0
   })
} catch (e) {
   console.log(e.response.data);
}
}

