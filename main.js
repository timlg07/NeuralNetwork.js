function main( ){
    let nn = new NeuralNetwork( $DEFAULT_ACTIVATION_FUNCTIONS.sigmoid );
    let ca = visualization();
    let nv = new NeuralNetworkView( nn, ca );
    
    nn.createInputNeurons (4);
    nn.createHiddenNeurons(5);
    nn.createOutputNeurons(2);
    nn.createFullMesh({ rand:true });
    
    nv.display();
    
}