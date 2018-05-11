export class Filter {

    constructor(
        public firstname: string = "",
        public lastname: string = "",
        public genderMale: boolean = false,
        public genderFemale: boolean = false,
        public ageFrom: number = -1,
        public ageTo: number = 999,
        public birthdayFrom: string = "1970-10-10",
        public birthdayTo: string = "2020-10-10",
        public incomeFrom: number = -1,
        public incomeTo: number = 99999,
        public email: string = ""
    ) {
    }
}