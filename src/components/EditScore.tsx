import {Button} from "primereact/button";
import React, {useState} from "react";
import Modal from "react-modal";
import Player from "../Model/Player";
import moment from "moment";
import {TabPanel, TabView} from "primereact/tabview";
import {InputNumber} from "primereact/inputnumber";
import {ScrollPanel} from "primereact/scrollpanel";
import {Tag} from "primereact/tag";

interface Props {
    player: Player,
    events: { id: string, name: string, end_date: string }[]
}

export const EditScore = ({player, events}: Props) => {

    const groupedEvents: { [date: number]: { id: string, name: string, end_date: string }[] } = {};

    const [score, setScore] = useState(player.getScore())

    events.forEach(event => {

        const year = moment(event.end_date).year();

        if (!groupedEvents[year]) {

            groupedEvents[year] = [];
        }

        groupedEvents[year].push(event);
    })

    const [show, setModal] = useState(false);
    const hideModal = () => setModal(false);
    const showModal = () => setModal(true);

    const handleChangeScore = (score: number, idEvent: string) => setScore(prevState => ({
        ...prevState,
        [idEvent]: score
    }));

    const handleSavePlayer = () => {

        for (const event in score) {

            player.setScoreByEventId(event, score[event])
        }

        player.save().then((res) => hideModal());
    };

    const yearEvents = groupedEvents[moment().year()].map(({id}) => id);

    return <>
        <span onClick={showModal}>{player.getYearScore(yearEvents)}</span>

        <Modal
            isOpen={show}
            onRequestClose={hideModal}
            closeTimeoutMS={200}
            style={{
                overlay: {
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                },
                content: {
                    border: '1px solid green',
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '20px',
                    maxHeight: 'max-content',
                }
            }}>
            <div className="modal-header flex-column">
                <h2>Pontuação</h2>
                <h2>{player.getName()}</h2>
            </div>
            <div className="modal-body">
                <div className="card">
                    <TabView>
                        {Object.keys(groupedEvents).map((year) => {

                            return <TabPanel header={<span className="flex flex-column">{year}<Tag
                                value={player.getYearScore(groupedEvents[parseInt(year)].map(({id}) => id))}/></span>}>
                                <ScrollPanel style={{width: '100%', height: '400px'}}>

                                    {
                                        groupedEvents[parseInt(year)].map((event) => {
                                            return <div>
                                                <label>{event.name}</label>
                                                <InputNumber name={event.id}
                                                             value={score[(event.id)] ?? 0}
                                                             onChange={({value}) => handleChangeScore(value ?? 0, event.id)}/>
                                            </div>
                                        })
                                    }
                                </ScrollPanel>
                            </TabPanel>
                        })}
                    </TabView>
                </div>
            </div>
            <div className="modal-footer flex justify-content-around custombar1">
                <Button severity="secondary" onClick={hideModal}>Cancelar</Button>
                <Button onClick={handleSavePlayer}>Salvar</Button>
            </div>
        </Modal>
    </>
}

