
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import { Component } from 'react';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
    } 
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }}
    )
  }
  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row *height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    console.log("displayFaceBox")
    console.log(box)
    this.setState({box:box})
  }
  onInputChange = (event)=>{
    console.log("onInputChange")
    console.log(event.target.value)
    this.setState({input:event.target.value})
  }
  onPicSubmit = () =>{
    
    this.setState({imageUrl:this.state.input})
    fetch('http://localhost:3000/imageurl',{
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
              input:this.state.input
              })
          })
          .then(response => response.json())
          .then(result=>{
                if(result){
                  fetch("http://localhost:3000/image",
                    {
                    method:'put',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        id:this.state.user.id
                        })
                    }
                  )
                  .then(resp=>resp.json())
                  .then(count=>{
                                this.setState(Object.assign(this.state.user,{entries:count}))
                                }
                        )
                  .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(result))})
          .catch(err=>console.log("Error: "+err))
          

  }
  onRouteChange = (route)=>{
    console.log("onRouteChange")
    if(route==="signout")
    {
      
      // this.setState({imageUrl:''})
      this.setState(initialState)
    }
    else if(route==="home"){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  render() {
    console.log("REDNER")
    return(
    <div className="App">
      <ParticlesBg className="particles" type="balls" bg={true} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home'
        ? <div>

            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} 
                      onPicSubmit={this.onPicSubmit}/> 
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : (this.state.route=== "signin" || this.state.route === "signout"
              ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              :<Register onRouteChange = {this.onRouteChange} loadUser={this.loadUser}/>
          )
      }
    </div>
    );
    }
  }

export default App;
