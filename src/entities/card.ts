
export class card {
    private isHaveCherryPuff: boolean;
    constructor() { 
        this.isHaveCherryPuff = false;
    }

    setIsHaveCherryPuff(val: boolean) {
        this.isHaveCherryPuff = val;
    }

    getIsHaveCherryPuff() {
        return this.isHaveCherryPuff;
    }
}