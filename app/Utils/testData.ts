import moment from 'moment';

export function testData(data : string){
    let result = moment(data, 'DD/MM/YYYY', true).isValid();
    return result;
}