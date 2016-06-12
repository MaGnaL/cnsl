import {Cnsl} from './src/cnsl.interface';
import {CnslClass} from './src/cnsl.class';
import {cnslLogged} from './src/cnsl-method.decorator';

const cnsl:Cnsl = new CnslClass();

export {cnsl, Cnsl, cnslLogged};