import React, { Component, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import userService from '../../services/user-service';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// import Menu from '../Menu/Menu';
// import About from '../About/About';
// import Home from '../Home/Home';
// import Login from '../Login/Login';
// import Register from '../Register/Register';
// import Create from '../Cherry/Create/Create';
// import Edit from '../Cherry/Edit/Edit';
// import Remove from '../Cherry/Remove/Remove';
// import Gallery from '../Cherry/Gallery/Gallery';
import Basket from '../Basket/Basket';
import UserOrders from '../UserOrders/UserOrders';
import AdminOrders from '../AdminOrders/AdminOrders';
import ApproveOrder from '../AdminOrders/Actions/ApproveOrder';
import RemoveOrder from '../AdminOrders/Actions/RemoveOrder';

import Store, { StoreContext } from "../Store/Store";
import { loginSuccess } from "../Store/actions";

const Menu = React.lazy(() => import('../Menu/Menu'));
const About = React.lazy(() => import('../About/About'));
const Home = React.lazy(() => import('../Home/Home'));
const LoginHookContext = React.lazy(() => import('../Login/LoginHookContext'));
const Login = React.lazy(() => import('../Login/Login'));
const Register = React.lazy(() => import('../Register/Register'));
const Logout = React.lazy(() => import('../Logout/Logout'));
const Create = React.lazy(() => import('../Cherry/Create/Create'));
const Edit = React.lazy(() => import('../Cherry/Edit/Edit'));
const Remove = React.lazy(() => import('../Cherry/Remove/Remove'));
const Gallery = React.lazy(() => import('../Cherry/Gallery/Gallery'));

const NotFound = React.lazy(() => import('../NotFound/NotFound'));


function parseCookies() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split("=");
        acc[cookieName] = cookieValue;
        return acc;
    }, {})
}

const Auth = ({ children }) => {
    const { dispatch } = React.useContext(StoreContext);
    React.useEffect(() => {
        fetch("http://localhost:4000/auth", { credentials: "include" })
            .then(res =>
                res.status === 200
                    ? res.json()
                    : res.text().then(text => Promise.reject(text))
            )
            .then(user => dispatch(loginSuccess(user)))
            .catch((err) => {
                dispatch(loginSuccess(null));
            });
    }, []);

    return <>{children}</>;
};


// class App extends Component {

//     constructor(props) {
//         super(props);
//         const cookies = parseCookies();
//         const isLogged = !!cookies["user_cookie"];
//         this.state = {
//             isLogged
//         }
//     }

//     componentDidMount() {
//         const isAdmin = localStorage.getItem('isAdmin') === "true";

//         if (localStorage.getItem('username')) {
//             this.setState({
//                 username: localStorage.getItem('username'),
//                 isAdmin,
//                 userId: localStorage.getItem('userId')
//             })
//         } else {
//             this.setState({
//                 username: null,
//                 isAdmin: false,
//                 userId: ""
//             });
//         }
//     }

//     logout = (history) => {
//         userService.logout().then(res => {
//             if (res) {
//                 this.setState({
//                     username: null,
//                     isAdmin: false,
//                     userId: "",
//                     isLogged: false
//                 }, () => {
//                     localStorage.clear();
//                 })
//                 toast.success(res, {
//                     closeButton: false
//                 })
//             }
//             history.push('/');
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     setLogin = (history, data) => {
//         return userService.login(data).then((res) => {
//             if (res.username) {
//                 this.setState({
//                     username: res.username,
//                     isAdmin: res.roles.includes('Admin'),
//                     userId: res._id,
//                     isLogged: true
//                 }, () => {
//                     localStorage.setItem('username', `${res.username}`);
//                     localStorage.setItem('userId', `${res._id}`);
//                     localStorage.setItem('isAdmin', `${res.roles.includes('Admin')}`);
//                 });
//                 toast.success(`Здравей, ${res.username}!`, {
//                     closeButton: false
//                 })
//                 history.push('/');
//             } else {
//                 toast.error(res, {
//                     closeButton: false
//                 })
//             }
//         })
//         // .catch(err => {
//         //     console.log(err);
//         // });
//     }

// render() {
//     const { isLogged, isAdmin } = this.state;

const App = () => {
    return (<div className="main">
        <Store>
            <Auth>
                <StoreContext.Consumer>
                    {({ state }) => {
                        const { user, error } = state;
                        // console.log("App");
                        // console.log(user);
                        // console.log(error);
                        const isLogged = !!user;
                        // const isAdmin = false;
                        const isAdmin = isLogged ? user.roles.includes('Admin') : false;
                        return user === undefined ? <header>
                            <h2>Loading...</h2>
                        </header> :
                            <Fragment>
                                <Header isAdmin={isAdmin} username={user && user.username} />
                                <main className="main-content">
                                    <div className="wrapper">
                                        <ToastContainer autoClose={3500} />
                                        <Suspense fallback={<div className="loading">
                                            <header>
                                                <h2>Loading...</h2><span></span>
                                            </header>
                                        </div>}>
                                            <Switch>
                                                <Route path="/cherry/gallery/:id"
                                                    render={({ match }) => (!isLogged ? <Redirect to="/user/login" /> : <Gallery match={match} />)}
                                                />
                                                {isAdmin && <Route path="/cherry/remove/:id"
                                                    render={({ history, match }) => <Remove history={history} match={match} />}
                                                />}
                                                {isAdmin && <Route path="/cherry/edit/:id"
                                                    render={({ history, match }) => <Edit history={history} match={match} />}
                                                />}
                                                {isAdmin && <Route path="/cherry/create"
                                                    render={({ history }) => <Create history={history} />}
                                                />}
                                                <Route path="/user/register" exact
                                                    render={({ history }) => (!isLogged ? <Register
                                                        history={history}
                                                    /> : <Redirect to="/" />)}
                                                />
                                                <Route path="/user/login" exact
                                                    render={() => (!isLogged ? <LoginHookContext /> : <Redirect to="/" />)}
                                                />
                                                <Route path="/user/logout"
                                                    render={() => (isLogged ? <Logout /> : <Redirect to="/" />)}
                                                />
                                                <Route path="/order/products/:id"
                                                    render={({ history, match }) => (!isLogged ? <Redirect to="/user/login" /> : <Basket match={match} history={history} userId={user._id}
                                                    // location={location} basket={history.location.state} 
                                                    />)}
                                                />
                                                {isLogged && <Route path="/order/products"
                                                    render={({ history }) => <Basket history={history} userId={user._id}
                                                    // location={location} basket={history.location.state}
                                                    />}
                                                />}
                                                {isLogged && <Route path="/order/my-orders"
                                                    render={() => <UserOrders userId={user && user._id} />}
                                                />}
                                                {isAdmin && <Route path="/admin/pending-orders"
                                                    render={() => <AdminOrders />}
                                                />}
                                                {isAdmin && <Route path="/admin/approve-order/:id" exact
                                                    render={({ history, match }) => <ApproveOrder history={history} match={match} />}
                                                />}
                                                {isAdmin && <Route path="/admin/remove-order/:id" exact
                                                    render={({ history, match }) => <RemoveOrder history={history} match={match} />}
                                                />}
                                                <Route path="/about" exact component={About} />
                                                <Route path="/menu" exact
                                                    render={() => <Menu isAdmin={isAdmin} />}
                                                />
                                                <Route path="/" exact
                                                    render={() => <Home isAdmin={isAdmin} />}
                                                />
                                                <Route component={NotFound} />
                                            </Switch>
                                        </Suspense>
                                    </div>
                                </main>
                                <Footer />
                            </Fragment>
                    }}
                </StoreContext.Consumer>
            </Auth>
        </Store>
    </div>)
}
// }

export default App;