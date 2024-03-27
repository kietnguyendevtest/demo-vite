import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useContext } from 'react';
import { AppContext } from '~/contexts/app-context';

interface Props {
    children?: React.ReactNode
}

function MainLayout({ children }: Props) {
    const { reset } = useContext(AppContext)
    const navigate = useNavigate();

    const handeSubmitLogout = () => {
        reset();
        navigate('/login');
    }

    return (
        <>
            <header>Header here
                <button onClick={handeSubmitLogout}>Logout</button>
            </header>
            <aside>Sidebar here</aside>
            {children}
            <Footer />
        </>
    );
}

export default MainLayout;