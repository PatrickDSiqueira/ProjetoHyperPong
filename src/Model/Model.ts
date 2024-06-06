import {child, database, push, ref, set} from "../FirebaseService";

export class Model {

    protected id: string | null;

    protected database_path: string;

    protected date_timestamp: string[] = [];

    protected columns_ignore: string[] = [];

    constructor(table: string, id: string | null = null) {

        this.database_path = table;

        this.id = id ? id : this.generateId();
    }

    protected generateId() {

        return push(child(ref(database), this.database_path)).key;
    }

    async save() {

        Object.keys(this).forEach((key) => {

            if (this.date_timestamp.includes(key)) {

                const date = this[key as keyof this] as Date;

                this[key as keyof this] = date.getTime() as this[keyof this];
            }
        });

        return set(ref(database, this.database_path + "/" + this.id), this)
            .then(() => {
                return {ok: true, errors: []}
            })
            .catch((e) => {

                return {
                    ok: false,
                    errors: [e]
                }
            });
    }
}
