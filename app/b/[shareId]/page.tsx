import ExperiencePlayer from '../../../components/ExperiencePlayer';import {demo} from '../../../lib/store';
export default function Birthday({params}:{params:{shareId:string}}){return <ExperiencePlayer exp={{...demo,shareId:params.shareId}}/>}
