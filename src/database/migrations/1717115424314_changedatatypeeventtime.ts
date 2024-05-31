import {database, onValue, ref, set, update} from "../../FirebaseService";

import moment from "moment/moment";

export class changeDataTypeEventTime {

    private static fileName = "1717115424314_changedatatypeeventtime";

    static async handle() {

        const allEventsRef = ref(database, "events/");

        const dataToUpdate: { idEvent: string, time: string, done: boolean }[] = [];

        await onValue(allEventsRef, async (snapshot) => {

            snapshot.forEach((elem) => {

                const event = elem.val();

                if (!moment(event.time).isValid()) {

                    dataToUpdate.push({idEvent: event.id, time: event.time, done: false});
                }
            });

            for (let i = 0; i < dataToUpdate.length; i++) {

                if (!dataToUpdate[i].done) {

                    update(ref(database, `events/${dataToUpdate[i].idEvent}`), {time: moment(dataToUpdate[i].time, "HH:mm").valueOf()}).then(
                        () => {
                            console.log(dataToUpdate[i].idEvent)
                        }
                    )
                }

                dataToUpdate[i].done = true;
            }
        });
    }

    static getFileName() {

        return this.fileName;

    }

    static async saveMigration() {
        await set(ref(database, `migrations/${this.getFileName()}`), moment().format('DD/MM/YYYY'))
    }
}