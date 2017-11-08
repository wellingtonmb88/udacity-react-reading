import React, { Component } from 'react';
import logo from '../logo.svg';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import If from './If';

export class MenuComponent extends Component {

    static propTypes = {
        category: PropTypes.string,
        handleGoBackToHome: PropTypes.func,
        handleGoBackToCategory: PropTypes.func
    };

    handleItemClick = (e, { name }) => {
        const { category, handleGoBackToHome, handleGoBackToCategory } = this.props;

        if (name === 'category' && category !== undefined) {
            handleGoBackToCategory(category);
        } else {
            handleGoBackToHome();
        }
    };

    render() {
        const { category } = this.props;
        return (
            <div >
                <Menu stackable>
                    <Menu.Item>
                        <img src={logo} className="App-logo" alt="logo" />
                    </Menu.Item>
                    <Menu.Item
                        name='home'
                        onClick={this.handleItemClick}>Home</Menu.Item>

                    <If test={category !== undefined}>
                        <Menu.Item
                            name='category'
                            onClick={this.handleItemClick}>Category</Menu.Item>
                    </If>
                </Menu>
            </div>
        )
    }
};

export default MenuComponent;
