import React, { Fragment, Component } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
            console.log(cherry);
            const images = cherry.gallery;
            const sort = cherry.sort;
            this.setState({ images, sort });
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        const { images, sort } = this.state;
        // cherryService.getGallery(id).then(res => {
        //     if (res.ok) {
        //         toast.info("Успешно изтриване!", {
        //             closeButton: false
        //         })
        //         props.history.push('/');
        //     } else {
        //         toast.error(`${res}`, {
        //             closeButton: false
        //         })
        //         return null;
        //     }

        // }).catch(err => {
        //     console.log(err);
        // })

        return (
            <section class="site-section gallery">
                {images ? <Fragment>
                    {images.length
                        ? <Fragment>
                            <header>
                                <h2>Галерия  - {sort}</h2>
                            </header>
                            <ul class="image-gallery">
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
                        </Fragment>
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
