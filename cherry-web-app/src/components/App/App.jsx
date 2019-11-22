import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import userService from '../../services/user-service';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import About from '../About/About';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Create from '../Cherry/Create/Create';
import Edit from '../Cherry/Edit/Edit';
// const Login = React.lazy(() => import('../Login/Login'));
// const Register = React.lazy(() => import('../Register/Register'));
// const Create = React.lazy(() => import('../Create'));
// const NotFound = React.lazy(() => import('../NotFound'));

const camelCased = myString => (
    myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
);

class App extends Component {

    state = {
        username: null,
        isAdmin: false,
        userId: ""
    }

    logout() {
        userService.getLogout().then(res => {
            if (res === "Logout successfully!") {
                this.setState({
                    username: null,
                    isAdmin: false,
                    userId: ""
                }, () => {
                    sessionStorage.clear();
                })
            }
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    }
    componentDidMount() {
        const isAdmin = sessionStorage.getItem('isAdmin') === "true";
        if (sessionStorage.getItem('username')) {
            this.setState({
                username: sessionStorage.getItem('username'),
                isAdmin,
                userId: sessionStorage.getItem('userId')
            })
        }
    }

    handleSubmit(event, data, isLoginPage) {
        event.preventDefault();

        userService.post(data, isLoginPage).then(res => {
            if (res.username) {
                this.setState({
                    username: res.username,
                    isAdmin: res.isAdmin,
                    userId: res._id
                }, () => {
                    sessionStorage.setItem('username', `${res.username}`);
                    sessionStorage.setItem('userId', `${res._id}`);
                    sessionStorage.setItem('isAdmin', `${res.isAdmin}`);
                })
            } else {

            }
            console.log(res);

        }).catch(err => {
            console.log(err);
        })
    }

    handleFormElementChange(event) {
        const { value, id } = event.target;
        const parsedId = camelCased(id);
        this.setState({
            [parsedId]: value
        })
    }

    render() {
        return (<div className="main">
            <Header isAdmin={this.state.isAdmin} username={this.state.username} />
            <main className="main-content">
                <div className="wrapper">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route
                                path="/cherry/edit/:id"
                                render={({ match }) => <Edit match={match} />}
                            />
                            <Route path="/cherry/create" component={Create} />
                            <Route
                                path="/user/register"
                                render={() => <Register
                                    handleSubmit={this.handleSubmit}
                                    handleFormElementChange={this.handleFormElementChange}
                                />}
                            />
                            <Route
                                path="/user/login"
                                render={() => <Login
                                    handleSubmit={this.handleSubmit}
                                    handleFormElementChange={this.handleFormElementChange}
                                />}
                            />
                            <Route
                                path="/user/logout"
                                render={() => this.logout()}
                            />

                            <Route path="/about" component={About} />
                            <Route path="/" exact
                                render={() => <Menu
                                    isAdmin={this.state.isAdmin}
                                />}
                            />
                        </Switch>
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>)
    }
}

export default App;