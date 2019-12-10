import React, { Fragment } from 'react';

// import PropTypes from 'prop-types';

function SingleImg({ imageUrl, sort, index }) {
    const numb = index + '_' + sort;
    return (<Fragment>
        <input type="checkbox" name={numb} id={numb} />
        <li>
            <figure>
                <img src={imageUrl} alt={numb} />
                <figcaption>{sort}</figcaption>
                <label htmlFor={numb}></label>
            </figure>
        </li>
    </Fragment>);
}

// SingleImg.propTypes = {
//     imagePath: PropTypes.string,
//     sort: PropTypes.string,
// }

export default SingleImg;