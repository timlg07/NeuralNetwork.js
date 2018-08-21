// class ACTIVATIONFUNCTION
class ActivationFunction {
    
    // @param {Function(input)} activation
    //        {Function(input)} derivative
    constructor( activation, derivative ){
        this.a = activation;
        this.d = derivative;
    }
}

// gloabal constant DEFAULT_ACTIVATION_FUNCTIONS
const $DEFAULT_ACTIVATION_FUNCTIONS = Object.freeze({
    
    identity: new ActivationFunction(
        input => input,
        input => 1
    ),
    
    sigmoid: new ActivationFunction(
        input => (1/(1+Math.pow(Math.E,-input))),
        input => (1/(1+Math.pow(Math.E,-input))) * (1-activation(input))
    ),
    
    hyperbolicTangent: new ActivationFunction(
        input => {
            let epx = Math.pow(Math.E, input);
            let enx = Math.pow(Math.E,-input);
            return (epx-enx)/(epx+enx);
        },
        input => {
            let e2x = Math.pow(Math.E, 2*input);
            return (4*e2x) / Math.pow(e2x+1, 2);
        }
    )
    
});