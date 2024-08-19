import {BackgroundDiv, Body, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = ({category}) => {
    const {id, title, imageUrl, route} = category;
    const navigate = useNavigate();
    const navigationHandler = () => navigate(route);
    return (
        <DirectoryItemContainer key={id} onClick={navigationHandler}>
            <BackgroundDiv imageurl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;
