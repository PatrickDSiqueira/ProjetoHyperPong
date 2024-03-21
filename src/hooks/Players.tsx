import {useEffect, useState} from "react";
import {loadingStart, loadingStop} from "../App";
import Player from "../Model/Player";
import {database, onValue, ref} from "../FirebaseService";

export function GetAll(listening = 0) {

    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {

        loadingStart();

        async function fetchData() {

            const playerRef = ref(database, Player.database_path);

            const allPlayers: Player[] = [];

            await onValue(playerRef, (snapshot) => {

                snapshot.forEach((elem) => {

                    const {name, id, score} = elem.val()

                    allPlayers.push(new Player(name, id, score ?? []));
                });

                setPlayers(allPlayers);
            });
        }
        fetchData();
    },[listening]);
    loadingStop();
    return players;
}