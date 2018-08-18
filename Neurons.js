// abstract class NEURON
class Neuron {
    
    // @param {Number} NeuronID
    constructor( id ){ this.id = id }
    
    // abstract {Number} getValue
    get value( ){}
}


// class INPUTNEURON extends NEURON
class InputNeuron extends Neuron {
    
    // @Override
    constructor( id ){
        super( id );
        this._value = 0;
    }
    
    // @Override
    // @return {Number} InputValue
    get value( ){
        return this._value;
    }
    
    // @param {Number} newValue
    set value( value ){
        this._value = value;
    }
}


// class WORKINGNEURON extends NEURON
class WorkingNeuron extends Neuron {
    
    // @Override
    constructor( activationFunction, id ){
        super( id );
        this.connections = [];
        this.function = activationFunction;
    }
    
    // @Override
    // @return {Number} input after activation
    get value( ){
        return this.function.a( this.input );
    }
    
    // @return {Number} total input
    get input( ){
        let sum = 0;
        for( let c of this.connections ){
            sum += c.value;
        }
        return sum;
    }
    
    // @method adds a Connection
    // @param {Connection} newConnection
    set newConnection( c ){
        this.connections.push( c );
    }
}
