import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../../services/user-service';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Menu from '../Menu/Menu';
import About from '../About/About';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Create from '../Cherry/Create/Create';
import Edit from '../Cherry/Edit/Edit';
import Remove from '../Cherry/Remove/Remove';
import Basket from '../Basket/Basket';
import UserOrders from '../UserOrders/UserOrders';
import AdminOrders from '../AdminOrders/AdminOrders';
import ApproveOrder from '../AdminOrders/Actions/ApproveOrder';
import RemoveOrder from '../AdminOrders/Actions/RemoveOrder';
// const Login = React.lazy(() => import('../Login/Login'));
// const Register = React.lazy(() => import('../Register/Register'));
// const Create = React.lazy(() => import('../Create'));
const NotFound = React.lazy(() => import('../NotFound/NotFound'));

function parseCookies() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split("=");
        acc[cookieName] = cookieValue;
        return acc;
    }, {})
}

// const camelCased = myString => (
//     myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
// );

class App extends Component {

    constructor(props) {
        super(props);
        const cookies = parseCookies();
        const isLogged = !!cookies["user_cookie"];
        this.state = {
            // username: null,
            // isAdmin: false,
            // userId: "",
            isLogged
        }
    }

    componentDidMount() {
        console.log("App1")
        console.log(this.props)
        const isAdmin = localStorage.getItem('isAdmin') === "true";

        if (localStorage.getItem('username')) {
            this.setState({
                username: localStorage.getItem('username'),
                isAdmin,
                userId: localStorage.getItem('userId')
            })
        } else {
            this.setState({
                username: null,
                isAdmin: false,
                userId: ""
            });
        }
    }

    logout(history) {
        userService.getLogout().then(res => {
            if (res) {
                this.setState({
                    username: null,
                    isAdmin: false,
                    userId: "",
                    isLogged: false
                }, () => {
                    localStorage.clear();
                })
                toast.success(res, {
                    closeButton: false
                })
            }
            history.push('/');
        }).catch(err => {
            console.log(err);
        })
    }

    pushToHome = (history) => {
        history.push('/');
    }

    setLogin = (history, data) => {
        userService.login(data).then((res) => {
            if (res.username) {
                this.setState({
                    username: res.username,
                    isAdmin: res.roles.includes('Admin'),
                    userId: res._id,
                    isLogged: true
                }, () => {
                    localStorage.setItem('username', `${res.username}`);
                    localStorage.setItem('userId', `${res._id}`);
                    localStorage.setItem('isAdmin', `${res.roles.includes('Admin')}`);
                });
                toast.success(`Здравей, ${res.username}!`, {
                    closeButton: false
                })
                history.push('/');
            } else {
                toast.error(res, {
                    closeButton: false
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // componentDidMount() {
    //     const isAdmin = localStorage.getItem('isAdmin') === "true";

    //     if (localStorage.getItem('username')) {
    //         this.setState({
    //             username: localStorage.getItem('username'),
    //             isAdmin,
    //             userId: localStorage.getItem('userId')

    //         })
    //     }
    // }

    // handleSubmit = (event, data, isLoginPage, history) => {
    //     event.preventDefault();

    //     userService.post(data, isLoginPage).then(res => {
    //         // const cookies = parseCookies();
    //         if (isLoginPage && res.username) {
    //             this.setState({
    //                 username: res.username,
    //                 isAdmin: res.roles.includes('Admin'),
    //                 userId: res._id,
    //                 isLogged: true

    //             }, () => {
    //                 localStorage.setItem('username', `${res.username}`);
    //                 localStorage.setItem('userId', `${res._id}`);
    //                 localStorage.setItem('isAdmin', `${res.roles.includes('Admin')}`);
    //             })
    //             history.push('/')
    //         } else {
    //             history.push('/user/login')
    //         }
    //         console.log(res);

    //     }).catch(err => {
    //         console.log("Errorrrrrrrrrrrrrrrrrrrr");
    //         console.log(err);
    //     })
    // }

    // handleFormElementChange(event) {

    //     // let debounce;
    //     // const { value, id } = event.target;
    //     // const parsedId = camelCased(id);
    //     // if (debounce) {
    //     //     clearTimeout(debounce);
    //     //     debounce = null;
    //     // }
    //     // debounce = setTimeout(() => {
    //     //     this.setState({
    //     //         [parsedId]: value
    //     //     })
    //     //     debounce = null;
    //     // }, 200);


    //     const { value, id } = event.target;
    //     const parsedId = camelCased(id);
    //     this.setState({
    //         [parsedId]: value
    //     })
    // }

    render() {
        console.log("App");
        console.log(this.props);
 
        // const { history } = this.props;
        const { isLogged, isAdmin } = this.state;
        return (<div className="main">
            <Header isAdmin={this.state.isAdmin} username={this.state.username} history={this.props.history} location={this.props.location} />
            <main className="main-content">
                <div className="wrapper">
                    <ToastContainer autoClose={3500} />
                    <Suspense fallback={<div className="loading">
                        <header>
                            <h2>Loading...</h2><span></span>
                        </header>
                    </div>}>
                        <Switch>
                            {isAdmin && <Route path="/cherry/remove/:id"
                                render={({ history, match }) => <Remove history={history} match={match} />}
                            />}
                            {isAdmin && <Route path="/cherry/edit/:id"
                                render={({ history, match }) => <Edit history={history} match={match} />}
                            />}
                            {isAdmin && <Route path="/cherry/create"
                                render={({ history, match }) => <Create history={history} match={match} />}
                            />}
                            <Route path="/user/register" exact
                                render={({ history }) => (!this.state.isLogged ? <Register
                                    // handleSubmit={this.handleSubmit}
                                    // handleFormElementChange={this.handleFormElementChange}
                                    history={history}
                                /> :
                                    <Redirect to="/" />
                                    // this.pushToHome(history)
                                )}
                            />
                            <Route path="/user/login" exact
                                render={({ history }) => (!this.state.isLogged ? <Login
                                    // handleSubmit={this.handleSubmit}
                                    // handleFormElementChange={this.handleFormElementChange}
                                    setLogin={this.setLogin}
                                    history={history}
                                /> : this.pushToHome(history))}
                            />
                            <Route path="/user/logout"
                                render={({ history }) => (this.state.isLogged ? this.logout(history) : null)}
                            />
                            {isLogged && <Route path="/order/products/:id"
                                render={({ history, match, location }) => <Basket history={history} location={location} match={match} basket={history.location.state} userId={this.state.userId} />}
                            />}
                            {isLogged && <Route path="/order/products"
                                render={({ history, location }) => <Basket history={history} location={location} basket={history.location.state} userId={this.state.userId} />}
                            />}
                            {isLogged && <Route path="/order/my-orders"
                                render={() => <UserOrders userId={this.state.userId} />}
                            />}
                            {/* isAdmin */}
                            {isAdmin && <Route path="/admin/pending-orders"
                                render={() => <AdminOrders />}
                            />}
                            {isAdmin && <Route path="/admin/approve-order/:id" exact
                                render={({ history, match }) => <ApproveOrder history={history} match={match} />}
                            />}
                            {isAdmin && <Route path="/admin/remove-order/:id"
                                render={({ history, match }) => <RemoveOrder history={history} match={match} />}
                            />}
                            {/* <Route path="/orders/user-orders"
                                render={() => (!isLogged && <Redirect to="/user/login" />)}
                            /> */}
                            <Route path="/about" exact component={About} />
                            <Route path="/menu" exact
                                render={() => <Menu isAdmin={this.state.isAdmin} />}
                            />
                             <Route path="/" exact
                                render={() => <Home isAdmin={this.state.isAdmin} />}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>)
    }
}

export default App;