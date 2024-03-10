import {child, database, get, ref, set} from "../FirebaseService";

export class User {

    protected path = '/users';
    static path = '/users';
    public full_name: string;
    protected id: string;
    public date_birth: Date;
    public email: string;
    public phone: string;
    private type: number;
    public photo: string | null = null;

    constructor(id: string, full_name: string, date_birth: Date, email: string, phone: string, photo: string | null = null, type = 3) {
        this.id = id;
        this.date_birth = date_birth;
        this.email = email;
        this.full_name = full_name;
        this.phone = phone;
        this.type = type;
        this.photo = photo;
    }

    async save() {

        const data = this;

        // this.notColumns.forEach(key => delete data[key]);

        await set(ref(database, this.path + '/' + this.id), data)
            .then(() => {
                console.log(200)
            })
            .catch(() => {
                console.log(400)
            });

        return this;
    }

    static findOne(id: string) {

        return get(child(ref(database), `${this.path}/${id}`))
            .then((snapshot) => {

                if (snapshot.exists()) {

                    const {id, full_name, date_birth, email, phone, type} = snapshot.val()
                    return new User(id, full_name, date_birth, email, phone, type)

                } else {

                    return false;

                }
            })
    }

    isAdmin(): boolean {

        return this.type === 2;
    }
}