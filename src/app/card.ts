export class Card {
    constructor(
        public link: string,
        public tags: Array<string>,
        public height: number,
        public width: number,
        public name?: string
    ) {}
}