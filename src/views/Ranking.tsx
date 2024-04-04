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

    const templateScore = (playerList: Player[]) => {

        const id = playerList[0].getId();

        if (!id) {

            return 0
        }

        return usersScore[id];
    };

    const templateName = (playerList: Player[]) => {

        if (playerList.length === 1) {

            return playerList[0].getName()
        }

        return <span style={{display: 'flex', flexDirection: 'column'}}>
              {playerList.map((player, index) => <span key={index}>{player.getName()}</span>)}
          </span>
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
    });

    const playerOrderByScore: Player[][] = [];

    playersListWithout.forEach(player => {
        const playerId = player.getId();

        if (!playerId) {

            return;
        }

        if (!playerOrderByScore[usersScore[playerId]]) {

            playerOrderByScore[usersScore[playerId]] = [];
        }

        playerOrderByScore[usersScore[playerId]].push(player);
    });

    const returnPlayers = playerOrderByScore.filter(item => item)
        .sort((a, b) => {
            return a[0].getScore() > b[0].getScore() ? 1 : -1
        })

    return <>

        <Header titulo={"Ranking - " + moment().year()}/>

        <div className="flex justify-content-center" style={{paddingTop: 10}}>
            <DataTable scrollable scrollHeight="700px" value={returnPlayers}>
                <Column body={(_, {rowIndex}) => rowIndex + 1} header="#"/>
                <Column body={templateName} header="Atleta"/>
                <Column body={templateScore} header="Pontos"/> </DataTable>
        </div>
    </>
}

export default Ranking;