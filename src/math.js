import _ from 'lodash'
export function square(x){
    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
    return x * x ;
}

export function cube(x){
    return x * x * x;
}