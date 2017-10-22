import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import * as CategoryActions from '../actions/CategoryActions';

class CategoryList extends Component {

    componentDidMount() {
        this.props.dispatch(CategoryActions.fetchCategories());
    };

    render() {
        const { categories } = this.props;
        return (
            <div>
                <h1>Categories</h1>
                <List horizontal relaxed>
                    {categories.items !== undefined ? categories.items.map((item) => (
                        <List.Item key={item.name}>
                            <List.Content>
                                <List.Header as='a'>{item.name}</List.Header>
                            </List.Content>
                        </List.Item>
                    )) : null}
                </List>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    categories: state.categories
});

export default connect(
    mapStateToProps
)(CategoryList);