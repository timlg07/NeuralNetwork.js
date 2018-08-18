// class NEURALNETWORK
class NeuralNetwork {
    
    // @param {ActivationFunction} ActivationFunction which is used for all WorkingNeurons
    constructor( activationFunction ){
        this.neurons = {
            input : [],
            hidden: [],
            output: []
        }
        this.activationFunction = activationFunction;
        this.neuronCount = 0;
    }
    
    // @param {Number} amount of hiddenNeurons
    createHiddenNeurons( amount ){
        for( let i=0; i<amount; i++ ){
            this.neurons.hidden.push(new WorkingNeuron( this.activationFunction, this.neuronCount++ ));
        }
    }
    
    // @param {Number} amount of outputNeurons
    createOutputNeurons( amount ){
        for( let i=0; i<amount; i++ ){
            this.neurons.output.push(new WorkingNeuron( this.activationFunction, this.neuronCount++ ));
        }
    }
    
    // @param {Number} amount of inputNeurons
    createInputNeurons( amount ){
        for( let i=0; i<amount; i++ ){
            this.neurons.input.push(new InputNeuron( this.neuronCount++ ));
        }
    }
    
    // @return {Number} amount of Connections
    get amountOfConnections( ){
        return( this.neurons.hidden==0 
            ? this.neurons.input .length *
              this.neurons.output.length
            : this.neurons.input .length *
              this.neurons.hidden.length +
              this.neurons.hidden.length *
              this.neurons.output.length
        );
    }
    
    // @return {Number} amount of Neurons
    get amountOfNeurons( ){
        return this.neuronCount;
    }
    
    // @param {Object} weight-info: {Array<Number>} list / {boolean} rand / {boolean} zero
    createFullMesh( weight ){
        let w = weight.list ? ix=>weight.list[ix]:
                weight.rand ? ix=>Math.random( ) :
                weight.zero ? ix=>0 : /*default*/ ()=>0
        ;
        let index = 0;
        
        if( this.neurons.hidden.length === 0 ){
            
            for( let o of this.neurons.output ){
                for( let i of this.neurons.input ){
                    o.newConnection = new Connection( i, w( index++ ) );
                }
            }
            
        } else {
            
            for( let h of this.neurons.hidden ){
                for( let i of this.neurons.input ){
                    h.newConnection = new Connection( i, w( index++ ) );
                }
            }
            for( let o of this.neurons.output ){
                for( let h of this.neurons.hidden ){
                    o.newConnection = new Connection( h, w( index++ ) );
                }
            }
            
        }
    }
}
        
        
        
        
        
        
        
        
        