import {ChangeUserStatus} from './migrations/1710208003560_changeuserstatus';
import {database, onValue, ref} from "../FirebaseService";
import {changeDataTypeEventTime} from "./migrations/1717115424314_changedatatypeeventtime";

const migrations = [ChangeUserStatus, changeDataTypeEventTime]

export const runMigrations = async () => {

    const migrationsDone: string [] = [];

    await onValue(ref(database, "migrations/"), async (snapshot) => {

        snapshot.forEach(({key}) => {

            if (key) {
                migrationsDone.push(key)
            }
        });

        migrations.forEach(migration => {

            if (!migrationsDone.includes(migration.getFileName())) {

                migration.handle()
                    .then(() => migration.saveMigration())
                    .catch(console.error);
            }
        })
    });
}