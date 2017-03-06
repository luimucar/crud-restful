export class Observer {
    constructor(public groupId:string) {
        
    }
    public notify(): void {
        throw new Error("Abstract Method!");
    }
}