import { FC } from "react";

interface ContentProps {
    cate_id?:string
}
 
const Content: FC<ContentProps> = ({
    cate_id
}) => {
    return (  
        <div>
            đây là nội dung
        </div>
    );
}
 
export default Content;