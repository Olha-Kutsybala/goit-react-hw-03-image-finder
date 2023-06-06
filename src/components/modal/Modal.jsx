import { Component } from 'react';


class Modal extend Component{
    componentDidMount(){
        window.addEventListener('keydown', this.keyDown);
}
}

export default Modal