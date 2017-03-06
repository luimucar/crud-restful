import {Observer} from './observer';

export class Subject {
     private observers: Observer[] = [];

     public register(observer: Observer): void {
         this.observers.push(observer);
     }

     public unregister(observer: Observer): void {
         var n: number = this.observers.indexOf(observer);
         this.observers.splice(n, 1);
     }

     public notify(groupId:string): void {
         for (let observer of this.observers) {
             if (observer.groupId == groupId) {
                observer.notify();
             }
         }
     }
 }