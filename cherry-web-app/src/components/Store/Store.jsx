import React from 'react';
import { ActionTypes, loginSuccess, loginFailure, logoutSuccess, logoutFailure } from './actions';
import userService from '../../services/user-service';
import { toast } from 'react-toastify';
export const StoreContext = React.createContext({});

const initialState = {
    user: undefined,
    error: null
};

function init(state) {
    return initialState;
}

const asyncActionMap = {
    [ActionTypes.Login]:
        ({ user }) => userService.login(user)
            .then(user => {
                if (user.username) {
                    toast.success(`Здравей, ${user.username}!`, { closeButton: false });
                    return loginSuccess(user);
                } else {
                    toast.error(user, { closeButton: false });
                    return loginFailure(user);
                }
            })
            .catch((err) => {
                toast.error(err);
                return loginFailure(err);
            }),
    [ActionTypes.Logout]:
        () => userService.logout()
            .then((result) => {
                toast.success(result, { closeButton: false })
                return logoutSuccess();
            })
            .catch(error => logoutFailure(error))
}

const actionMap = {
    [ActionTypes.Login]: (state) => ({ ...state, error: null }),
    [ActionTypes.LoginSuccess]: (state, { user }) => ({ ...state, user }),
    [ActionTypes.LogoutSuccess]: (state) => ({ ...state, user: null }),
    [ActionTypes.LoginFailure]: (state, { error }) => ({ ...state, error })
}

const storeReducer = (state, action) => {
    const handler = actionMap[action.type];
    return handler ? handler(state, action.payload) : state;
}

const Store = ({ children }) => {

    const [state, dispatch] = React.useReducer(storeReducer, initialState, init);

    const store = React.useMemo(() => ({
        state,
        dispatch: (action) => {
            const asyncActionHandler = asyncActionMap[action.type];
            if (asyncActionHandler) {
                asyncActionHandler(action.payload).then(dispatch);
            }
            dispatch(action);
        }
    }), [state, dispatch]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default Store;