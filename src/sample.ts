import { input } from './index';

export class Sample {
    @input(Sample, 'text')
    public name: string;
}
