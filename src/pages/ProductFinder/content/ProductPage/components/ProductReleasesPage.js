import { Grid, Typography, List } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Axios from 'axios';
import * as _ from 'lodash';
import React, { useEffect, useState } from "react";
import ComponentRelease from "../../../../../models/ComponentRelease";
import groupReleases from '../../../../../utilities/GroupReleases';
import SingleComponentPage from '../SingleComponentPage';
import ProductComponent from '../../../../../models/ProductComponent';

function ProductReleasesPage(props) {
    const { classes, product, productRelease, store, setStore, loadingState } = props;

    const [componentReleases, setComponentReleases] = useState({});
    // console.log('product:', product);
    // console.log('productRelease:', productRelease);
    // console.log('store:', store);

    const releases = productRelease.componentReleases.all;
    // console.log('component release:', releases);

    // Check w/ global store for this product release
    // if not there, load it

    // for now, just load it always
    useEffect(() => {
        // Get subscription list
        loadingState.incrementLoader();
        async function fetchComponentReleases() {
            console.log('=========getting component releases');
            const urlBase = [
                "https://releases.teradici.com/jsonapi/node/teradici_release"
            ];

            const urlTerms = [];
            const filter = [];
            const include = [];

            include.push('field_teradici_product');
            include.push('field_teradici_product.field_platform');

            include.push('field_teradici_document');
            include.push('field_teradici_document.field_doctype');
            include.push('field_teradici_document.field_resource_variant');

            include.push('field_teradici_download');
            include.push('field_teradici_download.field_resource_variant');

            include.push('field_eula');
            include.push('field_eula.field_local_file_public_');

            filter.push('filter[a][condition][path]=id');
            filter.push('filter[a][condition][operator]=IN');
            _.forEach(releases, cr => { filter.push('filter[a][condition][value][]=' + cr) });
            const url = urlBase + '?include=' + include.join(',') + '&' + filter.join("&");

            const response = await Axios(url);

            const crs = [];
            console.log('included:',response.data.included);
            const components = _.map(
                _.filter(response.data.included,['type','taxonomy_term--teradici_products']), c=>{
                    return new ProductComponent(c, {store:store});
                });
            _.forEach(response.data.data, cr => {
                return crs.push(new ComponentRelease(cr, { store: store, included: response.data.included }));
            });

            const groupedReleases = groupReleases(crs);
            console.log('grouped releases:', groupedReleases);
            setComponentReleases(groupedReleases);
            loadingState.decrementLoader();
        }
        fetchComponentReleases();
    }, []);

    return (
        <React.Fragment>
            {componentReleases.all && componentReleases.all.length === 1 &&
                <SingleComponentPage 
                    release={componentReleases.current}
                />}
            </React.Fragment>
    )
}
export default ProductReleasesPage;