import {Category} from "../types/Category";
import {Model} from "./Model";
import {Texts} from "../trans/texts";
import moment from "moment";
import {StatusEvents, TypeCompetitions} from "../types/types";

export default class Event extends Model {

    static readonly database_path = '/events'

    private readonly name: string;
    private readonly address: string;
    private readonly date: Date;
    private readonly time: Date;
    private description: string;
    private readonly wallpaper: string;
    private readonly type: number;
    private readonly end_date: Date;
    private readonly status: number;
    private readonly categories: Category[];

    constructor(name: string, address: string, date: Date,
                time: Date, description: string, wallpaper: string,
                type: number, end_date: Date, categories: Category[], id: string | null = null, status: number = 0) {
        super(Event.database_path, id);
        this.status = status;
        this.address = address;
        this.name = name;
        this.date = date;
        this.time = time;
        this.description = description;
        this.wallpaper = wallpaper;
        this.type = 0;
        this.end_date = end_date;
        this.categories = categories;

        this.date_timestamp = ['time', 'date', 'end_date'];
    }

    getName(): string {

        return this.name;
    }

    getAddress(): string {
        return this.address;
    }

    getDate(): Date {
        return this.date
    }

    getTime(): string {
        return moment(this.time).format('HH:mm')
    }

    getDescription(): string {
        return this.description
    }

    setDescription(description: string) {
        this.description = description;
    }

    getWallpaper(): string {
        return this.wallpaper
    }

    getType(): number {
        return this.type;
    }

    getEndDate(): Date {
        return this.end_date;
    }

    getCategories(): Category[] {

        return this.categories
    }

    getStatus(): number {
        return this.status;
    }

    getStatusLabel(): string {
        return StatusEvents[this.status];
    }

    getId(): string | null {

        return this.id;
    }

    async processSave() {

        const {isValid, errors} = this.validateData();

        if (!isValid) {

            return {
                ok: isValid,
                errors
            }
        }

        return await this.save();
    }

    private validateData() {

        let errors: string[] = [];

        const validations = {
            string: {
                text: (label: string) => `${label} é obrigatório.`,
                notPassed: (value: string | undefined) => value === undefined || !(value.trim().length > 0)
            },
            dateIsAfterToday: {
                text: (label: string) => `${label} deve ser após hoje.`,
                notPassed: (value: Date) => !(value > (new Date()))
            },
            isHour: {
                text: (label: string) => `${label} deve ser uam hora válida.`,
                notPassed: (value: string) => !moment(value, 'HH:mm', true).isValid()
            },
            eventType: {
                text: () => `Tipo de evento não é válido.`,
                notPassed: (value: number) => TypeCompetitions[value] === undefined,
            },
            isAfterDate: {
                text: (label: string) => `${label} deve ser após o inicio das inscrições.`,
                notPassed: (value: Date) => !(value > this.getDate())
            },
            eventStatus: {
                text: () => `Status de evento não é válido.`,
                notPassed: (value: number) => StatusEvents[value] === undefined,
            },
            categories: {
                text: () => `As categorias não estão válidas.`,
                notPassed: (value: Category[] | undefined) => {

                    if (value === undefined) {
                        return true;
                    }

                    return value.every((item) => !item.isValid());
                },
            },
        }

        if (validations.string.notPassed(this.getName())) {

            errors.push(validations.string.text(Texts.name));
        }

        if (validations.string.notPassed(this.getDescription())) {

            errors.push(validations.string.text(Texts.description));
        }

        if (validations.string.notPassed(this.getWallpaper())) {

            errors.push(validations.string.text(Texts.wallpaper));
        }

        if (validations.string.notPassed(this.getAddress())) {

            errors.push(validations.string.text(Texts.address))
        }

        if (validations.dateIsAfterToday.notPassed(this.getDate())) {

            errors.push(validations.dateIsAfterToday.text(Texts.date))
        }

        if (validations.isHour.notPassed(this.getTime())) {

            errors.push(validations.isHour.text(Texts.date))
        }

        if (validations.eventType.notPassed(this.getType())) {
            errors.push(validations.eventType.text());
        }

        if (validations.eventStatus.notPassed(this.getStatus())){
            errors.push(validations.eventStatus.text());
        }

        if (validations.isAfterDate.notPassed(this.getEndDate())) {

            errors.push(validations.isAfterDate.text(Texts.end_date_event));
        }

        if (validations.categories.notPassed(this.getCategories())) {

            errors.push(validations.categories.text());
        }

        return {isValid: errors.length === 0, errors};
    }
}