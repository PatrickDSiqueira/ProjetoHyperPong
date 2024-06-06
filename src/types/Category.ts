import {ParticipantType} from "./types";

export class Category {

    private name: string;
    private participants: ParticipantType[];
    private maxParticipant: number;

    constructor(name: string, participants: ParticipantType[], maxParticipant: number) {

        this.name = name;
        this.participants = participants;
        this.maxParticipant = maxParticipant;
    }

    getName(): string {
        return this.name;
    }

    getParticipants():ParticipantType[] {
        return this.participants;
    }

    setParticipants(participants: ParticipantType[]) {
        this.participants = participants;
    }

    setMaxParticipant(maxParticipant: number) {
        this.maxParticipant = maxParticipant;
    }

    getMaxParticipant(): number {
        return this.maxParticipant;
    }

    addParticipant(participant: ParticipantType) {
        this.participants.push(participant);
    }

    setName(name: string) {
        this.name = name;
    }

    isValid(): boolean {
        return this.name !== '' && this.maxParticipant > 0;
    }
}