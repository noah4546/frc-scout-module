
export interface ValidCheck {
    valid: boolean;
    prompt?: string;
}

export class ScoutInfo {
    studentName: string = '';
    matchKey: string = '';
    teamKey: string = '';

    public isValid(): ValidCheck {
        if (this.studentName.length == 0)
            return { 
                valid: false,
                prompt: 'Please enter a Student Name'
            };

        if (this.matchKey.length == 0)
            return {
                valid: false,
                prompt: 'Please enter a Match Number'
            };

        if (this.teamKey.length == 0)
            return {
                valid: false,
                prompt: 'Please select a Team'
            }


        return {
            valid: true
        };
    }
}