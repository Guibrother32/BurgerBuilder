import React, {Component} from 'react';
import Aux from '../../hoc/aaux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{

    //this is also possible
    // constructor(props){
    //     super(props);
    //     this.state = { }
    // }

    state = {
        ingredients: {
            meat:2,
            cheese:2,
            bacon:1,
            salad:1
        }
    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Burger Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder