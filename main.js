function main( ){
    let nn = new NeuralNetwork( $DEFAULT_ACTIVATION_FUNCTIONS.sigmoid );
    let ca = visualization();
    let nv = new NeuralNetworkView( nn, ca );
    
    nn.createInputNeurons (4);
    nn.createHiddenNeurons(5);
    nn.createOutputNeurons(2);
    nn.createFullMesh({ rand:true });
    
    nv.display();
    
    
    // DEMO //
    setTimeout(()=>{
        nn.neurons.input[0].value = 0.3;
        nn.neurons.input[1].value = 0.8;
        nn.neurons.input[2].value = 0.1;
        nn.neurons.input[3].value = 0.9;
    },1000);
    
    setTimeout(()=>{
        nn.neurons.hidden[0].connections[0].weight = 0.1;
        nn.neurons.hidden[0].connections[1].weight = 0.9;
    },2000);
    
}