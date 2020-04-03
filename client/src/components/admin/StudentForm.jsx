import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-date-picker';
import { isEmail } from 'validator';


import ImageManager from './ImageManager';

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            formData: {
                name: props.student ? props.student.name : '',
                email: props.student ? props.student.email : '',
                phone: props.student ? props.student.phone : '',
                fees: props.student ? props.student.fees : 0,
                image: (props.student && props.student.image) ? props.student.image._id : '',
                dob: props.student ? new Date(props.student.dob) : new Date(),
                admissionDate: props.student ? new Date(props.student.admissionDate) : new Date()
            },
            selectedImage: props.student ? props.student.image : null,
            errors: {}
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleFeesChange = this.handleFeesChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleAdmissionDateChange = this.handleAdmissionDateChange.bind(this);
        this.handleRemoveImage = this.handleRemoveImage.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    handleEmailChange(e) {
        const email = e.target.value;
        this.setState((prevState) => {
            return {
                formData: {
                    ...prevState.formData,
                    email
                }

            };
        });
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.setState((prevState) => {
            return {
                formData: { ...prevState.formData, name }
            };
        });
    }

    handlePhoneChange(e) {
        const phone = e.target.value;
        this.setState((prevState) => {
            return {
                formData: { ...prevState.formData, phone }
            };
        });
    }

    handleFeesChange(e) {
        const fees = e.target.value;
        this.setState((prevState) => {
            return {
                formData: { ...prevState.formData, fees }
            };
        });
    }

    handleDobChange(date) {
        this.setState((prevState) => {
            return {
                formData: { ...prevState.formData, dob: date }
            };
        });
    }

    handleAdmissionDateChange(date) {
        this.setState((prevState) => {
            return {
                formData: { ...prevState.formData, admissionDate: date }
            };
        });
    }

    handleOpenModal() {
        this.setState(() => {
            return { modalIsOpen: true }
        });
    }

    handleCloseModal() {
        this.setState(() => {
            return { modalIsOpen: false, selectedImage: null }
        });
    }

    handleSelectImage() {
        const errors = { ...this.state.errors };
        delete errors.image;
        this.setState((prevState) => {
            return {
                formData: {
                    ...prevState.formData,
                    image: this.state.selectedImage._id
                },
                modalIsOpen: false,
                errors
            };
        });
    }

    handleRemoveImage() {
        this.setState((prevState) => {
            return {
                formData: {
                    ...prevState.formData,
                    image: ""
                },
                selectedImage: null
            };
        });
    }

    onSubmitForm(e) {
        e.preventDefault();

        this.setState(() => {
            return { errors: {} }
        });

        if (!this.state.formData.name) {
            this.setState((prevState) => {
                return { errors: { ...prevState.errors, name: 'Please Enter Name' } }
            });
        }

        if (!this.state.formData.email) {
            this.setState((prevState) => {
                return { errors: { ...prevState.errors, email: "Please Enter Email" } }
            });
        } else if (!isEmail(this.state.formData.email)) {
            this.setState((prevState) => {
                return { errors: { ...prevState.errors, email: "Please Enter Valid Email" } }
            });
        }

        if (this.state.formData.phone.toString().length < 10) {
            this.setState(prevState => {
                return { errors: { ...prevState.errors, phone: "Please Enter Valid Phone Number" } }
            });
        }

        if (!this.state.formData.image) {
            this.setState(prevState => {
                return { errors: { ...prevState.errors, image: "Please Choose Image" } }
            });
            return;
        }

        if (Object.keys(this.state.errors).length === 0) {
            this.props.onSubmit(this.state.formData);
        }
    }

    _renderModalContent() {
        return (
            <div>
                <ImageManager
                    getImage={(image) => {
                        this.setState(() => {
                            return { selectedImage: image }
                        });
                    }}
                    onCancel={() => {
                        this.setState(() => {
                            return { selectedImage: null }
                        });
                    }}
                />
                {(this.state.selectedImage) && <button className="btn" onClick={this.handleSelectImage}>Select</button>}
                <button onClick={this.handleCloseModal} className="btn btn-close">Close</button>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.onSubmitForm} className="student__form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.formData.name}
                        onChange={this.handleNameChange}
                    />
                    {this.state.errors.name && <p className="error-label">{this.state.errors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.formData.email}
                        onChange={this.handleEmailChange}
                    />
                    {this.state.errors.email && <p className="error-label">{this.state.errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.formData.phone}
                        onChange={this.handlePhoneChange}
                    />
                    {this.state.errors.phone && <p className="error-label">{this.state.errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label>Fees</label>
                    <input
                        type="number"
                        className="form-control"
                        value={this.state.formData.fees}
                        onChange={this.handleFeesChange}
                    />
                </div>
                <div className="form-group choose-image">
                    <label onClick={this.handleOpenModal} className="btn btn--sm">Choose Image</label>
                    {this.state.errors.image && <span className="error-label">{this.state.errors.image}</span>}
                    {this.state.selectedImage && <div className="choose-image__preview">
                        <img src={this.state.selectedImage.publicUrl} />
                        <span className="remove-image" onClick={this.handleRemoveImage}>&times;</span>
                    </div>}
                </div>
                <div className="form-group">
                    <label>Date of Birth</label><br />
                    <DatePicker
                        clearIcon={null}
                        value={this.state.formData.dob}
                        onChange={this.handleDobChange}
                    />
                    {this.state.errors.dob && <span className="error-label">{this.state.errors.dob}</span>}
                </div>
                <div className="form-group">
                    <label>Admission Date</label><br />
                    <DatePicker
                        clearIcon={null}
                        value={this.state.formData.admissionDate}
                        onChange={this.handleAdmissionDateChange}
                    />
                    {this.state.errors.admissionDate && <span className="error-label">{this.state.errors.admissionDate}</span>}
                </div>
                <button disabled={this.props.isSubmitting} className="btn btn--primary">{this.props.student ? 'Update' : 'Add'}</button>
                <Modal
                    className="Modal"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleCloseModal}
                    children={this._renderModalContent()}
                    ariaHideApp={false}
                />
            </form>
        );
    }
}

export default StudentForm;