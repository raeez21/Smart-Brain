import React from 'react';


class Signin extends React.Component{
        constructor(props){
            super(props)
            this.state={
                signInEmail:'',
                signInPass:''

            }
        }
        onEmailChange = (event)=>{
            this.setState({signInEmail: event.target.value})
        }
        onPassChange = (event)=>{
            this.setState({signInPass: event.target.value})
        }
        onSubmitSignIn = ()=>{
            fetch("http://localhost:3000/signin",{
                method:'post',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPass
                })
            })
            .then(resp=> {
                if (resp.ok) {
                    return resp.json();
                } 
                else if (resp.status === 400) {
                    throw new Error('Failed to sign in: Invalid email or password');
                }
            })
            .then(user=>{
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')  
                }
                else{
                    throw Error
                }
            })
            .catch(err=>console.log("Couldn't sign in"))
            
        }
        render(){
            return (
                <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange}
                                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="email" 
                                            name="email-address" 
                                            id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPassChange}
                                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="password" 
                                            name="password" 
                                            id="password" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={ this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in" 
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p  onClick={ () => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            );
    }
} 

export default Signin;