import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] constuctor');
    }

    state = {
        persons: [
            { id:'dsfdsd',name: 'Vishu', age: 38 },
            { id:'dsfdsd1',name: 'Suraj', age: 29 },
            { id:'dsfdsd2', name: 'Max', age: 23 }
        ],
        otherState: 'some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter : 0,
        authenticated: false
    };

    static getDerivedStateFormProps(props, state){
        console.log('[App.js] getDerivedStatefromProps', props);
        return state;
    }
    componentDidMount(){
        console.log('[App.js] componentDidMount');
    }

  /*  componentWillMount(){
        console.log('[App.js] componentWillMount')
    }*/

  shouldComponentUpdate(nextProps, nextState){
      console.log('shouldcomponent');
      return true;
  }
    nameChangedHandler = ( event, id ) => {
        const personIndex = this.state.persons.findIndex(p =>{
            return p.id === id
        });
        const person = {...this.state.persons[personIndex]};
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState( {
            persons:persons
        } )
    }

    deletePersonHandler = (personIndex) =>{
// const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({persons:persons});
    }
    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState( { showPersons: !doesShow } );
    };
  loginHndler = () => {
      this.setState({authenticated: true});
  };
    render () {

        console.log('[App.js] rendor');
        let persons = null;
        if ( this.state.showPersons ) {
            persons =
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuntheticted = {this.state.authenticated}
                />;
        }

        return (

            <withClass classes={classes.App}>
                <button onClick = {()=> {
                this.setState({showCockpit: false});
                }}
                >Remove Cockpit</button>
                {this.state.showCockpit ? (
                    <Cockpit
                    showPerson={this.state.showPersons}
                    personsLength={this.state.persons.length}
                    clicked={this.togglePersonsHandler}
                    login = {this.loginHndler}
                />) :null}
                {persons}
            </withClass>

        );
// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default withClass(App, classes.App);





