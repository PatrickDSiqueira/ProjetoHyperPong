import {child, database, push, ref, set} from "../FirebaseService";

export default class Player {

    static readonly database_path = '/players'

    private readonly name: string;

    private readonly score: { [key: string]: number };

    private id: string | null;

    constructor(name: string, id = null, eventIds: { [key: string]: number } = {}) {

        this.name = name;
        this.id = id;
        this.score = eventIds
    }

    getName(): string {

        return this.name;
    }

    getId(): string | null {

        return this.id;
    }


    getScore() {

        return this.score;
    }

    generateId(): void {

        this.id = push(child(ref(database), Player.database_path)).key;
    }

    async save() {

        const {isValid, errors} = this.validateData();

        if (!isValid) {

            return {
                ok: isValid,
                errors
            }
        }

        if (!this.id) {

            this.generateId();
        }


        return set(ref(database, Player.database_path + "/" + this.id), this)
            .then(() => {
                return {ok: true, errors: []}
            })
            .catch((e) => {

                return {
                    ok: false,
                    errors: []
                }
            });
    }

    private validateData() {

        let isValid = true;

        let errors = [];

        const quantWord = this.getName().trim().split(" ").length

        if (quantWord < 2) {

            isValid = false;

            errors.push("Deve ter nome e sobrenome")
        }

        return {isValid, errors};
    }

    getYearScore(events: string[]): number {

        let somaTotal = 0;

        events.forEach((eventId) => somaTotal += this.getScoreByEventId(eventId))

        return somaTotal;
    }

    getScoreByEventId(eventId: string): number {

        if (this.score[eventId]) {

            return this.score[eventId]
        }

        return 0;
    }

    setScoreByEventId(eventId: string, score: number): void {
        this.score[eventId] = score;
    }
}