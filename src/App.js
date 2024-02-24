
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import { Component } from 'react';

const PAT = 'ddda648bf01c442496087f233d2489ef';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const getRequestOptions = (imageUrl)=>{
  console.log("here url:"+imageUrl)
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions
} 

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    } 
  }
  
  onInputChange = (event)=>{
    console.log(event.target.value)
    this.setState({input:event.target.value})
  }
  onButtonSubmit = () =>{
    
    console.log("input IS"+this.state.input)
    this.setState({imageUrl:this.state.input})
    console.log("URLS IS"+this.state.imageUrl)
    let requestOptions = getRequestOptions(this.state.input)
    console.log("req OPt"+requestOptions)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result.outputs[0].data.regions[0].region_info.bounding_box)})

  }
  render() {
    return(
    <div className="App">
      <ParticlesBg className="particles" type="balls" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit}/> 
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
    )
    };
}

export default App;
