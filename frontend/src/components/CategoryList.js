import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Loader, List } from 'semantic-ui-react';
import * as CategoryActions from '../actions/CategoryActions';
import * as Utils from '../utils/Utils';
class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    };

    render() {
        const { categories } = this.props;
        return (
            <div>
                <h1>Categories</h1>
                <Loader active={categories.items === undefined} size='medium' inline='centered' />
                <List horizontal relaxed>
                    {categories.items !== undefined ? categories.items.map((item) => (
                        <List.Item key={item.name}>
                            <List.Content>
                                <List.Header as='a'
                                    onClick={() => this.props.goToPostListByCategory(item.name)}>{Utils.capitalize(item.name)}</List.Header>
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

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
        goToPostListByCategory: (data) => dispatch(routerActions.push('/' + data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);