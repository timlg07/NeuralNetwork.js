// global {Canvas} canvas
var $canvas;

// initializes the visualization of the neural network
// @return {Canvas} created Canvas
function visualization( ){
    document.getElementById( "visualizationCanvas" ).style = "width:90vh;height:90vh;margin:auto;margin-top:3vh";
    
    $canvas = new Canvas( "visualizationCanvas", 1000, 1000 );
    $canvas.obj.style.width  = "100%";
    $canvas.obj.style.height = "100%";/*
    $canvas.fillAll( "#0005" );*/
    
    return $canvas;
}


// gloabal class NEURONVIEW extends CIRCLE extends CANVASNODE // graphical representation of the Neurons
class NeuronView extends Circle {
    
    // @Override
    // @param {Object} x,y-Position
    //        {String} color of the circle / {Image} object
    //        {Neuron} neuron which should be represented
    constructor( { x,y }, color_image, neuron ){
        if( ! neuron instanceof Neuron ){
            throw new TypeError("neuron has to be an instance of Neuron.");
        }
        super( x, y, 10, 0, true, color_image );
        this.neuron = neuron;
    }
    
    // @Override
    // @param {CanvasContext} context on which the NeuronView should be drawn on
    draw( context ){
        super.draw( context );
        context.fillStyle = "#000f";
        context.font = this.radius*0.6 + "px Arial";
        context.fillText( Math.round(this.neuron.value*10)/10, this.mid.x - this.radius*0.3, this.mid.y + this.radius*0.15, this.radius*0.6 );
    }
    
    // @param {Number} max Radius
    set maxRadius( r ){
        this.radius = r;
        this._maxRadius = r;
        this.minRadius = r*0.8;
    }
    
    // @Override
    // @param {Number} frames per second
    update( fps ){
        this.radius = ( (this._maxRadius||0)-(this.minRadius||0) ) * this.neuron.value + (this.minRadius||0);
    }
}


// gloabal class CONNECTIONVIEW extends ROTATEDRECTANGLE extends RECTANGLE extends CANVASNODE // graphical representation of the Connections
class ConnectionView extends RotatedRectangle {
    
    // @Override
    // @param {Number} maximal height of the connectionView
    //        {String} color of the circle / {Image} object
    //        {Connection} connection which should be represented
    //        {NeuronView} start neuron
    //        {NeuronView} end neuron
    constructor( height, color_image, connection, startNeuron, endNeuron ){
        let vector = Vector.initWithPoints( startNeuron.mid,endNeuron.mid );
        super( 
            startNeuron.mid.x, 
            startNeuron.mid.y - height/2, 
            5, vector.distance,
            height, true, color_image
        );
        this.start = startNeuron;
        this.end = endNeuron;
        this.vector = vector;
        this.angle = vector.angle;
        this.rotationPoint = {x:this.x,y:this.y};
        this.connection = connection;
        this.maxHeight = height;
    }
    
    // @Override
    // @param {Number} frames per second
    update( fps ){
        this.height = this.maxHeight * this.connection.weight;
        this.y = this.start.mid.y + this.height/2;
        this.rotationPoint = {x:this.x,y:this.y};
    }
}


// gloabal class NEURALNETWORKVIEW // manages the graphical representation of the whole NeuralNetwork
class NeuralNetworkView {
    
    // @param {NeuralNetwork} net which should be represented
    //        {Canvas} canvas on which the network should be drawn on
    constructor( network, canvas ){
        this.net = network;
        this.canvas = canvas;
        this.neuronViews = [];
        this.connectionViews = [];
    }
    
    // @return {Number} maximum amount of Neurons in all layers
    get maxNeuronsPerLayer( ){
        return Math.max( this.net.neurons.input.length, this.net.neurons.hidden.length, this.net.neurons.output.length );
    }
    
    // displays the NeuralNetwork
    display( ){        
        // CREATES NEURONVIEWS //
        let gapY = 0.2 /*20%*/, marginY = 0;
        let NeuronRadius = this.canvas.width /( Math.max( (this.maxNeuronsPerLayer+1)*(1+gapY), 6+1 ) /*r=d/2*/*2 );
            gapY = NeuronRadius * gapY; 
        let gapX = NeuronRadius * 3;
        
        marginY = this.canvas.width - ( this.net.neurons.input.length*NeuronRadius*2 + (this.net.neurons.input.length-1)*gapY );
        let pos = {x:NeuronRadius*2,y:marginY/2 + NeuronRadius}
        
        for( let n of this.net.neurons.input ){
            let temp = new NeuronView( pos,"#0ca",n );
            temp.maxRadius = NeuronRadius;
            this.neuronViews[n.id] = temp;
            this.canvas.addNode( temp ) ;
            pos.y += 2*NeuronRadius + gapY;
        }
        
        marginY = this.canvas.width - ( this.net.neurons.hidden.length*NeuronRadius*2 + (this.net.neurons.hidden.length-1)*gapY );
        pos.y   = marginY/2 + NeuronRadius; 
        pos.x  += 2*NeuronRadius + gapX;
        
        for( let n of this.net.neurons.hidden ){
            let temp = new NeuronView( pos,"#ea1",n );
            temp.maxRadius = NeuronRadius;
            this.neuronViews[n.id] = temp;
            this.canvas.addNode( temp ) ;
            pos.y += 2*NeuronRadius + gapY;
        }
        
        marginY = this.canvas.width - ( this.net.neurons.output.length*NeuronRadius*2 + (this.net.neurons.output.length-1)*gapY );
        pos.y   = marginY/2 + NeuronRadius; 
        pos.x  += 2*NeuronRadius + gapX;
        
        for( let n of this.net.neurons.output ){
            let temp = new NeuronView( pos,"#af1",n );
            temp.maxRadius = NeuronRadius;
            this.neuronViews[n.id] = temp;
            this.canvas.addNode( temp ) ;
            pos.y += 2*NeuronRadius + gapY;
        }
        
        // CREATES CONNECTIONS //
        for( let n of this.net.neurons.hidden ){
            for( let c of n.connections ){
                let temp = new ConnectionView( NeuronRadius/3, "#aaa",c,this.neuronViews[c.neuron.id],this.neuronViews[n.id] );
                this.connectionViews.push( temp );
                this.canvas.addNode( temp );
            }
        }
        
        for( let n of this.net.neurons.output ){
            for( let c of n.connections ){
                let temp = new ConnectionView( NeuronRadius/3, "#aaa",c,this.neuronViews[c.neuron.id],this.neuronViews[n.id] );
                this.connectionViews.push( temp );
                this.canvas.addNode( temp );
            }
        }
        
        // starts updating and drawing
        this.canvas.startInterval( "fpsDisplay" );
    }
}



