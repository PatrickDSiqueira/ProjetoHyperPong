import {ChangeUserStatus} from './migrations/1710208003560_changeuserstatus';
import {database, onValue, ref} from "../FirebaseService";

const migrations = [ChangeUserStatus]

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
            }
        })
    });
}