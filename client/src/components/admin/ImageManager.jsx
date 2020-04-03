import React from 'react';
import { connect } from 'react-redux';

import { startSetImages, startAddImage, startRemoveImage } from '../../actions/imageActions';

import Alert from '../common/Alert';

class ImageManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            selectedImage: {},
            errors: {},
            isSubmitting: false,
            isLoading: false
        };
        this.onRemoveImage = this.onRemoveImage.bind(this);
        this.onCancelTask = this.onCancelTask.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.handleUploadImageChange = this.handleUploadImageChange.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({ isLoading: true }))
        this.props.startSetImages()
            .then(data => {
                this.setState(() => ({ isLoading: false }));
            })
            .catch(err => {
                console.log('images error: ', err);
                this.setState(() => ({ isLoading: false }));
            });
    }


    handleUploadImageChange(e) {
        this.setState(() => ({ isSubmitting: true }));
        const data = new FormData();
        data.append('image', e.target.files[0]);
        this.props.startAddImage(data)
            .then(() => {
                this.setState(() => ({ isSubmitting: false }));
            })
            .catch(err => {
                this.setState(() => {
                    return {
                        errors: { text: err.data.message },
                        isSubmitting: false
                    };
                });
            });
    }

    onRemoveImage() {
        this.setState(() => ({ isSubmitting: true }));
        this.props.startRemoveImage(this.state.selectedImage._id)
            .then(res => {
                console.log('Image Manager: ', res);
                this.setState(() => {
                    return {
                        isEdit: false,
                        selectedImage: {},
                        isSubmitting: false
                    }
                });
            })
            .catch(err => console.log('Image eror: ', err));
    }

    onCancelTask() {
        this.setState(() => {
            return {
                isEdit: false,
                selectedImage: {}
            }
        });

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    onImageSelect(image) {
        this.setState(() => {
            return {
                isEdit: true,
                selectedImage: image
            };
        });

        if (this.props.getImage) {
            this.props.getImage(image, this.state.isEdit);
        }
    }

    _renderImagesGrid() {
        if (this.state.isLoading) {
            return <h1>Loading...</h1>
        }
        if (this.props.images.length < 1) {
            return <h2>No Images Uploaded</h2>
        }
        return this.props.images.map(image => {
            let classNames = 'single-image';
            if (image._id === this.state.selectedImage._id) {
                classNames += ` active-image`;
            }
            return (<img onClick={() => {
                this.onImageSelect(image)
            }} className={classNames} key={image._id} src={image.publicUrl} />)
        });
    }

    render() {
        return (
            <section className="container image-manager__container height-75" style={{ marginTop: '2rem' }}>
                {this.state.errors.text && <Alert
                    message={this.state.errors.text}
                    status="danger"
                    close={() => {
                        this.setState(() => {
                            return { errors: {} }
                        });
                    }}
                />}
                <h1 className="image-manager__title">Image Manager</h1>
                <div className="image-manager__action">
                    {!this.state.isEdit ? (
                        <React.Fragment>
                            <label disabled={this.state.isSubmitting} className="btn" htmlFor="image">{this.state.isSubmitting ? 'Uploading...' : 'Add Image'}</label>
                            <input disabled={this.state.isSubmitting} id="image" style={{ display: "none" }} type="file" onChange={this.handleUploadImageChange} />
                        </React.Fragment>
                    ) : (
                            <div className="image__actions">
                                <button disabled={this.state.isSubmitting} className="btn btn--danger" onClick={this.onRemoveImage}>Delete</button>
                                <button disabled={this.state.isSubmitting} className="btn " onClick={this.onCancelTask}>Cancel</button>
                            </div>
                        )}
                </div>
                <div className="images-container">
                    {this._renderImagesGrid()}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images.data.length > 0 ? state.images.data : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetImages: () => dispatch(startSetImages()),
        startRemoveImage: (id) => dispatch(startRemoveImage(id)),
        startAddImage: (imageData) => dispatch(startAddImage(imageData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager);
