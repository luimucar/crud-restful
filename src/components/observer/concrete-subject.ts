import {Injectable} from '@angular/core';
import {Subject} from './subject';

@Injectable()
export class ConcreteSubject extends Subject {
    static instance : ConcreteSubject = null;
    
    public static getInstance() : ConcreteSubject {
        if (ConcreteSubject.instance == null) {
            ConcreteSubject.instance = new ConcreteSubject();
        }
        return ConcreteSubject.instance;
    }
    
    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }
}
