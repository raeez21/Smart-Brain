import { json } from "express";

const PAT = 'ddda648bf01c442496087f233d2489ef';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const getRequestOptions = (imageUrl)=>{
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
const handleApiCall = (req,resp) =>{
    let requestOptions = getRequestOptions(req.body.input)

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data =>{
            resp.json(data)
        })
        .catch(err=>resp.status(400).json('unable to handle Clarifai api'))

}

const handleImage = (req,resp, db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=>{
            if (entries.length){
                resp.json((entries[0].entries))
            }
            else{
                throw Error
            }
        })
        .catch(err=>resp.status(404).json("Couldn't Update"))
}
export  { handleApiCall, handleImage };