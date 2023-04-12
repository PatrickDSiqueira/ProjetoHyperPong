import {database, onValue, ref} from "../FirebaseService";

const getAllEvents = ()=>{
     try {
         const allEvents: object[] = [];

         const eventsRef = ref(database, "eventos/");

         onValue(eventsRef, (snapshot) => {
             snapshot.forEach((elem) => {
                 allEvents.push(elem.val())
             });
         });

         return(allEvents);

     } catch {
         console.log('INTERNAL_ERROR');
     }
}

export default getAllEvents();