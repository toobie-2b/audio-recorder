import React from 'react'

import vmsg from 'vmsg'

const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})

class App extends React.Component{

  state = {
    isLoading:false,
    isRecording:false,
    recording:null
  }

  record = async () => {
    this.setState({isLoading:true})

    if(this.state.isRecording){
      const blob = await recorder.stopRecording()
      this.setState({
        isLoading: false,
        isRecording: false,
        recording:URL.createObjectURL(blob)
      })
    }

    else {
      try {
        await recorder.initAudio()
        await recorder.initWorker()
        recorder.startRecording()
        this.setState({isLoading:false, isRecording: true})
      } catch (error) {
        alert(error.message)
        this.setState({isLoading: false})
      }
    }
  }

  render() {
    const {isLoading, isRecording, recording} = this.state;

    return(
      <React.Fragment>
        <button onClick={this.record} disabled={isLoading}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <br/>
        {
          recording != null && isRecording == false
          ? <audio src={recording} controls/>
          : null
        }
      </React.Fragment>
    )
  }
}

export default App;
