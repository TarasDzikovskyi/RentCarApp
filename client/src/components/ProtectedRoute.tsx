import {FC} from 'react';
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
interface Props {
    children: JSX.Element
}


export const ProtectedRoute: FC<Props> = ({children}) => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    return (
        <>
            {isAuth ? children : navigate('/auth')}
        </>
    );
};
