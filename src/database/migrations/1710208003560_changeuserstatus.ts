import {ref, set, database, onValue, update} from "../../FirebaseService";
import moment from "moment";
import {EventType} from "../../types/types";

export class ChangeUserStatus {

    private static fileName = "1710208003560_changeuserstatus";

    static async handle() {

        const allEventsRef = ref(database, "events/");

        const allEvents: EventType[] = [];

        await onValue(allEventsRef, async (snapshot) => {

            snapshot.forEach((elem) => {

                if (parseInt(elem.val().status) === 1) {

                    allEvents.push(elem.val());
                }
            });

            for (const event of allEvents) {
                for (const category of event.categories) {
                    const idCategory = event.categories.indexOf(category);
                    if (category.participants) {
                        for (const participant of Object.values(category.participants)) {
                            if (parseInt(participant.status) === 1) {
                                await update(ref(database, `events/${event.id}/categories/${idCategory}/participants/${participant.idParticipants}`), {status: 2}).then(
                                    () => {
                                        console.log(event.name, idCategory, participant.nomeSobrenome)
                                    }
                                )
                            }
                        }
                    }
                }
            }
        });

        this.saveMigration()
    }

    static getFileName() {

        return this.fileName;
    }

    static async saveMigration() {
        await set(ref(database, `migrations/${this.getFileName()}`), moment().format('DD/MM/YYYY'))
    }
}
