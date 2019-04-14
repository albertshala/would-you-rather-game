import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../../../actions/questions'

class Add extends Component {
    state = {
        optionOneText: '', 
        optionTwoText: '',
        error: null,
        toHome: false,
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ error: null })
        
        const id = e.target.id;
        const newInput = e.target.value;

        this.setState((prevValue) => ({
            optionOneText: id === 'firstQ' ? newInput : prevValue.optionOneText,
            optionTwoText: id === 'secondQ' ? newInput : prevValue.optionTwoText
        }));
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const { optionOneText, optionTwoText } = this.state;
      const { addQuestion } = this.props;

      if ( optionOneText === '' || optionTwoText === '' ){
        this.setState({ error: 'Missing input, please fill in both input fields.'})
      } else {
        addQuestion(this.state);
        
        this.setState({
            optionOneText: '',
            optionTwoText: '',
            error: null,
            toHome: true,
        });

      }
    }
    render() {
        const { optionOneText, optionTwoText, toHome } = this.state;

        if ( toHome === true ) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
            <h1>Create a New Question</h1>
            <p>Would you rather...</p>
            <form className='add-question' onSubmit={this.handleSubmit}>            
                <textarea
                id="firstQ"
                placeholder='Enter your first question?'
                value={optionOneText}
                onChange={this.handleChange}
                className='textarea'
                maxLength={200}
                />
            <p>or</p>
            <textarea
                id="secondQ"
                placeholder='Enter your second question?'
                value={optionTwoText}
                onChange={this.handleChange}
                className='textarea'
                maxLength={200}
                />
            
            {  this.state.error && <div>{this.state.error}</div>}

            <button 
                className='btn'
                type='submit'
                disabled={this.state.error}
                >
                Submit
            </button>
            </form>
            </Fragment>
        )
    }   
}


const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (question) => dispatch(handleAddQuestion(question)) 
    }
}

Add.displayName = 'AddQuestion';

export default connect(null, mapDispatchToProps)(Add);