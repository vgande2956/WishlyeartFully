import CreatorWizard from '../../../components/CreatorWizard';
const stepByRoute:Record<string,number>={person:0,style:1,message:2,memories:3,music:4,preview:5,publish:6};
export default function Step({params}:{params:{step:string}}){return <CreatorWizard step={stepByRoute[params.step]??0}/>}
