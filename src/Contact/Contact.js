import React, { Component } from 'react'
import axios from 'axios';
import '../Contact/Contact.css'

class Contact extends Component {

    state = {
        formFilled: true,
        success: false,
        failure: false,
        send: true,
        everythingElse: true
    }


    handleSuccess() {
        setTimeout(
            function () {
                this.setState(
                    {
                        success: false,
                        send: true
                    }
                );
            }
                .bind(this),
            3000
        );

    }

    handleFormFilled() {
        setTimeout(
            function () {
                this.setState(
                    {
                        formFilled: true,
                        send: true
                    }
                );
            }
                .bind(this),
            3000
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ send: false })
        this.setState({ failure: false });
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (name && email && message) {
            axios({
                method: "POST",
                url: "https://glacial-plains-54815.herokuapp.com/send",
                data: {
                    name: name,
                    email: email,
                    message: message
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    this.setState({ success: true })
                    this.resetForm()
                    this.handleSuccess()
                } else if (response.data.msg === 'fail') {
                    this.setState(
                        {
                            failure: true,
                            renderForm: false
                        })
                }
            })
        }
        else {
            this.setState({ formFilled: false })
            this.handleFormFilled()
        }
    }

    resetForm() {
        document.getElementById('Main_Form').reset();
    }

    render() {
        return (

            <div className="Contact">
                {this.state.everythingElse && <form id="Main_Form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="Name_Email">
                        <p>
                            Say Hello
                        </p>
                        <div className="Name_Form">
                            <label htmlFor="name">Name*</label>
                            <br></br>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <br></br>
                        <br></br>
                        <div className="Email_Form">
                            <label htmlFor="exampleInputEmail1">Email*</label>
                            <br></br>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="Message">
                        <div className="Message_Form">
                            <p>
                                Message*
                            </p>
                            <br></br>
                            <textarea className="form-control" rows="5" id="message"></textarea>
                        </div>

                    </div>
                    {this.state.send && !this.state.failure && <img id="Submit_Btn" src="./res/send.png" alt="Send" onClick={this.handleSubmit.bind(this)} method="POST" />}
                </form>}
                {this.state.success && <div className="Success">
                    <p>
                        Thanks, your message was sent!!!
                    </p>
                </div>}
                {this.state.failure && <div className="Failure">
                    <p>
                        Well.. this is embarrasing :(
                    </p>
                    <p>
                        try messaging me here instead
                    </p>
                    <a href="mailto:benjaminfkile@gmail.com">Ben Kile</a>
                </div>}
                {!this.state.formFilled && <div className="Incomplete_Form">
                    <p>
                        Fill out all fields
                        </p>
                </div>}
            </div>
        )
    }
}


export default Contact