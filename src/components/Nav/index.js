import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { Menu } from 'semantic-ui-react';

class Nav extends Component {  
    state = { activeItem: 'home' }

    handleItemClick = (e, { name, url }) => {
        this.setState({ 
            activeItem: name 
        })

        this.props.history.push(url)
    }
  
    render() {
      const { activeItem } = this.state
      const { user, activeUrl } = this.props;
      
      return (
      <Menu secondary>
        <Menu.Item url='/' name='home' active={activeUrl || activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='new_question'
          url='/add'
          active={activeItem === 'new_question'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='leader_board'
          url='/leader-board'
          active={activeItem === 'leader_board'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
        <Menu.Item
          name={ `Hello, ${ user && user.name}`}
          active={activeItem === 'login'}
          url='/login'
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='logout'
          url='/logout'
          active={activeItem === 'logout'}
          onClick={(e) =>  {
            this.props.setUser(null);
            e.preventDefault();
          }}
        />
        </Menu.Menu>
        </Menu>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
      setUser: (id) => dispatch(setAuthedUser(id)) 
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Nav));