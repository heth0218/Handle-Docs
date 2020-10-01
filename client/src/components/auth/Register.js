import React, { useState, useEffect } from 'react'
import '../../App.css'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = ({ registerUser, isAuthenticated }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [imageUrl, setImageUrl] = useState();
    let history = useHistory()

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
            M.toast({ html: `${name} you have successfully been registered!` })
        }
        // eslint-disable-next-line
    }, [isAuthenticated])


    const { name, email, password, password2 } = user

    const onFileChange = (e) => {
        setImageUrl(e.target.files[0]);
    }

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        if (name === '' || email === "" || password === '' || password2 === '') {
            M.toast({ html: `Kindly fill in all the details` });
        }
        else if (password !== password2) {
            M.toast({ html: `Passwords do not match,Kindly reenter to register successfully!` });
        }
        else {
            console.log(name, email, password, password2);

            const formData = new FormData()
            const item = {
                name, email, password
            }
            for (var key in item) {
                formData.append(key, item[key]);
            }
            console.log(imageUrl)
            formData.append('imageUrl', imageUrl);
            registerUser(formData);
        }
        e.preventDefault();
    }


    return (
        <div>
            <section className="section section-login">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l6 offset-l3">
                            <div className="card-panel login teal darken-2 white-text center">
                                <h2>User Register</h2>
                                <form>
                                    <div className="input-field">
                                        <div className="material-icons prefix">account_circle</div>
                                        <input required type="text" name='name' value={name} id="name" onChange={onChange} />
                                        <label className="white-text" for="name">Name</label>
                                    </div>
                                    <div className="input-field">
                                        <div className="material-icons prefix">email</div>
                                        <input required type="email" name='email' value={email} id="email" onChange={onChange} />
                                        <label className="white-text" for="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <div className="material-icons prefix">lock</div>
                                        <input required type="password" name="password" value={password} id="password" onChange={onChange} />
                                        <label className="white-text" for="password">Password</label>
                                    </div>
                                    <div className="input-field">
                                        <div className="material-icons prefix">lock</div>
                                        <input required type="password" name="password2" value={password2} id="password2" onChange={onChange} />
                                        <label className="white-text" for="password2">Confirm Password</label>
                                    </div>
                                    <h4>Please insert your profile picture here!</h4>
                                    <div className="form-group">
                                        <input type="file" onChange={onFileChange} />
                                    </div>
                                    <input type="submit" value="Register" onClick={onSubmit}
                                        className="btn btn-large btn-extended waves-effect waves-grey white black-text" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})


export default connect(mapStateToProps, { registerUser })(Register)
