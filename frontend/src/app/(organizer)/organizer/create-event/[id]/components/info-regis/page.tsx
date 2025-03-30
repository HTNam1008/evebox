import QuestionsPage from "./components/questionPage";
import { CreateQuestionsProps } from "../../libs/interface/idevent.interface"; 

export default function CreateQuestions({ eventId }: CreateQuestionsProps) {
    return(
        <QuestionsPage eventId={eventId}/>
    )
}
