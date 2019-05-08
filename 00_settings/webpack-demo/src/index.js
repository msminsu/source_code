import _ from 'lodash';

import printMe from './print.js';
import Acd from './accodion.js';
// import './styles.css';
import './style2.scss';

function component() {
    let element = document.createElement('div');
    var btn = document.createElement('button');


    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = Acd;


    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

if( module.hot ) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the update printMe module!');
        printMe();
    })
}
