import CreatorWizard from '../../../components/CreatorWizard';
const map:any={person:0,style:1,message:2,memories:3,music:4,preview:5};
export default function Step({params}:{params:{step:string}}){return <CreatorWizard step={map[params.step]??0}/>}
