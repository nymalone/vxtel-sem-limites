import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      origin: '',
      destinity: '',
      phonePlan: '30',
      minutes: 0,
      message: '',
      noPlanCost: '',
      costWithPlan: '',
    };

    this.handleSubmit
     = this.handleSubmit
    .bind(this);
    this.destinity = this.destinity.bind(this);
    this.origin = this.origin.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.planChange = this.planChange.bind(this);
    this.minuteschange = this.minuteschange.bind(this);
    this.calculate = this.calculate.bind(this)
  }
  
  origin(e){
    this.setState({origin: e.target.value});
    e.preventDefault();
  }

  destinity(e){
    this.setState({destinity: e.target.value});
    e.preventDefault();
  }

  planChange(e){
    this.setState({phonePlan: e.target.value});
    e.preventDefault();
    console.log(e.target.value)
  }

  minuteschange(e){
    this.setState({minutes: e.target.value});
    e.preventDefault();
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.checkInput();
  }
  

  //handle errors
  checkInput(){
    if (
      isNaN(parseFloat(this.state.origin)) ||
      isNaN(parseFloat(this.state.destinity)) ||
      isNaN(parseFloat(this.state.minutes))
    ){
      this.setState({message: 'Não reconhecemos esse DDD. Tente novamente!'})
      return
    }    
      this.calculate()
    
    
  }

  calculate(){
    let costPerMinute
    let dddSum = parseFloat(this.state.origin) + parseFloat(this.state.destinity)
    if(![27, 28, 29].includes(dddSum)){
      console.log('Infelizmente ainda não possuímos cobertura para estes DDDs')
    } else {
      switch (dddSum){
        case 27:
          costPerMinute = 1.9
          break;
        case 28:
          costPerMinute = 1.7
          break;
        case 29:
          costPerMinute = 0.9
          break;
        default:
          console.log('default case')
          break;
      }
      
      if(parseFloat(this.state.origin) !== 11){
        costPerMinute += 1
      }

      this.setState({noPlanCost: (costPerMinute * this.state.minutes).toFixed(2)})

      if(parseFloat(this.state.minutes) > parseFloat(this.state.phonePlan)){
        let extraTime = parseFloat(this.state.minutes) - parseFloat(this.state.phonePlan)
        this.setState({costWithPlan: (costPerMinute * 1.1 * extraTime).toFixed(2)})
      } else {
        this.setState({costWithPlan: 0})
      }


      console.log(costPerMinute)


    }
  }

  render() {
    return (
      <div className="App">
        <div  className="navbar">
         <img className="logo" src="./images/logo.png" alt="logo" /> 
         </div>
          <div className="title"> 
         
          <p>Calcule de forma <span>rápida</span> e  <span>fácil </span> o valor da sua ligação! </p>
          </div>
          <form className="form" onSubmit={this.handleSubmit
          }>
            <br/>
            <label>
              DDD de origem: 
            </label>
            <input className="input" type="text" name="origin" value={this.state.origin} onChange={this.origin}    />
            
            <br/>
            <label>
              DDD de destino: 
            </label>
            <input className="input" type="text" name="destinity" value={this.state.destinity} onChange={this.destinity}   />

            <br/>
            <label>
              Minutos: 
            </label>
            <input className="input" type="text" name="minutes" value={this.state.minutes} onChange={this.minuteschange}   />

            <br/>
            <label>
              Plano: 
            </label>
            <select className="input" id="plans" name="plans" value={this.state.phonePlan} onChange={this.planChange}>
              <option value="30">FaleMais 30</option>
              <option value="60">FaleMais 60</option>
              <option value="120">FaleMais 120</option>
            </select>
            
            <br/>
            <label>
              {this.state.checked} Valor com plano: ${this.state.costWithPlan}
            </label>  
            
            <br/>
            <label>
              {this.state.checked} Valor sem plano: ${this.state.noPlanCost}
            </label>

            <br/> 
            <input className="button" type="submit" value="Calcular!"/>
          
          </form>
      
          <br/>
          <label className="message">{this.state.message}</label>
          <br/>

           <div className="footer"> 
          <p>Gostou? </p>
          <p> Adquira <span>agora</span> o seu plano e aproveite as nossas ofertas! </p>
          </div>

      </div>
    );
  }
}

export default App;