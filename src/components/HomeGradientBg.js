import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export class HomeGradientBg extends React.Component{
    constructor(){
        super();
        this.state = {
            color:['#6FE5DE', '#6676FD']
        }
    }

    setColor(color){
        this.setState({
            color
        });
    }

    render(){
        return <LinearGradient
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={{flex: 1, position:"absolute", top:0, bottom:0, left:0, right:0}}
            colors={this.state.color}>
        </LinearGradient>
    }
}
