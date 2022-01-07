import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Box = styled.div`
bottom: 0;
width: 100%;
position: absolute;
`;

export const Nav = styled.div`
display: flex;
flex-direction: row;
align-items: center;
background-color: white;
justify-content: start;
margin-top: 30px;
margin-left: 50px;
@media (max-width: 500px) {
    margin-left: 20px;
    margin-top: 20px;
}
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const Circle = styled.div`
border: 2px solid black;
border-radius: 10px;
`