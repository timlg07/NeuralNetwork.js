// class CONNECTION
class Connection {
    
    // @param {Neuron} startNeuron
    //        {Number} weight
    constructor( neuron, weight ){
        this.neuron = neuron;
        this.weight = weight;
    }
    
    // @return {Number} weighted value
    get value( ){
        return this.neuron.value * this.weight;
    }
    
    // @param {Number} deltaWeight
    addWeight( d_weight ){
        this.weight += d_weight
    }
}