import React from 'react';
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    componentDidMount(){
        const {fetchCollectionsStartAsync}= this.props;
        fetchCollectionsStartAsync();
    }
    render(){
        const {match, selectIsCollectionsLoaded} = this.props;
    return(
    <div className='shop-page'>
        <Route exact path={`${match.path}`} 
        component={CollectionsOverviewContainer}
        />
        <Route path={`${match.path}/:collectionId`} render={props =>(
            <CollectionPageWithSpinner 
            isLoading={!selectIsCollectionsLoaded} 
            {...props}/>
        )} 
        />
    </div>
    );
    }
}

const mapStateToProps= createStructuredSelector({
    selectIsCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: ()=> 
    dispatch(fetchCollectionsStartAsync())
});

export default 
connect(mapStateToProps, mapDispatchToProps)
(ShopPage);