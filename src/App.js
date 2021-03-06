import React from 'react'
import {v4 as uuid} from 'uuid'
import {Route, BrowserRouter as Router} from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'

class App extends React.Component {
    state = {
        home: true,
        about: false,
        todos: [
            {
                id: uuid(),
                title: "Take out the trash",
                completed: false
            },
            {
                id: uuid(),
                title: "Finish Homework",
                completed: false
            },
            {
                id: uuid(),
                title: "Feed goldfish",
                completed: false
            }
        ]
    }

    swap = () => { 
        this.setState({
            home: !this.state.home,
            about: !this.state.about,
        })
    }

    complete = (id) => {
        this.setState({ todos: this.state.todos.map(todo => {
            if (todo.id === id) 
                todo.completed = !todo.completed

            return todo
        })})
    }

    delete = (id) => {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id )})
    }

    addItem = (title) => {
        const item = {
            id: uuid(),
            title, // Works becase key == value
            completed: false
        }

        this.setState({todos: [...this.state.todos, item]})
    }

    render() {
        const {home, about, todos} = this.state

        const fns = {
            swap: this.swap,
            complete: this.complete,
            delete: this.delete,
            addItem: this.addItem
        }

        return (
            <Router>
                <div className="App">
                    <div className="wrapper">
                        <Route exact path='/' render={(props) => <Home show={home} todos={todos} fns={fns}/>} />
                        <Route exact path='/About' render={(props) => <About show={about} fns={fns}/>} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
