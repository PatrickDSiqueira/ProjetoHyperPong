import Player from "../Model/Player";
import {GetAll} from "../hooks/Players";
import {GetOnlyAttributes} from "../hooks/Event";
import moment from "moment/moment";
import Header from "../components/Header";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const Ranking = () => {

    const playersList: Player[] = GetAll();

    const events: string[] = GetOnlyAttributes(['id'], moment().year()).map(event => event.id);

    const usersScore: { [id: string]: number } = {};

    playersList.forEach((player) => {

        const idPlayer = player.getId();

        if (idPlayer) {

            usersScore[idPlayer] = player.getYearScore(events);
        }
    })

    const templateScore = (player: Player) => {

        const idPlayer = player.getId();

        if (idPlayer) {

            return usersScore[idPlayer]
        }

        return 0;
    };

    playersList.sort((a, b) => {

        const idA = a.getId();

        const idB = b.getId();

        if (idA && idB) {

            const scoreA = usersScore[idA];

            const scoreB = usersScore[idB];

            if (scoreA < scoreB) {

                return 1;

            } else if (scoreA > scoreB) {

                return -1
            }
        }

        return 0
    });

    const playersListWithout  = playersList.filter((player)=> {

         const id = player.getId();

         if(!id){

             return false
         }

        return usersScore[id] > 0;
    })

    return <>

        <Header titulo={"Ranking - " + moment().year()}/>

        <div className="flex justify-content-center" style={{paddingTop: 10}}>
            <DataTable scrollable scrollHeight="700px" value={playersListWithout} >
                <Column body={(_, {rowIndex}) => rowIndex + 1} header="#"/>
                <Column field="name" header="Atleta"/>
                <Column body={templateScore} header="Pontos"/>
            </DataTable>
        </div>
    </>
}

export default Ranking;