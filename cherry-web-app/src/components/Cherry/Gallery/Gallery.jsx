import React, { Fragment, Component } from 'react';

import SingleImg from './SingleImg/SingleImg';

import cherryService from '../../../services/cherry-service';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: null,
            sort: ''
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        cherryService.getGallery(id).then(cherry => {
            const images = cherry.gallery;
            const sort = cherry.sort;
            this.setState({ images, sort });
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        const { images, sort } = this.state;
        return (
            <section class="site-section gallery">
                {images ? <Fragment>
                    <header>
                        <h2>Галерия  - {sort}</h2>
                    </header>
                    {images.length
                        ? <ul class="image-gallery">
                            {images.map((image, index) => {

                                return <SingleImg
                                    key={index}
                                    index={index}
                                    sort={sort}
                                    imageUrl={image}>
                                </SingleImg>;
                            })
                            }
                        </ul>
                        : <header>
                            <h4>Няма качени снимки за сорт {sort}!</h4>
                        </header>
                    }
                </Fragment> : <header>
                        <h2>Loading...</h2>
                    </header>
                }
            </section>
        );
    }
}
export default Gallery;